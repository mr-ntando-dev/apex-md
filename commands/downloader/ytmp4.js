const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
  name: 'ytmp4', aliases: ['video', 'ytvideo'], category: 'downloader',
  desc: 'Download YouTube video as MP4', usage: '.ytmp4 [URL or title]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '🎬 .ytmp4 [YouTube URL or title]' }, { quoted: msg });

    await sock.sendMessage(from, { text: '🔍 Finding video...' }, { quoted: msg });
    try {
      let url = ytdl.validateURL(query) ? query : (await ytSearch(query)).videos[0]?.url;
      if (!url) return sock.sendMessage(from, { text: '❌ Video not found.' }, { quoted: msg });

      const info     = await ytdl.getInfo(url);
      const title    = info.videoDetails.title;
      const duration = parseInt(info.videoDetails.lengthSeconds);
      if (duration > 300) return sock.sendMessage(from, { text: '⏱️ Video too long (max 5 min for video).' }, { quoted: msg });

      await sock.sendMessage(from, { text: `⬇️ Downloading: *${title}*` }, { quoted: msg });

      const chunks = [];
      await new Promise((res, rej) => {
        const s = ytdl(url, { filter: 'videoandaudio', quality: 'lowest' });
        s.on('data', c => chunks.push(c));
        s.on('end', res);
        s.on('error', rej);
      });

      return sock.sendMessage(from, {
        video:   Buffer.concat(chunks),
        caption: `🎬 ${title}`,
        mimetype: 'video/mp4',
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Failed: ${err.message}` }, { quoted: msg });
    }
  },
};
