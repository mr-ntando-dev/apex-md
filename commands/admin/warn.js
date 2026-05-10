// ── Warn System (3-strike auto-kick) ─────────────────────────
const db = require('../../lib/database');

const MAX_WARNS = 3;

module.exports = {
  name:      'warn',
  aliases:   ['warning'],
  category:  'admin',
  desc:      'Warn a user — 3 warnings = auto-kick',
  usage:     '.warn @user [reason]',
  adminOnly: true,
  groupOnly: true,
  public:    true,

  async execute({ sock, msg, from, args, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) {
      return sock.sendMessage(from, { text: '⚠️ Tag the user to warn. Example: .warn @user cheating' }, { quoted: msg });
    }

    const reason = args.filter(a => !a.startsWith('@')).join(' ') || 'No reason given';
    const groupData = await db.getGroup(from);
    const warnMap   = groupData.warnCount || {};

    for (const jid of mentions) {
      const num = (warnMap[jid] || 0) + 1;
      warnMap[jid] = num;

      if (num >= MAX_WARNS) {
        await sock.groupParticipantsUpdate(from, [jid], 'remove');
        await db.setGroup(from, { warnCount: { ...warnMap, [jid]: 0 } });
        await sock.sendMessage(from, {
          text:     `🚫 @${jid.split('@')[0]} reached ${MAX_WARNS} warnings and was removed.\n📝 Last reason: ${reason}`,
          mentions: [jid],
        }, { quoted: msg });
      } else {
        await db.setGroup(from, { warnCount: warnMap });
        await sock.sendMessage(from, {
          text:     `⚠️ @${jid.split('@')[0]} — Warning ${num}/${MAX_WARNS}\n📝 Reason: ${reason}`,
          mentions: [jid],
        }, { quoted: msg });
      }
    }
  },
};
