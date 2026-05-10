const db = require('../../lib/database');
module.exports = {
  name: 'resetwarn', aliases: ['clearwarn', 'unwarn'], category: 'admin',
  desc: 'Reset warnings for a user', usage: '.resetwarn @user',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag a user.' }, { quoted: msg });
    const groupData = await db.getGroup(from);
    const warnMap   = { ...(groupData.warnCount || {}) };
    const jid = mentions[0];
    warnMap[jid] = 0;
    await db.setGroup(from, { warnCount: warnMap });
    return sock.sendMessage(from, { text: `✅ Warnings cleared for @${jid.split('@')[0]}.`, mentions: [jid] }, { quoted: msg });
  },
};
