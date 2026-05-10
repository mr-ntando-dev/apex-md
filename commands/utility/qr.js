const fetch = require('node-fetch');
module.exports = {
  name: 'qr', aliases: ['qrcode', 'makeqr'], category: 'utility',
  desc: 'Generate a QR code for any text or URL', usage: '.qr [text or URL]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '🔲 .qr https://example.com  OR  .qr your text here' }, { quoted: msg });
    const url    = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
    const res    = await fetch(url);
    const buffer = Buffer.from(await res.arrayBuffer());
    return sock.sendMessage(from, { image: buffer, caption: `🔲 QR Code for: ${text}` }, { quoted: msg });
  },
};
