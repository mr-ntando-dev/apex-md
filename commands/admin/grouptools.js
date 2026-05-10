// ── Group Tools — kick, promote, demote, mute, tagall, etc. ──
module.exports = {
  name:      'kick',
  aliases:   ['remove'],
  category:  'admin',
  desc:      'Remove a member from the group',
  usage:     '.kick @user',
  adminOnly: true,
  groupOnly: true,
  public:    true,

  async execute({ sock, msg, from, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (!mentions.length) {
      return sock.sendMessage(from, { text: '⚠️ Tag the user you want to kick. Example: .kick @user' }, { quoted: msg });
    }
    for (const jid of mentions) {
      await sock.groupParticipantsUpdate(from, [jid], 'remove');
    }
    return sock.sendMessage(from, { text: `✅ Removed ${mentions.length} member(s).` }, { quoted: msg });
  },
};
