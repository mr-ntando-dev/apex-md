// ── Translator (Google Translate, free) ───────────────────────
const fetch = require('node-fetch');

module.exports = {
  name:    'translate',
  aliases: ['tr', 'trans'],
  category: 'utility',
  desc:    'Translate text to any language',
  usage:   '.translate [lang] [text]  (e.g. .translate es Hello world)',
  public:  true,

  async execute({ sock, msg, from, args }) {
    if (args.length < 2) {
      return sock.sendMessage(from, { text: '🌐 Usage: .translate [lang code] [text]\nExample: .translate fr Good morning' }, { quoted: msg });
    }
    const lang = args[0];
    const text = args.slice(1).join(' ');
    const url  = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`;

    try {
      const res    = await fetch(url);
      const data   = await res.json();
      const result = data[0].map(x => x[0]).join('');
      const from_  = data[2] || 'auto';

      return sock.sendMessage(from, {
        text: `🌐 *Translation*\n${from_} → ${lang}\n\n${result}`,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Translation failed: ${err.message}` }, { quoted: msg });
    }
  },
};
