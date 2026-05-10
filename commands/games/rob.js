const eco = require('../../lib/economy');
module.exports = {
  name: 'rob', aliases: ['steal', 'heist'], category: 'games',
  desc: 'Rob another user (50% chance, 2hr cooldown)', usage: '.rob @user',
  public: true,
  async execute({ sock, msg, from, sender, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length || mentions[0] === sender) return sock.sendMessage(from, { text: '🦹 Tag someone to rob. .rob @user' }, { quoted: msg });
    const target = mentions[0];
    const robber = eco.getUser(sender);
    const victim = eco.getUser(target);
    const now    = Date.now();
    const cd     = 2 * 60 * 60 * 1000;

    if (now - (robber.lastRob || 0) < cd) {
      const left = cd - (now - robber.lastRob);
      const m = Math.floor(left / 60000);
      return sock.sendMessage(from, { text: `⏳ You're too known by police! Wait *${m} min*.` }, { quoted: msg });
    }
    if (victim.coins < 50) return sock.sendMessage(from, { text: `😂 @${target.split('@')[0]} is too broke to rob!`, mentions: [target] }, { quoted: msg });

    robber.lastRob = now;
    const success  = Math.random() < 0.5;

    if (success) {
      const stolen   = Math.floor(victim.coins * (0.1 + Math.random() * 0.2));
      robber.coins  += stolen;
      victim.coins  -= stolen;
      eco.saveUser(sender, robber);
      eco.saveUser(target, victim);
      return sock.sendMessage(from, {
        text: `🦹 *Rob Successful!*\nYou stole *${stolen} coins* from @${target.split('@')[0]}!\n💰 Your balance: *${robber.coins}*`,
        mentions: [target],
      }, { quoted: msg });
    } else {
      const fine    = Math.min(100, robber.coins);
      robber.coins -= fine;
      eco.saveUser(sender, robber);
      return sock.sendMessage(from, {
        text: `👮 *Caught by police!*\nYou failed to rob @${target.split('@')[0]} and paid a *${fine} coin* fine!\n💰 Balance: *${robber.coins}*`,
        mentions: [target],
      }, { quoted: msg });
    }
  },
};
