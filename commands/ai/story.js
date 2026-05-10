const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'story', aliases: ['writestory', 'tale'], category: 'ai',
  desc: 'Generate a short creative story', usage: '.story [prompt]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const prompt = args.join(' ');
    if (!prompt) return sock.sendMessage(from, { text: '📖 .story A boy who finds a magic phone in Lagos' }, { quoted: msg });
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, `Write a short, engaging story (150-200 words) based on: "${prompt}". Make it vivid and interesting.`);
    return sock.sendMessage(from, { text: `📖 *Story*\n\n${reply}` }, { quoted: msg });
  },
};
