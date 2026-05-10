const fetch = require('node-fetch');
module.exports = {
  name: 'tiktok', aliases: ['tt', 'tik'], category: 'downloader',
  desc: 'Download TikTok video (no watermark)', usage: '.tiktok [URL]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const url = args[0];
    if (!url || !url.includes('tiktok.com')) return sock.sendMessage(from, { text: '🎵 Provide a TikTok URL.' }, { quoted: msg });
    await sock.sendMessage(from, { text: '⬇️ Downloading TikTok (no watermark)...' }, { quoted: msg });
    try {
      const res  = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url, isNoTTWatermark: true }),
      });
      const data = await res.json();
      if (data.status === 'stream' || data.status === 'redirect') {
        const vRes   = await fetch(data.url);
        const buffer = Buffer.from(await vRes.arrayBuffer());
        return sock.sendMessage(from, { video: buffer, mimetype: 'video/mp4', caption: '🎵 Downloaded via APEX-MD' }, { quoted: msg });
      }
      return sock.sendMessage(from, { text: `❌ ${data.text || 'Download failed'}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ TikTok download failed: ${err.message}` }, { quoted: msg });
    }
  },
};
