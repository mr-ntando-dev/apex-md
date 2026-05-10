module.exports = {
  name: 'setname', aliases: ['rename', 'setgroupname'], category: 'admin',
  desc: 'Rename the group', usage: '.setname [new name]',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, args }) {
    const name = args.join(' ');
    if (!name) return sock.sendMessage(from, { text: '⚠️ Provide a new name.' }, { quoted: msg });
    await sock.groupUpdateSubject(from, name);
    return sock.sendMessage(from, { text: `✅ Group renamed to: *${name}*` }, { quoted: msg });
  },
};
