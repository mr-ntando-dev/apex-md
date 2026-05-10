module.exports = {
  name: 'demote', aliases: ['removeadmin'], category: 'admin',
  desc: 'Demote a group admin to member', usage: '.demote @user',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag the admin to demote.' }, { quoted: msg });
    await sock.groupParticipantsUpdate(from, mentions, 'demote');
    return sock.sendMessage(from, { text: `⬇️ Demoted ${mentions.length} member(s).` }, { quoted: msg });
  },
};
