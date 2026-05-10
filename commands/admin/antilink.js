// ── Anti-Link Management ──────────────────────────────────────
const db = require('../../lib/database');
const cfg = require('../../config');

module.exports = {
  name:      'antilink',
  aliases:   ['setantilink'],
  category:  'admin',
  desc:      'Toggle anti-link protection in a group',
  usage:     '.antilink on|off|action [delete|warn|kick]',
  adminOnly: true,
  groupOnly: true,
  public:    true,

  async execute({ sock, msg, from, args }) {
    const sub    = (args[0] || '').toLowerCase();
    const action = (args[1] || 'delete').toLowerCase();

    if (!['on', 'off', 'action'].includes(sub)) {
      return sock.sendMessage(from, {
        text: `*Anti-Link Settings*\n\n` +
              `.antilink on   — enable\n` +
              `.antilink off  — disable\n` +
              `.antilink action [delete|warn|kick] — set action`,
      }, { quoted: msg });
    }

    if (sub === 'on') {
      await db.setGroup(from, { antiLink: true });
      return sock.sendMessage(from, { text: `🔗 Anti-link *enabled*. Links will be ${cfg.ANTI_LINK_ACTION}d.` }, { quoted: msg });
    }

    if (sub === 'off') {
      await db.setGroup(from, { antiLink: false });
      return sock.sendMessage(from, { text: `🔗 Anti-link *disabled*.` }, { quoted: msg });
    }

    if (sub === 'action') {
      if (!['delete', 'warn', 'kick'].includes(action)) {
        return sock.sendMessage(from, { text: '⚠️ Action must be: delete, warn, or kick' }, { quoted: msg });
      }
      await db.setGroup(from, { antiLinkAction: action });
      return sock.sendMessage(from, { text: `✅ Anti-link action set to: *${action}*` }, { quoted: msg });
    }
  },
};
