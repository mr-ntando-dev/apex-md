const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = {
  name: 'pinterest', aliases: ['pin', 'pinimg'], category: 'downloader',
  desc: 'Download Pinterest image or video', usage: '.pinterest [url or search term]', public: true,
  async execute({ sock, msg, from, sender, args }) {
    const input = args.join(' ');
    if (!input) return sock.sendMessage(from, { text: 'Usage: .pinterest [url or search term]' }, { quoted: msg });
    await sock.sendMessage(from, { text: '📌 Fetching from Pinterest...' }, { quoted: msg });
    try {
      // If it's a URL, scrape the media directly
      if (input.startsWith('http') && input.includes('pinterest')) {
        const res  = await fetch(input, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        const html = await res.text();
        const $    = cheerio.load(html);
        const img  = $('meta[property="og:image"]').attr('content');
        const vid  = $('meta[property="og:video"]').attr('content');
        if (vid) {
          const buf = await (await fetch(vid)).buffer();
          return sock.sendMessage(from, { video: buf, caption: '📌 Pinterest Video' }, { quoted: msg });
        }
        if (img) {
          const buf = await (await fetch(img)).buffer();
          return sock.sendMessage(from, { image: buf, caption: '📌 Pinterest Image' }, { quoted: msg });
        }
        return sock.sendMessage(from, { text: '⚠️ Could not extract media from that Pinterest URL.' }, { quoted: msg });
      }
      // Search Pinterest via scraping
      const searchUrl = `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(input)}`;
      const res  = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const $    = cheerio.load(html);
      const imgs = [];
      $('img[src*="pinimg"]').each((_, el) => {
        const src = $(el).attr('src');
        if (src && !imgs.includes(src)) imgs.push(src);
      });
      if (!imgs.length) return sock.sendMessage(from, { text: '⚠️ No results found. Try a direct Pinterest URL.' }, { quoted: msg });
      const pick = imgs[0].replace('/236x/', '/originals/');
      const buf  = await (await fetch(pick)).buffer();
      await sock.sendMessage(from, { image: buf, caption: `📌 Pinterest: ${input}` }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Pinterest error: ${err.message}` }, { quoted: msg });
    }
  },
};
