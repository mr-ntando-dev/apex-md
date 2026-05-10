// ── Text-to-Speech ─────────────────────────────────────────────
const fetch = require('node-fetch');

module.exports = {
  name:    'tts',
  aliases: ['speak', 'voice'],
  category: 'media',
  desc:    'Convert text to a voice note',
  usage:   '.tts [text]',
  public:  true,

  async execute({ sock, msg, from, args }) {
    const text = args.join(' ');
    if (!text) {
      return sock.sendMessage(from, { text: '🔊 Provide text. Example: .tts Hello from APEX!' }, { quoted: msg });
    }

    // Free TTS via Google Translate TTS API
    const lang = 'en';
    const url  = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${lang}&client=tw-ob&q=${encodeURIComponent(text)}`;

    try {
      const res    = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const buffer = Buffer.from(await res.arrayBuffer());

      return sock.sendMessage(from, {
        audio:    buffer,
        mimetype: 'audio/mpeg',
        ptt:      true, // voice note format
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ TTS failed: ${err.message}` }, { quoted: msg });
    }
  },
};
