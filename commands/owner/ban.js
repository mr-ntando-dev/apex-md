const db = require('../../lib/database');
module.exports = {
  name: 'ban', aliases: ['blacklist'], category: 'owner',
  desc: 'Ban a user from using the bot (owner only)', usage: '.ban @user',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag a user to ban.' }, { quoted: msg });
    for (const jid of mentions) await db.setUser(jid, { banned: true });
    return sock.sendMessage(from, { text: `🚫 Banned ${mentions.length} user(s) from the bot.` }, { quoted: msg });
  },
};
