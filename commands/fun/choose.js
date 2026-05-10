module.exports = {
  name: 'choose', aliases: ['pick', 'decide'], category: 'fun',
  desc: 'Let the bot choose between options', usage: '.choose option1 | option2 | option3',
  public: true,
  async execute({ sock, msg, from, args }) {
    const options = args.join(' ').split('|').map(o => o.trim()).filter(Boolean);
    if (options.length < 2) return sock.sendMessage(from, { text: '🤔 .choose Pizza | Shawarma | Rice' }, { quoted: msg });
    const choice = options[Math.floor(Math.random() * options.length)];
    return sock.sendMessage(from, { text: `🎯 Between: *${options.join(', ')}*\n\nI choose: *${choice}* ✅` }, { quoted: msg });
  },
};
