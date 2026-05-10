// ── .voice — AI Voice Note (ElevenLabs multilingual v2) ───────
const { textToSpeech } = require('../../lib/ai');
const config = require('../../config');
const fs     = require('fs');
const path   = require('path');
const os     = require('os');

module.exports = {
  name:'voice', aliases:['speak','say','talkback'], category:'ai',
  desc:'Convert text to a realistic AI voice note (ElevenLabs)', usage:'.voice [text]', public:true,
  async execute({ sock, msg, from, sender, args, quoted }) {
    if (!config.ELEVENLABS_API_KEY)
      return sock.sendMessage(from, { text: 'Voice requires ELEVENLABS_API_KEY in .env\nGet one free at elevenlabs.io' }, { quoted: msg });
    const text = args.join(' ') || quoted?.text;
    if (!text) return sock.sendMessage(from, { text: 'Usage: .voice [text]\nExample: .voice Hello from APEX-MD, the 2026 king!' }, { quoted: msg });
    if (text.length > 500) return sock.sendMessage(from, { text: 'Max 500 characters.' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🎙️ Generating voice note...' }, { quoted: msg });
    const buf = await textToSpeech(text);
    if (!buf) return sock.sendMessage(from, { text: 'Voice generation failed. Check your ElevenLabs API key.' }, { quoted: msg });
    const tmp = path.join(os.tmpdir(), `apex_voice_${Date.now()}.mp3`);
    fs.writeFileSync(tmp, buf);
    await sock.sendMessage(from, { audio: fs.readFileSync(tmp), mimetype: 'audio/mpeg', ptt: true }, { quoted: msg });
    fs.unlinkSync(tmp);
  },
};
