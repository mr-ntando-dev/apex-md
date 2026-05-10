const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = {
  name: 'threads', aliases: ['thread'], category: 'downloader',
  desc: 'Download video from Threads (Meta)', usage: '.threads [url]', public: true,
  async execute({ sock, msg, from, sender, args }) {
    const url = args[0];
    if (!url || !url.includes('threads.net')) return sock.sendMessage(from, { text: 'Usage: .threads [threads.net url]' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🧵 Fetching Threads media...' }, { quoted: msg });
    try {
      const res  = await fetch(url, { headers: { 'User-Agent': 'facebookexternalhit/1.1' } });
      const html = await res.text();
      const $    = cheerio.load(html);
      const vid  = $('meta[property="og:video"]').attr('content') || $('meta[property="og:video:url"]').attr('content');
      const img  = $('meta[property="og:image"]').attr('content');
      if (vid) {
        const buf = await (await fetch(vid)).buffer();
        return sock.sendMessage(from, { video: buf, caption: '🧵 Threads Video' }, { quoted: msg });
      }
      if (img) {
        const buf = await (await fetch(img)).buffer();
        return sock.sendMessage(from, { image: buf, caption: '🧵 Threads Image' }, { quoted: msg });
      }
      await sock.sendMessage(from, { text: '⚠️ Could not extract media. The post may be private.' }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Threads error: ${err.message}` }, { quoted: msg });
    }
  },
};
