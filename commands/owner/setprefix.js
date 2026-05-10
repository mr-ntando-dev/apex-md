const config = require('../../config');
module.exports = {
  name: 'setprefix', aliases: ['prefix'], category: 'owner',
  desc: 'Change the bot command prefix (runtime only — to persist, update .env)', usage: '.setprefix [char]',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from, args }) {
    const p = args[0];
    if (!p || p.length > 2) return sock.sendMessage(from, { text: '⚠️ Provide a single character prefix.' }, { quoted: msg });
    config.BOT_PREFIX = p;
    return sock.sendMessage(from, { text: `✅ Prefix changed to: *${p}*\n⚠️ Update BOT_PREFIX in .env to persist this after restart.` }, { quoted: msg });
  },
};
