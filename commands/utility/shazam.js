const fetch = require('node-fetch');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');
module.exports = {
  name: 'shazam', aliases: ['recognize','song','identify'], category: 'utility',
  desc: 'Identify a song from an audio or video message', usage: '.shazam — reply to audio/video', public: true,
  async execute({ sock, msg, from, sender, quoted }) {
    if (!quoted) return sock.sendMessage(from, { text: '🎵 Reply to an audio or video message to identify the song.' }, { quoted: msg });
    const msgType = Object.keys(quoted)[0];
    if (!['audioMessage','videoMessage','voiceMessage'].includes(msgType))
      return sock.sendMessage(from, { text: '⚠️ Reply to an audio or video message.' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🎵 Listening...' }, { quoted: msg });
    try {
      const media   = await sock.downloadMediaMessage(msg);
      const tmpFile = path.join(os.tmpdir(), `apex_shazam_${Date.now()}.mp3`);
      fs.writeFileSync(tmpFile, media);
      // Use audd.io free API for song recognition
      const FormData = require('form-data');
      const form = new FormData();
      form.append('file', fs.createReadStream(tmpFile), 'audio.mp3');
      form.append('return', 'apple_music,spotify');
      const res  = await fetch('https://api.audd.io/', { method: 'POST', body: form });
      const data = await res.json();
      fs.unlinkSync(tmpFile);
      if (!data?.result) return sock.sendMessage(from, { text: '🎵 Song not recognized. Try with a clearer audio sample.\n_(Add AUDD_API_KEY to .env for better accuracy)_' }, { quoted: msg });
      const s = data.result;
      const lines = [
        '🎵 *Song Identified!*', '━━━━━━━━━━━━━━━━━━━━━━━━',
        `🎤 *Artist:* ${s.artist}`, `📀 *Title:* ${s.title}`,
        `💿 *Album:* ${s.album || 'Unknown'}`, `📅 *Release:* ${s.release_date || 'Unknown'}',
        s.spotify ? `🟢 *Spotify:* ${s.spotify?.external_urls?.spotify || 'N/A'}` : '',
        '━━━━━━━━━━━━━━━━━━━━━━━━',
      ].filter(Boolean);
      await sock.sendMessage(from, { text: lines.join('\n') }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Shazam error: ${err.message}` }, { quoted: msg });
    }
  },
};
