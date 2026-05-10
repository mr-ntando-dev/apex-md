module.exports = {
  name: 'viewonce', aliases: ['antiviewonce', 'unviewonce'], category: 'media',
  desc: 'Reveal and resend a view-once message', usage: 'Reply to a view-once message with .viewonce',
  public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const ctx = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!ctx) return sock.sendMessage(from, { text: '🔓 Reply to a view-once message with .viewonce' }, { quoted: msg });
    const voImg = ctx.viewOnceMessageV2?.message?.imageMessage || ctx.viewOnceMessage?.message?.imageMessage;
    const voVid = ctx.viewOnceMessageV2?.message?.videoMessage || ctx.viewOnceMessage?.message?.videoMessage;
    const target = voImg || voVid;
    if (!target) return sock.sendMessage(from, { text: '❌ No view-once media found in the quoted message.' }, { quoted: msg });
    const type   = voImg ? 'image' : 'video';
    const stream = await sock.downloadContentFromMessage(target, type);
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    return sock.sendMessage(from, {
      [type]: Buffer.concat(chunks),
      mimetype: voImg ? 'image/jpeg' : 'video/mp4',
      caption: '🔓 View-once revealed by APEX-MD',
    }, { quoted: msg });
  },
};
