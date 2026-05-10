// ── Sticker Creator ────────────────────────────────────────────
module.exports = {
  name:    'sticker',
  aliases: ['s', 'stiker'],
  category: 'media',
  desc:    'Convert an image or video to a WhatsApp sticker',
  usage:   'Reply to image/video with .sticker',
  public:  true,

  async execute({ sock, msg, from, rawMsg }) {
    const ctx     = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage;
    const imgMsg  = ctx?.imageMessage || rawMsg?.imageMessage;
    const vidMsg  = ctx?.videoMessage || rawMsg?.videoMessage;
    const target  = imgMsg || vidMsg;

    if (!target) {
      return sock.sendMessage(from, { text: '📸 Reply to an image or short video with .sticker' }, { quoted: msg });
    }

    const type   = imgMsg ? 'image' : 'video';
    const stream = await sock.downloadContentFromMessage(target, type);
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);

    return sock.sendMessage(from, {
      sticker: buffer,
    }, { quoted: msg });
  },
};
