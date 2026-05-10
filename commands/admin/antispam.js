const db = require('../../lib/database');
module.exports = {
  name: 'antispam', aliases: ['spamprotect'], category: 'admin',
  desc: 'Toggle anti-spam protection (auto-mutes repeat spammers)', usage: '.antispam on|off',
  adminOnly: true, groupOnly: true, public: true,
  async execute({ sock, msg, from, args }) {
    const sub = (args[0] || '').toLowerCase();
    if (!['on', 'off'].includes(sub)) return sock.sendMessage(from, { text: '.antispam on|off' }, { quoted: msg });
    await db.setGroup(from, { antiSpam: sub === 'on' });
    return sock.sendMessage(from, { text: `🛡️ Anti-spam *${sub === 'on' ? 'enabled' : 'disabled'}*.` }, { quoted: msg });
  },
};
