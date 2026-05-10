const ANSWERS = [
  '✅ It is certain.','✅ Without a doubt.','✅ Yes definitely.','✅ You may rely on it.',
  '✅ As I see it, yes.','✅ Most likely.','🤔 Reply hazy, try again.','🤔 Ask again later.',
  '🤔 Cannot predict now.','❌ Don\'t count on it.','❌ My reply is no.','❌ Very doubtful.',
  '❌ Outlook not so good.','😂 Absolutely not, don\'t even try.','🔮 The stars say yes... barely.',
];
module.exports = {
  name: '8ball', aliases: ['magic8', 'predict'], category: 'fun',
  desc: 'Ask the magic 8-ball a yes/no question', usage: '.8ball [question]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const q = args.join(' ');
    if (!q) return sock.sendMessage(from, { text: '🎱 Ask me a question! .8ball Will I win today?' }, { quoted: msg });
    const ans = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    return sock.sendMessage(from, { text: `🎱 *Magic 8-Ball*\n\n❓ ${q}\n\n${ans}` }, { quoted: msg });
  },
};
