const fetch = require('node-fetch');
module.exports = {
  name: 'ss', aliases: ['screenshot', 'ssweb'], category: 'utility',
  desc: 'Take a screenshot of any website', usage: '.ss [URL]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const url = args[0];
    if (!url || !url.startsWith('http')) return sock.sendMessage(from, { text: '🌐 .ss https://google.com' }, { quoted: msg });
    await sock.sendMessage(from, { text: `📸 Taking screenshot of: ${url}` }, { quoted: msg });
    try {
      const api    = `https://api.screenshotmachine.com?key=demo&url=${encodeURIComponent(url)}&dimension=1366x768&format=jpg&cacheLimit=0`;
      const res    = await fetch(api);
      const buffer = Buffer.from(await res.arrayBuffer());
      return sock.sendMessage(from, { image: buffer, caption: `🌐 ${url}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Screenshot failed: ${err.message}` }, { quoted: msg });
    }
  },
};
