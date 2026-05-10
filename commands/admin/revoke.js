module.exports = {
  name: 'revoke', aliases: ['resetlink', 'newlink'], category: 'admin',
  desc: 'Revoke and regenerate the group invite link', usage: '.revoke',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from }) {
    await sock.groupRevokeInvite(from);
    const newCode = await sock.groupInviteCode(from);
    return sock.sendMessage(from, { text: `✅ Invite link revoked!\n🔗 New link: https://chat.whatsapp.com/${newCode}` }, { quoted: msg });
  },
};
