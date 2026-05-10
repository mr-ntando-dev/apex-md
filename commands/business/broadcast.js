// ── Broadcast Message to all DMs ──────────────────────────────
// Owner-only: sends a message to all known contacts/chats
module.exports = {
  name:      'broadcast',
  aliases:   ['bc'],
  category:  'business',
  desc:      'Broadcast a message to all open chats (owner only)',
  usage:     '.broadcast [message]',
  ownerOnly: true,
  public:    false,

  async execute({ sock, msg, from, args }) {
    const text = args.join(' ');
    if (!text) return sock.sendMessage(from, { text: '⚠️ Provide a message to broadcast.' }, { quoted: msg });

    const chats = await sock.fetchChats?.() || [];
    if (!chats.length) {
      return sock.sendMessage(from, { text: '📭 No chats found. The bot must have chatted with contacts first.' }, { quoted: msg });
    }

    await sock.sendMessage(from, { text: `📡 Broadcasting to ${chats.length} chats...` }, { quoted: msg });

    let sent = 0;
    for (const chat of chats) {
      try {
        await sock.sendMessage(chat.id, { text: `📢 *Broadcast*\n\n${text}` });
        sent++;
        await new Promise(r => setTimeout(r, 1500)); // rate limit delay
      } catch {}
    }

    return sock.sendMessage(from, { text: `✅ Broadcast sent to ${sent}/${chats.length} chats.` }, { quoted: msg });
  },
};
