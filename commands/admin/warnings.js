const db = require('../../lib/database');
module.exports = {
  name: 'warnings', aliases: ['warnlist', 'warncount'], category: 'admin',
  desc: 'View warnings for a user', usage: '.warnings @user',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag a user.' }, { quoted: msg });
    const groupData = await db.getGroup(from);
    const warnMap   = groupData.warnCount || {};
    const jid       = mentions[0];
    const count     = warnMap[jid] || 0;
    return sock.sendMessage(from, {
      text: `⚠️ @${jid.split('@')[0]} has *${count}/3* warnings.`,
      mentions: [jid],
    }, { quoted: msg });
  },
};
