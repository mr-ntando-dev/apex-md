// ── YouTube Audio Downloader ───────────────────────────────────
const ytSearch = require('yt-search');
const ytdl     = require('ytdl-core');
const config   = require('../../config');

module.exports = {
  name:    'play',
  aliases: ['song', 'music', 'yt'],
  category: 'media',
  desc:    'Download and send a YouTube song as audio',
  usage:   '.play [song name or URL]',
  public:  true,

  async execute({ sock, msg, from, args }) {
    const query = args.join(' ');
    if (!query) {
      return sock.sendMessage(from, { text: '🎵 Provide a song name. Example: .play Afrobeats 2026' }, { quoted: msg });
    }

    await sock.sendMessage(from, { text: `🔍 Searching for: *${query}*...` }, { quoted: msg });

    try {
      let url;
      if (ytdl.validateURL(query)) {
        url = query;
      } else {
        const results = await ytSearch(query);
        if (!results.videos.length) {
          return sock.sendMessage(from, { text: '❌ No results found.' }, { quoted: msg });
        }
        url = results.videos[0].url;
      }

      const info     = await ytdl.getInfo(url);
      const title    = info.videoDetails.title;
      const duration = parseInt(info.videoDetails.lengthSeconds);

      if (duration > 600) {
        return sock.sendMessage(from, { text: '⏱️ Song too long (max 10 min).' }, { quoted: msg });
      }

      await sock.sendMessage(from, { text: `⬇️ Downloading: *${title}*` }, { quoted: msg });

      const chunks = [];
      await new Promise((resolve, reject) => {
        const stream = ytdl(url, { filter: 'audioonly', quality: 'highestaudio' });
        stream.on('data', c => chunks.push(c));
        stream.on('end', resolve);
        stream.on('error', reject);
      });

      const buffer = Buffer.concat(chunks);
      return sock.sendMessage(from, {
        audio:    buffer,
        mimetype: 'audio/mpeg',
        ptt:      false,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Download failed: ${err.message}` }, { quoted: msg });
    }
  },
};
