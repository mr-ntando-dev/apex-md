const db = require('../../lib/database');
module.exports = {
  name: 'unban', aliases: ['pardon'], category: 'owner',
  desc: 'Unban a user', usage: '.unban @user',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag a user to unban.' }, { quoted: msg });
    for (const jid of mentions) await db.setUser(jid, { banned: false });
    return sock.sendMessage(from, { text: `✅ Unbanned ${mentions.length} user(s).` }, { quoted: msg });
  },
};
