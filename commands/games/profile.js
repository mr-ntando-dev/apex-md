const eco = require('../../lib/economy');
module.exports = {
  name: 'profile', aliases: ['rank', 'xp', 'level'], category: 'games',
  desc: 'View your RPG profile and stats', usage: '.profile [@user]',
  public: true,
  async execute({ sock, msg, from, sender, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const target   = mentions[0] || sender;
    const u        = eco.getUser(target);
    const xpNeeded = u.level * 100;
    const bar      = '█'.repeat(Math.floor((u.xp / xpNeeded) * 10)) + '░'.repeat(10 - Math.floor((u.xp / xpNeeded) * 10));
    return sock.sendMessage(from, {
      text: `👤 *Profile: @${target.split('@')[0]}*\n━━━━━━━━━━━━━━\n⭐ Level: *${u.level}*\n✨ XP: *${u.xp}/${xpNeeded}*\n📊 [${bar}]\n💰 Cash: *${u.coins}*\n🏦 Bank: *${u.bank || 0}*\n📅 Streak: *${u.dailyStreak || 0} days*\n✅ Won: *${u.totalWon || 0}* | ❌ Lost: *${u.totalLost || 0}*`,
      mentions: [target],
    }, { quoted: msg });
  },
};
