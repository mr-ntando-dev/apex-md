const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'character', aliases: ['roleplay', 'persona'], category: 'ai',
  desc: 'Chat with AI playing a character/persona', usage: '.character [character name]: [your message]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const full = args.join(' ');
    const sep  = full.indexOf(':');
    if (sep === -1) return sock.sendMessage(from, { text: '🎭 .character Yoda: Tell me about success' }, { quoted: msg });
    const character = full.slice(0, sep).trim();
    const message   = full.slice(sep + 1).trim();
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender + ':char:' + character, message,
      `You are ${character}. Stay completely in character. Respond how ${character} would speak.`);
    return sock.sendMessage(from, { text: `🎭 *${character}:*\n\n${reply}` }, { quoted: msg });
  },
};
