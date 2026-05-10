// ── .debate — AI argues both sides ────────────────────────────
const { aiReply } = require('../../lib/ai');

module.exports = {
  name:'debate', aliases:['argue','bothsides','vs'], category:'ai',
  desc:'AI presents compelling arguments FOR and AGAINST any topic', usage:'.debate [topic]', public:true,
  async execute({ sock, msg, from, sender, args }) {
    const topic = args.join(' ');
    if (!topic) return sock.sendMessage(from, { text: 'Usage: .debate [topic]\nExample: .debate social media is bad for teens' }, { quoted: msg });
    await sock.sendMessage(from, { text: '⚖️ Generating debate...' }, { quoted: msg });
    const prompt = `Topic: "${topic}"\nWrite a SHORT punchy debate:\n🟢 *FOR:*\n[2-3 bullet points]\n\n🔴 *AGAINST:*\n[2-3 bullet points]\n\n🏆 *VERDICT:*\n[1 sentence honest verdict]`;
    const res = await aiReply(sender+'_debate', prompt, 'You are a sharp debate moderator. Be punchy and concise. Use bullet points. No fluff.');
    if (!res) return sock.sendMessage(from, { text: 'AI unavailable. Check your API key.' }, { quoted: msg });
    await sock.sendMessage(from, { text: `⚖️ *APEX-MD Debate: ${topic}*\n━━━━━━━━━━━━━━━━━━━━━━━━\n\n${res}` }, { quoted: msg });
  },
};
