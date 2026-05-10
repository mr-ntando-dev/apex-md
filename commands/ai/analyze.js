// ── Vision — Analyze an image ──────────────────────────────────
const { analyzeImage } = require('../../lib/ai');

module.exports = {
  name:    'analyze',
  aliases: ['vision', 'describe', 'readimage'],
  category: 'ai',
  desc:    'Analyze/describe an image using GPT-4 Vision',
  usage:   'Reply to an image with .analyze [optional question]',
  public:  true,

  async execute({ sock, msg, from, args, rawMsg }) {
    const ctx    = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage;
    const imgMsg = ctx?.imageMessage || rawMsg?.imageMessage;

    if (!imgMsg) {
      return sock.sendMessage(from, { text: '🖼️ Reply to an image and use .analyze' }, { quoted: msg });
    }

    await sock.sendMessage(from, { text: '🔍 Analyzing image...' }, { quoted: msg });
    const stream  = await sock.downloadContentFromMessage(imgMsg, 'image');
    const chunks  = [];
    for await (const chunk of stream) chunks.push(chunk);
    const buffer  = Buffer.concat(chunks);
    const b64     = buffer.toString('base64');
    const prompt  = args.join(' ') || 'Describe this image in detail.';
    const result  = await analyzeImage(b64, prompt);

    return sock.sendMessage(from, { text: `🖼️ *Image Analysis*\n\n${result}` }, { quoted: msg });
  },
};
