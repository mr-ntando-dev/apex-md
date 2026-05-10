const db = require('../../lib/database');
// Blocks users with country codes not in an allowed list
const DEFAULT_ALLOWED = ['1','27','44','234','263','254','255','256','260','265','267'];
module.exports = {
  name: 'antifake', aliases: ['blockfake'], category: 'protection',
  desc: 'Block users with unrecognized/banned country codes from using the bot',
  usage: '.antifake [on/off]', public: false,
  async execute({ sock, msg, from, sender, args }) {
    const state = args[0]?.toLowerCase();
    if (!['on','off'].includes(state)) return sock.sendMessage(from, { text: 'Usage: .antifake on/off' }, { quoted: msg });
    await db.setGroup(from, { antifake: state === 'on' });
    await sock.sendMessage(from, { text: `🌍 Anti-Fake Numbers: *${state.toUpperCase()}*\n${state==='on'?`Allowed country codes: ${DEFAULT_ALLOWED.join(', ')}`:'All numbers allowed.'}` }, { quoted: msg });
  },
};
