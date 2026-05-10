module.exports = {
  name: 'toaudio', aliases: ['tovn', 'tovideo'], category: 'media',
  desc: 'Convert quoted video to audio (voice note)', usage: 'Reply to video with .toaudio',
  public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const ctx    = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage;
    const vidMsg = ctx?.videoMessage || rawMsg?.videoMessage;
    if (!vidMsg) return sock.sendMessage(from, { text: '🎵 Reply to a video with .toaudio' }, { quoted: msg });
    await sock.sendMessage(from, { text: '⚙️ Converting...' }, { quoted: msg });
    const stream = await sock.downloadContentFromMessage(vidMsg, 'video');
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    // Send the video's audio track as ptt
    return sock.sendMessage(from, { audio: Buffer.concat(chunks), mimetype: 'audio/mp4', ptt: true }, { quoted: msg });
  },
};
