module.exports = {
  name: 'ship', aliases: ['love', 'couple'], category: 'fun',
  desc: 'Calculate love compatibility between two people', usage: '.ship @user1 @user2  OR  .ship Name1 Name2',
  public: true,
  async execute({ sock, msg, from, args, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    let name1, name2;
    if (mentions.length >= 2) {
      name1 = '@' + mentions[0].split('@')[0];
      name2 = '@' + mentions[1].split('@')[0];
    } else {
      [name1, name2] = [args[0], args[1]];
    }
    if (!name1 || !name2) return sock.sendMessage(from, { text: '💕 .ship @user1 @user2' }, { quoted: msg });
    const pct  = Math.floor(Math.random() * 101);
    const bar  = '❤️'.repeat(Math.floor(pct / 10)) + '🖤'.repeat(10 - Math.floor(pct / 10));
    const emoji = pct >= 80 ? '💍 Soulmates!' : pct >= 60 ? '💑 Great match!' : pct >= 40 ? '💛 Could work...' : pct >= 20 ? '😬 Risky...' : '💔 Nope.';
    return sock.sendMessage(from, {
      text: `💕 *Ship Meter*\n\n${name1} + ${name2}\n\n${bar}\n\n❤️ *${pct}%* — ${emoji}`,
      mentions: mentions,
    }, { quoted: msg });
  },
};
