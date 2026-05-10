const config = require('../../config');
module.exports = {
  name: 'mode', aliases: ['setmode', 'public', 'private'], category: 'owner',
  desc: 'Toggle bot between public and private mode', usage: '.mode public|private',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from, args }) {
    const m = (args[0] || '').toLowerCase();
    if (!['public', 'private'].includes(m)) return sock.sendMessage(from, { text: '.mode public OR .mode private' }, { quoted: msg });
    config.PUBLIC_MODE = m === 'public';
    return sock.sendMessage(from, { text: `✅ Bot is now in *${m}* mode.` }, { quoted: msg });
  },
};
