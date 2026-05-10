module.exports = {
  name: 'setdesc', aliases: ['setgroupdesc'], category: 'admin',
  desc: 'Update the group description', usage: '.setdesc [text]',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, args }) {
    const desc = args.join(' ');
    if (!desc) return sock.sendMessage(from, { text: '⚠️ Provide new description.' }, { quoted: msg });
    await sock.groupUpdateDescription(from, desc);
    return sock.sendMessage(from, { text: '✅ Group description updated.' }, { quoted: msg });
  },
};
