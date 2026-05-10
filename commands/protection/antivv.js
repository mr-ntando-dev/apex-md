const db = require('../../lib/database');
module.exports = {
  name: 'antivv', aliases: ['antiviewonce','viewonce'], category: 'protection',
  desc: 'Automatically forward view-once messages so they can be seen anytime',
  usage: '.antivv [on/off]', public: false,
  async execute({ sock, msg, from, sender, args }) {
    const state = args[0]?.toLowerCase();
    if (!['on','off'].includes(state)) return sock.sendMessage(from, { text: 'Usage: .antivv on/off' }, { quoted: msg });
    await db.setUser('settings_antivv', { enabled: state === 'on' });
    await sock.sendMessage(from, { text: `👁️ Anti-ViewOnce: *${state.toUpperCase()}*\n${state==='on'?'View-once media will be forwarded to you automatically.':'Disabled.'}` }, { quoted: msg });
  },
};
