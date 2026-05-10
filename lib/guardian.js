// ============================================================
//  APEX-MD  ·  Guardian AI — 2026 Supreme Edition
//  AI-powered group protection: scam, raid, impersonation.
//  No other bot has this. None. Not even close.
// ============================================================

const config  = require('../config');
const db      = require('./database');
const logger  = require('./logger');
const { guardianAnalyze } = require('./ai');

// ── Raid tracker: recent join timestamps per group ────────────
const raidTracker = new Map(); // groupId -> [timestamps]

// ── Impersonation keywords (owner/admin names injected at runtime) ─
const IMPERSONATION_PATTERNS = [
  /^admin$/i,
  /^owner$/i,
  /^bot[\s_-]?owner/i,
  /official.*bot/i,
  /^support$/i,
];

// ── Check if a message looks like a scam (heuristic + AI) ────
async function checkScam(text, groupId, senderId, sock) {
  if (!config.GUARDIAN_ENABLED) return;
  if (!text || text.length < 10) return;

  // Heuristic fast-check (no AI call needed for obvious cases)
  const SCAM_PATTERNS = [
    /send\s+\d+.*get\s+\d+/i,
    /double\s+your\s+money/i,
    /click.*link.*win/i,
    /you\s+have\s+won/i,
    /urgent.*bank.*account/i,
    /verify\s+your\s+account.*click/i,
    /free\s+(?:airtime|data|recharge)/i,
    /congratulations.*prize/i,
    /bitcoin.*investment.*returns/i,
    /ponzi|pyramid\s+scheme/i,
  ];

  const heuristicHit = SCAM_PATTERNS.some(p => p.test(text));

  if (heuristicHit) {
    logger.warn(`[Guardian] Heuristic scam hit in ${groupId} from ${senderId}`);
    await handleThreat(sock, groupId, senderId, 'Heuristic scam pattern detected', 9);
    return;
  }

  // AI analysis for borderline messages (>30 chars, has URL or money mention)
  const needsAI = text.length > 30 && (text.includes('http') || /\d+.*(?:money|cash|coins|pay|earn)/i.test(text));
  if (!needsAI) return;

  const result = await guardianAnalyze(text);
  if (!result) return;

  if (result.score >= 7 || result.scam || result.impersonation) {
    logger.warn(`[Guardian] AI threat: score=${result.score} scam=${result.scam} impersonation=${result.impersonation}`);
    await handleThreat(sock, groupId, senderId, result.reason, result.score);
  }
}

// ── Raid detection (mass join in short window) ────────────────
async function checkRaid(groupId, joinTimestamp, sock) {
  if (!config.GUARDIAN_RAID_MUTE) return;

  if (!raidTracker.has(groupId)) raidTracker.set(groupId, []);
  const joins = raidTracker.get(groupId);
  joins.push(joinTimestamp);

  // Keep last 30 seconds only
  const now    = Date.now();
  const window = joins.filter(t => now - t < 30000);
  raidTracker.set(groupId, window);

  if (window.length >= 5) {
    logger.warn(`[Guardian] RAID detected in ${groupId} — ${window.length} joins in 30s`);
    try {
      await sock.groupSettingUpdate(groupId, 'announcement'); // lock group
      await sock.sendMessage(groupId, {
        text: `🚨 *APEX-MD Guardian*\n⚠️ Raid detected — ${window.length} members joined in 30 seconds.\n🔒 Group locked. Admins please review.`,
      });
    } catch (err) {
      logger.error('[Guardian] Raid mute failed: ' + err.message);
    }
    raidTracker.set(groupId, []); // reset
  }
}

// ── Impersonation check ───────────────────────────────────────
async function checkImpersonation(pushName, senderId, groupId, sock, ownerNumber) {
  if (!config.GUARDIAN_IMPERSONATION) return;
  if (!pushName) return;

  const isImpersonating = IMPERSONATION_PATTERNS.some(p => p.test(pushName.trim()));
  const isFakeOwner     = ownerNumber && pushName.toLowerCase().includes(config.OWNER_NAME.toLowerCase()) && !senderId.includes(ownerNumber);

  if (isImpersonating || isFakeOwner) {
    logger.warn(`[Guardian] Impersonation by ${senderId} (name: ${pushName}) in ${groupId}`);
    try {
      await sock.sendMessage(groupId, {
        text: `⚠️ *APEX-MD Guardian*\n@${senderId.split('@')[0]} appears to be impersonating an admin/owner. Admins please verify.`,
        mentions: [senderId],
      });
    } catch (err) {
      logger.error('[Guardian] Impersonation alert failed: ' + err.message);
    }
  }
}

// ── Handle confirmed threat ────────────────────────────────────
async function handleThreat(sock, groupId, senderId, reason, score) {
  const action = score >= 9 && config.GUARDIAN_SCAM_KICK ? 'kick' : 'warn';

  try {
    const warningText = `🚨 *APEX-MD Guardian*\n@${senderId.split('@')[0]} — Suspicious message detected.\nReason: ${reason}\nThreat score: ${score}/10\n${action === 'kick' ? '⛔ Removed from group.' : '⚠️ This is your warning.'}`;
    await sock.sendMessage(groupId, { text: warningText, mentions: [senderId] });

    if (action === 'kick') {
      await sock.groupParticipantsUpdate(groupId, [senderId], 'remove');
    }
  } catch (err) {
    logger.error('[Guardian] Threat handling failed: ' + err.message);
  }
}

module.exports = { checkScam, checkRaid, checkImpersonation };
