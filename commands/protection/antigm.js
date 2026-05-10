const db = require('../../lib/database');
module.exports = {
  name: 'antigm', aliases: ['antieveryone','antitag'], category: 'protection',
  desc: 'Block mass @everyone / @mention spam in groups', usage: '.antigm [on/off]', public: false,
  async execute({ sock, msg, from, sender, args }) {
    const state = args[0]?.toLowerCase();
    if (!['on','off'].includes(state)) return sock.sendMessage(from, { text: 'Usage: .antigm on/off' }, { quoted: msg });
    await db.setGroup(from, { antigm: state === 'on' });
    await sock.sendMessage(from, { text: `🔇 Anti-@Everyone: *${state.toUpperCase()}*\n${state==='on'?'Mass @mention spam will be deleted and user warned.':'Disabled.'}` }, { quoted: msg });
  },
};
