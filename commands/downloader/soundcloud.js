const fetch = require('node-fetch');
const cheerio = require('cheerio');
module.exports = {
  name: 'soundcloud', aliases: ['sc', 'scmusic'], category: 'downloader',
  desc: 'Download audio from SoundCloud', usage: '.soundcloud [url]', public: true,
  async execute({ sock, msg, from, sender, args }) {
    const url = args[0];
    if (!url || !url.includes('soundcloud.com')) return sock.sendMessage(from, { text: 'Usage: .soundcloud [soundcloud url]\nExample: .soundcloud https://soundcloud.com/artist/track' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🎵 Fetching from SoundCloud...' }, { quoted: msg });
    try {
      // Use scdl-free API proxy
      const apiUrl = `https://api.fabdl.com/soundcloud/get?url=${encodeURIComponent(url)}`;
      const res    = await fetch(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const data   = await res.json();
      if (!data?.result?.download_url) return sock.sendMessage(from, { text: '⚠️ Could not fetch SoundCloud track. The track may be private or unavailable.' }, { quoted: msg });
      const audioRes = await fetch(data.result.download_url);
      const buf      = await audioRes.buffer();
      const title    = data.result.title || 'SoundCloud Track';
      await sock.sendMessage(from, {
        audio:    buf,
        mimetype: 'audio/mpeg',
        fileName: `${title}.mp3`,
      }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ SoundCloud error: ${err.message}` }, { quoted: msg });
    }
  },
};
