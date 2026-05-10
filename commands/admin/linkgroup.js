module.exports = {
  name: 'link', aliases: ['grouplink', 'invite'], category: 'admin',
  desc: 'Get the group invite link', usage: '.link',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from }) {
    const code = await sock.groupInviteCode(from);
    return sock.sendMessage(from, { text: `🔗 *Group Invite Link*\nhttps://chat.whatsapp.com/${code}` }, { quoted: msg });
  },
};
