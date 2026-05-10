module.exports = {
  name:'hidetag', aliases:['silenttag','htag'], category:'admin',
  desc:'Silently mention/notify all group members without showing their names',
  usage:'.hidetag [message]', public:false,
  async execute({ sock, msg, from, sender, args }) {
    const text = args.join(' ') || '​'; // zero-width space if empty
    try {
      const meta    = await sock.groupMetadata(from);
      const members = meta.participants.map(p => p.id);
      await sock.sendMessage(from, { text, mentions: members }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ ${err.message}` }, { quoted: msg });
    }
  },
};
