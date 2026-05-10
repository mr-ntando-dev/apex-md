// ── Command Handler ───────────────────────────────────────────
const fs      = require('fs');
const path    = require('path');
const config  = require('../config');
const logger  = require('./logger');
const db      = require('./database');
const NodeCache = require('node-cache');

// ── Rate Limiter ──────────────────────────────────────────────
const rateCache = new NodeCache({ stdTTL: config.RATE_WINDOW_MS / 1000 });

function isRateLimited(userId) {
  const key   = 'rl:' + userId;
  const count = rateCache.get(key) || 0;
  if (count >= config.RATE_LIMIT) return true;
  rateCache.set(key, count + 1);
  return false;
}

// ── Load all command modules ───────────────────────────────────
const commands = new Map();
const aliases  = new Map();

function loadCommands() {
  const base = path.join(__dirname, '../commands');
  const cats  = fs.readdirSync(base);
  let total   = 0;
  for (const cat of cats) {
    const catPath = path.join(base, cat);
    if (!fs.statSync(catPath).isDirectory()) continue;
    const files = fs.readdirSync(catPath).filter(f => f.endsWith('.js'));
    for (const file of files) {
      try {
        const mod = require(path.join(catPath, file));
        if (!mod.name || !mod.execute) continue;
        commands.set(mod.name, { ...mod, category: cat });
        if (mod.aliases) mod.aliases.forEach(a => aliases.set(a, mod.name));
        total++;
      } catch (e) {
        logger.warn(`[Handler] Failed to load ${file}: ${e.message}`);
      }
    }
  }
  logger.info(`[Handler] Loaded ${total} commands across ${cats.length} categories`);
}

// ── Core message handler ──────────────────────────────────────
async function handleMessage(sock, msg) {
  try {
    const { key, message: rawMsg } = msg;
    if (!rawMsg) return;
    if (key.fromMe) return;

    const from    = key.remoteJid;
    const isGroup = from.endsWith('@g.us');
    const sender  = isGroup ? key.participant : from;
    const senderNum = sender.replace('@s.whatsapp.net', '');

    // Resolve text content from any message type
    const body = (
      rawMsg.conversation              ||
      rawMsg.extendedTextMessage?.text ||
      rawMsg.imageMessage?.caption     ||
      rawMsg.videoMessage?.caption     ||
      ''
    ).trim();

    // ── Auto-read ──────────────────────────────────────────
    if (config.AUTO_READ) await sock.readMessages([key]);

    // ── Auto-typing indicator ──────────────────────────────
    if (config.AUTO_TYPING && body.startsWith(config.BOT_PREFIX)) {
      await sock.sendPresenceUpdate('composing', from);
    }

    // ── User record ────────────────────────────────────────
    const user = await db.getUser(sender);
    if (user.banned) return; // silently ignore banned users

    // ── Anti-link (group) ──────────────────────────────────
    if (isGroup && config.ANTI_LINK) {
      const groupData = await db.getGroup(from);
      if (groupData.antiLink) {
        const hasLink = /https?:\/\/|wa\.me|chat\.whatsapp/i.test(body);
        if (hasLink) {
          const isAdmin = await isMemberAdmin(sock, from, sender);
          if (!isAdmin) {
            await handleAntiLink(sock, from, sender, key, groupData.antiLinkAction || config.ANTI_LINK_ACTION);
            return;
          }
        }
      }
    }

    // ── Bad word filter ────────────────────────────────────
    if (isGroup && config.ANTI_BAD_WORD) {
      const groupData = await db.getGroup(from);
      if (groupData.antiBadWord && containsBadWord(body)) {
        await sock.sendMessage(from, { delete: key });
        return;
      }
    }

    // ── AI chatbot (non-command messages) ──────────────────
    if (!body.startsWith(config.BOT_PREFIX)) {
      if (config.AI_ENABLED && !isGroup) {
        // DM AI mode
        const { aiReply } = require('./ai');
        const reply = await aiReply(sender, body);
        if (reply) await sock.sendMessage(from, { text: reply }, { quoted: msg });
      }
      return;
    }

    // ── Parse command ──────────────────────────────────────
    const args        = body.slice(config.BOT_PREFIX.length).trim().split(/\s+/);
    const commandName = args.shift().toLowerCase();
    const cmdKey      = aliases.get(commandName) || commandName;
    const command     = commands.get(cmdKey);

    if (!command) return; // unknown command — silent

    // ── Rate limit ─────────────────────────────────────────
    if (isRateLimited(sender)) {
      return await sock.sendMessage(from, { text: `⏳ Slow down! You're sending commands too fast.` }, { quoted: msg });
    }

    // ── Permission checks ──────────────────────────────────
    const ownerNum = config.OWNER_NUMBER + '@s.whatsapp.net';
    const isOwner  = sender === ownerNum;

    if (command.ownerOnly && !isOwner) {
      return await sock.sendMessage(from, { text: `🔒 This command is restricted to the bot owner.` }, { quoted: msg });
    }

    if (command.groupOnly && !isGroup) {
      return await sock.sendMessage(from, { text: `👥 This command only works in groups.` }, { quoted: msg });
    }

    if (command.privateOnly && isGroup) {
      return await sock.sendMessage(from, { text: `💬 This command only works in private chat.` }, { quoted: msg });
    }

    if (command.adminOnly && isGroup) {
      const isAdmin = await isMemberAdmin(sock, from, sender);
      if (!isAdmin && !isOwner) {
        return await sock.sendMessage(from, { text: `🛡️ Only group admins can use this command.` }, { quoted: msg });
      }
    }

    // ── Public mode check ──────────────────────────────────
    if (!config.PUBLIC_MODE && !isOwner && !command.public) {
      return; // private mode — owner only
    }

    // ── Execute ────────────────────────────────────────────
    await command.execute({ sock, msg, from, sender, isGroup, isOwner, args, body, rawMsg, key });
    await db.incrementStat(sender, 'commandCount');

  } catch (err) {
    logger.error('[Handler] Error processing message:', err);
  }
}

// ── Group admin check ─────────────────────────────────────────
async function isMemberAdmin(sock, groupId, jid) {
  try {
    const meta    = await sock.groupMetadata(groupId);
    const members = meta.participants || [];
    const member  = members.find(m => m.id === jid);
    return member && (member.admin === 'admin' || member.admin === 'superadmin');
  } catch {
    return false;
  }
}

// ── Anti-link action ──────────────────────────────────────────
async function handleAntiLink(sock, from, sender, key, action) {
  await sock.sendMessage(from, { delete: key });
  if (action === 'warn') {
    await sock.sendMessage(from, { text: `⚠️ @${sender.split('@')[0]} — No links allowed in this group!`, mentions: [sender] });
  } else if (action === 'kick') {
    await sock.groupParticipantsUpdate(from, [sender], 'remove');
    await sock.sendMessage(from, { text: `🚫 @${sender.split('@')[0]} was removed for posting links.`, mentions: [sender] });
  }
}

// ── Bad word check ────────────────────────────────────────────
const BAD_WORDS = ['spam', 'scam', 'fuck', 'shit', 'nigga', 'bastard']; // extend as needed
function containsBadWord(text) {
  return BAD_WORDS.some(w => text.toLowerCase().includes(w));
}

module.exports = { handleMessage, loadCommands, commands, aliases };
