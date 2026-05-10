module.exports = {
  name: 'promote', aliases: ['makeadmin'], category: 'admin',
  desc: 'Promote a member to group admin', usage: '.promote @user',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) return sock.sendMessage(from, { text: '⚠️ Tag the user to promote.' }, { quoted: msg });
    await sock.groupParticipantsUpdate(from, mentions, 'promote');
    return sock.sendMessage(from, { text: `⬆️ Promoted ${mentions.length} member(s) to admin.` }, { quoted: msg });
  },
};
