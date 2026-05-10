const eco = require('../../lib/economy');
const SYMBOLS = ['🍒','🍋','🍊','🍇','💎','⭐','🎰','🔔'];
module.exports = {
  name: 'slots', aliases: ['slot', 'gamble'], category: 'games',
  desc: 'Spin the slot machine', usage: '.slots [bet]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const bet = parseInt(args[0]);
    if (isNaN(bet) || bet < 10) return sock.sendMessage(from, { text: '🎰 Minimum bet is 10 coins. .slots 50' }, { quoted: msg });
    const u = eco.getUser(sender);
    if (u.coins < bet) return sock.sendMessage(from, { text: `❌ Not enough coins. You have *${u.coins}*.` }, { quoted: msg });

    const spin = () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    const r1 = spin(), r2 = spin(), r3 = spin();
    let mult = 0, result = '';

    if (r1 === r2 && r2 === r3) {
      mult   = r1 === '💎' ? 10 : r1 === '⭐' ? 7 : 4;
      result = `🎉 *JACKPOT! ${r1}${r2}${r3}* — ${mult}x!`;
    } else if (r1 === r2 || r2 === r3) {
      mult   = 1.5;
      result = `👏 *Pair! ${r1}${r2}${r3}* — 1.5x`;
    } else {
      mult   = 0;
      result = `😢 No match: ${r1}${r2}${r3}`;
    }

    const winnings = Math.floor(bet * mult);
    const delta    = winnings - bet;
    u.coins       += delta;
    if (delta > 0) u.totalWon += delta; else u.totalLost += Math.abs(delta);
    eco.saveUser(sender, u);

    return sock.sendMessage(from, {
      text: `🎰 *Slot Machine*\n\n[ ${r1} | ${r2} | ${r3} ]\n\n${result}\n${delta >= 0 ? `✅ +${winnings} coins` : `❌ -${bet} coins`}\n💰 Balance: *${u.coins}*`,
    }, { quoted: msg });
  },
};
