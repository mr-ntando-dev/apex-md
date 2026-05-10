// ── Welcome / Goodbye Toggle ───────────────────────────────────
const db = require('../../lib/database');

module.exports = {
  name:      'setwelcome',
  aliases:   ['welcome'],
  category:  'admin',
  desc:      'Set or toggle welcome messages',
  usage:     '.setwelcome on|off|msg [custom message]',
  adminOnly: true,
  groupOnly: true,
  public:    true,

  async execute({ sock, msg, from, args }) {
    const sub  = (args[0] || '').toLowerCase();
    const text = args.slice(1).join(' ');

    if (sub === 'on') {
      await db.setGroup(from, { welcome: true });
      return sock.sendMessage(from, { text: '👋 Welcome messages *enabled*.' }, { quoted: msg });
    }
    if (sub === 'off') {
      await db.setGroup(from, { welcome: false });
      return sock.sendMessage(from, { text: '👋 Welcome messages *disabled*.' }, { quoted: msg });
    }
    if (sub === 'msg' && text) {
      await db.setGroup(from, { welcome: true, welcomeMsg: text });
      return sock.sendMessage(from, {
        text: `✅ Welcome message set!\n\nPreview:\n${text.replace('{user}', '@You').replace('{group}', 'This Group')}`,
      }, { quoted: msg });
    }
    return sock.sendMessage(from, {
      text: `*Welcome Settings*\n\n.setwelcome on\n.setwelcome off\n.setwelcome msg Welcome {user} to {group}!\n\n{user} = tagged user\n{group} = group name`,
    }, { quoted: msg });
  },
};
