const fetch  = require('node-fetch');
const config = require('../../config');
module.exports = {
  name: 'news', aliases: ['headlines', 'breaking'], category: 'utility',
  desc: 'Get latest news headlines', usage: '.news [topic]',
  public: true,
  async execute({ sock, msg, from, args }) {
    if (!config.NEWS_API_KEY) return sock.sendMessage(from, { text: '⚠️ Set NEWS_API_KEY in .env (free at newsapi.org)' }, { quoted: msg });
    const query = args.join(' ') || 'world';
    try {
      const res  = await fetch(`https://newsapi.org/v2/top-headlines?q=${encodeURIComponent(query)}&pageSize=5&apiKey=${config.NEWS_API_KEY}`);
      const data = await res.json();
      if (!data.articles?.length) return sock.sendMessage(from, { text: `❌ No news found for: ${query}` }, { quoted: msg });
      const articles = data.articles.slice(0, 5).map((a, i) => `${i + 1}. *${a.title}*\n   📰 ${a.source?.name}`).join('\n\n');
      return sock.sendMessage(from, { text: `📰 *Top Headlines: ${query}*\n\n${articles}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ News fetch failed: ${err.message}` }, { quoted: msg });
    }
  },
};
