// ── Tag All Members ────────────────────────────────────────────
module.exports = {
  name:      'tagall',
  aliases:   ['mentionall', 'everyone'],
  category:  'admin',
  desc:      'Mention all members in the group',
  usage:     '.tagall [message]',
  adminOnly: true,
  groupOnly: true,
  public:    true,

  async execute({ sock, msg, from, args }) {
    const meta    = await sock.groupMetadata(from);
    const members = meta.participants.map(m => m.id);
    const text    = args.join(' ') || `📢 *Attention everyone!*`;
    const mentions = members.map(id => `@${id.split('@')[0]}`).join(' ');

    return sock.sendMessage(from, {
      text:     `${text}\n\n${mentions}`,
      mentions: members,
    }, { quoted: msg });
  },
};
