const fetch = require('node-fetch');
module.exports = {
  name: 'ig', aliases: ['instagram', 'insta', 'reels'], category: 'downloader',
  desc: 'Download Instagram video/reel', usage: '.ig [URL]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const url = args[0];
    if (!url || !url.includes('instagram.com')) return sock.sendMessage(from, { text: '📸 Provide an Instagram URL. .ig https://www.instagram.com/reel/...' }, { quoted: msg });
    await sock.sendMessage(from, { text: '⬇️ Downloading Instagram content...' }, { quoted: msg });
    try {
      // Using a public Instagram scraper API
      const api  = `https://api.cobalt.tools/api/json`;
      const res  = await fetch(api, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url, vCodec: 'h264', vQuality: '720', isAudioOnly: false }),
      });
      const data = await res.json();
      if (data.status === 'stream' || data.status === 'redirect') {
        const vRes   = await fetch(data.url);
        const buffer = Buffer.from(await vRes.arrayBuffer());
        return sock.sendMessage(from, { video: buffer, mimetype: 'video/mp4', caption: '📸 Downloaded via APEX-MD' }, { quoted: msg });
      }
      return sock.sendMessage(from, { text: `❌ Could not download: ${data.text || 'Unknown error'}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Instagram download failed: ${err.message}` }, { quoted: msg });
    }
  },
};
