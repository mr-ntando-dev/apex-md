const eco = require('../../lib/economy');
const config = require('../../config');
const P = config.BOT_PREFIX;

module.exports = {
  name: 'balance', aliases: ['bal', 'wallet', 'coins'], category: 'games',
  desc: 'Check your coin balance and level', usage: '.balance',
  public: true,
  async execute({ sock, msg, from, sender }) {
    const u = eco.getUser(sender);
    return sock.sendMessage(from, {
      text: `💰 *Your Wallet*\n${config.DIVIDER}\n🪙 Cash: *${u.coins}* coins\n🏦 Bank: *${u.bank}* coins\n💎 Total: *${u.coins + u.bank}*\n⭐ Level: *${u.level}*\n✨ XP: *${u.xp}/${u.level * 100}*\n\n${P}daily — claim daily reward\n${P}work — earn coins`,
    }, { quoted: msg });
  },
};
