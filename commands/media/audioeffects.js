// ── .audioeffect — Apply effects to audio/video ───────────────
const ffmpeg    = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const fs        = require('fs');
const path      = require('path');
const os        = require('os');
ffmpeg.setFfmpegPath(ffmpegPath);

const EFFECTS = {
  bass:     { desc: 'Boosted bass',         filter: 'bass=g=10,dynaudnorm' },
  nightcore:{ desc: 'Nightcore (faster+pitch)', filter: 'atempo=1.25,asetrate=44100*1.25,aresample=44100' },
  slow:     { desc: 'Slowed down',          filter: 'atempo=0.75' },
  reverse:  { desc: 'Reversed audio',       filter: 'areverse' },
  echo:     { desc: 'Echo effect',          filter: 'aecho=0.8:0.88:60:0.4' },
  robot:    { desc: 'Robot voice',          filter: 'afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75' },
  chipmunk: { desc: 'Chipmunk voice',       filter: 'asetrate=44100*1.7,aresample=44100,atempo=0.6' },
  deep:     { desc: 'Deep/bass voice',      filter: 'asetrate=44100*0.7,aresample=44100,atempo=1.43' },
};

module.exports = {
  name: 'audioeffect', aliases: ['effect','fx','audiofix'], category: 'media',
  desc: 'Apply audio effects to a voice/audio/video message',
  usage: '.audioeffect [effect] — reply to audio\nEffects: bass, nightcore, slow, reverse, echo, robot, chipmunk, deep',
  public: true,
  async execute({ sock, msg, from, sender, args, quoted }) {
    const effectName = args[0]?.toLowerCase();
    if (!effectName || !EFFECTS[effectName]) {
      const list = Object.entries(EFFECTS).map(([k, v]) => `*${k}* — ${v.desc}`).join('\n');
      return sock.sendMessage(from, { text: `🎛️ *Audio Effects*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${list}\n━━━━━━━━━━━━━━━━━━━━━━━━\nUsage: Reply to audio and type .audioeffect [name]` }, { quoted: msg });
    }
    if (!quoted) return sock.sendMessage(from, { text: '⚠️ Reply to an audio or video message first.' }, { quoted: msg });

    const msgType = Object.keys(quoted)[0];
    if (!['audioMessage','videoMessage','voiceMessage'].includes(msgType))
      return sock.sendMessage(from, { text: '⚠️ Please reply to an audio or video message.' }, { quoted: msg });

    await sock.sendMessage(from, { text: `🎛️ Applying *${effectName}* effect...` }, { quoted: msg });

    const media  = await sock.downloadMediaMessage(msg);
    const inFile = path.join(os.tmpdir(), `apex_in_${Date.now()}.mp3`);
    const outFile = path.join(os.tmpdir(), `apex_fx_${Date.now()}.mp3`);
    fs.writeFileSync(inFile, media);

    await new Promise((resolve, reject) => {
      ffmpeg(inFile)
        .audioFilters(EFFECTS[effectName].filter)
        .save(outFile)
        .on('end', resolve)
        .on('error', reject);
    });

    const buf = fs.readFileSync(outFile);
    await sock.sendMessage(from, {
      audio:    buf,
      mimetype: 'audio/mpeg',
      ptt:      msgType === 'voiceMessage',
    }, { quoted: msg });

    fs.unlinkSync(inFile);
    fs.unlinkSync(outFile);
  },
};
