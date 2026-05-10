const db = require('../../lib/database');
module.exports = {
  name: 'antidelete', aliases: ['antirevoke'], category: 'admin',
  desc: 'Toggle anti-delete (resend deleted messages to group)', usage: '.antidelete on|off',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, args }) {
    const sub = (args[0] || '').toLowerCase();
    if (!['on', 'off'].includes(sub)) return sock.sendMessage(from, { text: '.antidelete on|off' }, { quoted: msg });
    await db.setGroup(from, { antiDelete: sub === 'on' });
    return sock.sendMessage(from, { text: `🗑️ Anti-delete *${sub === 'on' ? 'enabled' : 'disabled'}*.` }, { quoted: msg });
  },
};
