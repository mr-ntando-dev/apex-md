const db = require('../../lib/database');
module.exports = {
  name: 'anticall', aliases: ['blockcall'], category: 'protection',
  desc: 'Auto-reject incoming calls (owner is exempt)', usage: '.anticall [on/off]', public: false,
  async execute({ sock, msg, from, sender, args }) {
    const state = args[0]?.toLowerCase();
    if (!['on','off'].includes(state)) return sock.sendMessage(from, { text: 'Usage: .anticall on/off' }, { quoted: msg });
    await db.setUser('settings_anticall', { enabled: state === 'on' });
    await sock.sendMessage(from, { text: `📵 Anti-Call: *${state.toUpperCase()}*\n${state==='on'?'All incoming calls will be rejected automatically.':'Incoming calls are allowed.'}` }, { quoted: msg });
  },
};
