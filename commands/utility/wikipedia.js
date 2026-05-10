const fetch = require('node-fetch');
module.exports = {
  name:'wikipedia', aliases:['wiki','define2'], category:'utility',
  desc:'Search Wikipedia for a topic', usage:'.wikipedia [topic]', public:true,
  async execute({ sock, msg, from, args }) {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: 'Usage: .wikipedia [topic]\nExample: .wikipedia Black holes' }, { quoted: msg });
    try {
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
      const res  = await fetch(searchUrl);
      const data = await res.json();
      if (data.type === 'disambiguation' || !data.extract) {
        return sock.sendMessage(from, { text: `🔍 "${query}" is ambiguous. Try being more specific.` }, { quoted: msg });
      }
      if (data.title === 'Not found.') return sock.sendMessage(from, { text: `❌ No Wikipedia article found for "${query}".` }, { quoted: msg });
      const summary = data.extract?.slice(0, 800) + (data.extract?.length > 800 ? '...' : '');
      const lines = [
        `📖 *${data.title}*`, '━━━━━━━━━━━━━━━━━━━━━━━━',
        summary, '━━━━━━━━━━━━━━━━━━━━━━━━',
        `🔗 ${data.content_urls?.mobile?.page || data.content_urls?.desktop?.page}`,
      ];
      await sock.sendMessage(from, { text: lines.join('\n') }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Wikipedia error: ${err.message}` }, { quoted: msg });
    }
  },
};
