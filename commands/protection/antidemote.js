const db = require('../../lib/database');
module.exports = {
  name: 'antidemote', aliases: ['protectadmin'], category: 'protection',
  desc: 'Auto-restore admins that get demoted by non-owners', usage: '.antidemote [on/off]', public: false,
  async execute({ sock, msg, from, sender, args }) {
    const state = args[0]?.toLowerCase();
    if (!['on','off'].includes(state)) return sock.sendMessage(from, { text: 'Usage: .antidemote on/off' }, { quoted: msg });
    await db.setGroup(from, { antidemote: state === 'on' });
    await sock.sendMessage(from, { text: `🛡️ Anti-Demote: *${state.toUpperCase()}*\n${state==='on'?'Bot will restore any admin that gets demoted.':'Anti-demote disabled.'}` }, { quoted: msg });
  },
};
