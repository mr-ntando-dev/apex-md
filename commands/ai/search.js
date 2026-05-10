// ── .search — Live AI Web Search (Perplexity Sonar Pro) ───────
const { perplexityReply, aiReply } = require('../../lib/ai');

module.exports = {
  name:'search', aliases:['web','live','lookup'], category:'ai',
  desc:'Search the live web with AI. Results from RIGHT NOW.', usage:'.search [query]', public:true,
  async execute({ sock, msg, from, sender, args }) {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: 'Usage: .search [question]\nExample: .search who won the 2026 World Cup?' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🌐 Searching the live web...' }, { quoted: msg });
    let answer = await perplexityReply(query);
    if (!answer) answer = await aiReply(sender, query);
    if (!answer) return sock.sendMessage(from, { text: 'Search failed. Add PERPLEXITY_API_KEY to .env for live results.' }, { quoted: msg });
    await sock.sendMessage(from, { text: `🌐 *APEX-MD Live Search*\n━━━━━━━━━━━━━━━━━━━━━━━━\n🔍 *${query}*\n\n${answer}\n━━━━━━━━━━━━━━━━━━━━━━━━\n⚡ APEX-MD 2026` }, { quoted: msg });
  },
};
