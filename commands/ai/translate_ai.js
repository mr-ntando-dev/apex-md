const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'aitranslate', aliases: ['smarttranslate'], category: 'ai',
  desc: 'AI-powered smart translation with context awareness', usage: '.aitranslate [language] [text]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    if (args.length < 2) return sock.sendMessage(from, { text: '🌐 .aitranslate Spanish Hello, how are you?' }, { quoted: msg });
    const lang = args[0];
    const text = args.slice(1).join(' ');
    const reply = await aiReply(sender, `Translate this to ${lang}, only return the translation, nothing else: "${text}"`);
    return sock.sendMessage(from, { text: `🌐 *${lang}:*\n${reply}` }, { quoted: msg });
  },
};
