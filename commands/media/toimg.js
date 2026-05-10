module.exports = {
  name: 'toimg', aliases: ['stickertoimg', 'unpack'], category: 'media',
  desc: 'Convert a sticker back to an image', usage: 'Reply to sticker with .toimg',
  public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const ctx    = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stkMsg = ctx?.stickerMessage || rawMsg?.stickerMessage;
    if (!stkMsg) return sock.sendMessage(from, { text: '🖼️ Reply to a sticker with .toimg' }, { quoted: msg });
    const stream = await sock.downloadContentFromMessage(stkMsg, 'sticker');
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return sock.sendMessage(from, { image: Buffer.concat(chunks), caption: '🖼️ Sticker converted to image' }, { quoted: msg });
  },
};
