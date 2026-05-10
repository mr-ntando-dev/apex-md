module.exports = {
  name:'base64', aliases:['b64'], category:'utility',
  desc:'Encode or decode Base64', usage:'.base64 encode [text] or .base64 decode [base64]', public:true,
  async execute({ sock, msg, from, args }) {
    const mode  = args[0]?.toLowerCase();
    const input = args.slice(1).join(' ');
    if (!mode || !input) return sock.sendMessage(from, { text: 'Usage:\n.base64 encode [text]\n.base64 decode [base64]' }, { quoted: msg });
    try {
      if (mode === 'encode') {
        await sock.sendMessage(from, { text: `🔐 *Base64 Encoded:*\n${Buffer.from(input).toString('base64')}` }, { quoted: msg });
      } else if (mode === 'decode') {
        await sock.sendMessage(from, { text: `🔓 *Base64 Decoded:*\n${Buffer.from(input, 'base64').toString('utf8')}` }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { text: 'Mode must be "encode" or "decode".' }, { quoted: msg });
      }
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Base64 error: ${err.message}` }, { quoted: msg });
    }
  },
};
