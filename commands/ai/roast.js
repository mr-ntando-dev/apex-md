// ── .roast — AI savage roast ───────────────────────────────────
const { aiReply } = require('../../lib/ai');

module.exports = {
  name:'roast', aliases:['clap'], category:'ai',
  desc:'Get AI to roast someone. Not for the thin-skinned.', usage:'.roast @mention or .roast [name]', public:true,
  async execute({ sock, msg, from, sender, args, mentions }) {
    const target = mentions?.[0] ? `@${mentions[0].split('@')[0]}` : args.join(' ') || 'me';
    const prompt = `Write a savage but FUNNY roast of "${target}". Rules:\n- 3-4 punchy lines max\n- No hate speech or slurs — just clever wit\n- End with one backhanded compliment\n- Keep it WhatsApp-friendly`;
    await sock.sendMessage(from, { text: '🔥 Loading the roast...' }, { quoted: msg });
    const roast = await aiReply(sender+'_roast', prompt, 'You are a stand-up comedian. Be sharp, funny, clever. Never genuinely offensive.');
    if (!roast) return sock.sendMessage(from, { text: 'AI roaster offline. Give it a moment.' }, { quoted: msg });
    const mentionList = mentions?.[0] ? [mentions[0]] : [];
    await sock.sendMessage(from, { text: `🔥 *APEX-MD Roast*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${roast}\n\n_(For fun only)_`, mentions: mentionList }, { quoted: msg });
  },
};
