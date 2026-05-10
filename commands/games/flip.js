const eco = require('../../lib/economy');
module.exports = {
  name: 'flip', aliases: ['coinflip', 'cf'], category: 'games',
  desc: 'Flip a coin and bet on it', usage: '.flip [heads/tails] [bet]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const side = (args[0] || '').toLowerCase();
    const bet  = parseInt(args[1]);
    if (!['heads','tails'].includes(side) || isNaN(bet) || bet < 10) {
      return sock.sendMessage(from, { text: '🪙 .flip heads 100  OR  .flip tails 50' }, { quoted: msg });
    }
    const u = eco.getUser(sender);
    if (u.coins < bet) return sock.sendMessage(from, { text: `❌ You only have *${u.coins}* coins.` }, { quoted: msg });
    const result = Math.random() < 0.5 ? 'heads' : 'tails';
    const won    = result === side;
    u.coins     += won ? bet : -bet;
    eco.saveUser(sender, u);
    return sock.sendMessage(from, {
      text: `🪙 *Coin Flip*\n\nResult: *${result === 'heads' ? '🪙 Heads' : '💿 Tails'}*\nYou picked: *${side}*\n\n${won ? `✅ You won *${bet} coins*!` : `❌ You lost *${bet} coins*!`}\n💰 Balance: *${u.coins}*`,
    }, { quoted: msg });
  },
};
