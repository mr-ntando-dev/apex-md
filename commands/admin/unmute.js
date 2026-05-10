module.exports = {
  name: 'unmute', aliases: ['open', 'unlock'], category: 'admin',
  desc: 'Open group — all members can send messages', usage: '.unmute',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from }) {
    await sock.groupSettingUpdate(from, 'not_announcement');
    return sock.sendMessage(from, { text: '🔊 Group unmuted — everyone can send messages.' }, { quoted: msg });
  },
};
