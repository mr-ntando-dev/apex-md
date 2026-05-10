module.exports = {
  name: 'roll', aliases: ['dice', 'diceroll'], category: 'fun',
  desc: 'Roll a dice (default d6, supports d4/d6/d8/d10/d12/d20/d100)', usage: '.roll [d6]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const input = (args[0] || 'd6').toLowerCase().replace('d', '');
    const sides = parseInt(input) || 6;
    if (sides < 2 || sides > 100) return sock.sendMessage(from, { text: '🎲 Dice sides must be between 2-100.' }, { quoted: msg });
    const result = Math.floor(Math.random() * sides) + 1;
    const emoji  = result === sides ? '🎉 MAX ROLL!' : result === 1 ? '💀 Min roll!' : '';
    return sock.sendMessage(from, { text: `🎲 *d${sides} Roll:* *${result}* ${emoji}` }, { quoted: msg });
  },
};
