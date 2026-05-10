const eco = require('../../lib/economy');
module.exports = {
  name: 'daily', aliases: ['claim', 'dailycoins'], category: 'games',
  desc: 'Claim your daily coin reward', usage: '.daily',
  public: true,
  async execute({ sock, msg, from, sender }) {
    const u    = eco.getUser(sender);
    const now  = Date.now();
    const cd   = 24 * 60 * 60 * 1000;
    const diff = now - (u.lastDaily || 0);
    if (diff < cd) {
      const left = cd - diff;
      const h    = Math.floor(left / 3600000);
      const m    = Math.floor((left % 3600000) / 60000);
      return sock.sendMessage(from, { text: `⏳ Daily already claimed! Come back in *${h}h ${m}m*.` }, { quoted: msg });
    }
    const streak  = (u.dailyStreak || 0) + 1;
    const bonus   = streak >= 7 ? 250 : streak >= 3 ? 150 : 100;
    u.coins      += bonus;
    u.lastDaily   = now;
    u.dailyStreak = streak;
    eco.saveUser(sender, u);
    eco.addXP(sender, 20);
    return sock.sendMessage(from, {
      text: `✅ *Daily Claimed!*\n🪙 +${bonus} coins${streak >= 7 ? ' (7-day streak bonus! 🔥)' : streak >= 3 ? ' (streak bonus!)' : ''}\n📅 Streak: *${streak} days*\n💰 Balance: *${u.coins}*`,
    }, { quoted: msg });
  },
};
