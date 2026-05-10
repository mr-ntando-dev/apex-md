const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = {
  name: 'mediafire', aliases: ['mf'], category: 'downloader',
  desc: 'Get direct download link from MediaFire', usage: '.mediafire [url]', public: true,
  async execute({ sock, msg, from, sender, args }) {
    const url = args[0];
    if (!url || !url.includes('mediafire.com')) return sock.sendMessage(from, { text: 'Usage: .mediafire [mediafire url]' }, { quoted: msg });
    await sock.sendMessage(from, { text: '☁️ Resolving MediaFire link...' }, { quoted: msg });
    try {
      const res  = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const $    = cheerio.load(html);
      const link = $('a#downloadButton').attr('href') || $('a.input.popsok').attr('href');
      const name = $('div.filename').text().trim() || 'file';
      const size = $('div.subheading > ul > li:first-child').text().trim();
      if (!link) return sock.sendMessage(from, { text: '⚠️ Could not resolve download link. File may have been removed.' }, { quoted: msg });
      await sock.sendMessage(from, {
        text: `☁️ *MediaFire Download*\n📄 File: ${name}\n📦 Size: ${size}\n🔗 Link: ${link}`,
      }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ MediaFire error: ${err.message}` }, { quoted: msg });
    }
  },
};
