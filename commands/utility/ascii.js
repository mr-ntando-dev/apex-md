const fetch = require('node-fetch');
const FONTS = ['standard','banner','big','block','bubble','digital','ivrit','mini','script','shadow','slant','small','smscript','smshadow','smslant','speed','stampatello','term','thick'];
module.exports = {
  name:'ascii', aliases:['textart','figlet','asciiart'], category:'utility',
  desc:'Convert text to ASCII art', usage:'.ascii [text] or .ascii [font] [text]\n.ascii fonts — list fonts', public:true,
  async execute({ sock, msg, from, args }) {
    if (args[0]?.toLowerCase() === 'fonts') {
      return sock.sendMessage(from, { text: `🎨 *ASCII Fonts (${FONTS.length})*\n${FONTS.join(', ')}\n\nUsage: .ascii [font] [text]` }, { quoted: msg });
    }
    let font = 'standard', text;
    if (FONTS.includes(args[0]?.toLowerCase())) { font = args[0].toLowerCase(); text = args.slice(1).join(' '); }
    else { text = args.join(' '); }
    if (!text) return sock.sendMessage(from, { text: 'Usage: .ascii [text]\nExample: .ascii APEX' }, { quoted: msg });
    if (text.length > 20) return sock.sendMessage(from, { text: '⚠️ Max 20 characters for ASCII art.' }, { quoted: msg });
    try {
      const res  = await fetch(`https://artii.herokuapp.com/make?text=${encodeURIComponent(text)}&font=${font}`);
      const art  = await res.text();
      await sock.sendMessage(from, { text: `\`\`\`\n${art}\`\`\`` }, { quoted: msg });
    } catch (_) {
      // Basic fallback
      await sock.sendMessage(from, { text: `\`\`\`\n${text.toUpperCase()}\n${'='.repeat(text.length)}\`\`\`` }, { quoted: msg });
    }
  },
};
