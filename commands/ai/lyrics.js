const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'lyrics', aliases: ['songlyrics'], category: 'ai',
  desc: 'Get song lyrics via AI', usage: '.lyrics [song name] - [artist]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const query = args.join(' ');
    if (!query) return sock.sendMessage(from, { text: '🎵 Example: .lyrics Essence - Wizkid' }, { quoted: msg });
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, `Provide the lyrics for "${query}". Format them nicely with line breaks. If you don't know the exact lyrics, say so.`);
    return sock.sendMessage(from, { text: `🎵 *Lyrics: ${query}*\n\n${reply}` }, { quoted: msg });
  },
};
