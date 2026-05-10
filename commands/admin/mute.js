module.exports = {
  name: 'mute', aliases: ['close', 'lock'], category: 'admin',
  desc: 'Close group — only admins can send messages', usage: '.mute',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from }) {
    await sock.groupSettingUpdate(from, 'announcement');
    return sock.sendMessage(from, { text: '🔇 Group muted — only admins can send messages.' }, { quoted: msg });
  },
};
