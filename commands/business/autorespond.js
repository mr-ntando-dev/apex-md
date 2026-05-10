// ── Custom Auto-Responses (keyword → reply) ───────────────────
const NodeCache = require('node-cache');
const responses = new NodeCache({ stdTTL: 0 }); // persistent in-memory

module.exports = {
  name:      'autorespond',
  aliases:   ['ar', 'autoreply'],
  category:  'business',
  desc:      'Set custom keyword auto-responses',
  usage:     '.autorespond set [keyword] | [reply]\n.autorespond del [keyword]\n.autorespond list',
  ownerOnly: true,
  public:    false,

  async execute({ sock, msg, from, args }) {
    const sub = args[0];

    if (sub === 'list') {
      const keys = responses.keys();
      if (!keys.length) return sock.sendMessage(from, { text: '📭 No auto-responses set.' }, { quoted: msg });
      const list = keys.map(k => `• *${k}* → ${responses.get(k)}`).join('\n');
      return sock.sendMessage(from, { text: `📋 *Auto-Responses*\n\n${list}` }, { quoted: msg });
    }

    if (sub === 'del') {
      const key = args.slice(1).join(' ').toLowerCase();
      if (!key) return sock.sendMessage(from, { text: '⚠️ Specify keyword to delete.' }, { quoted: msg });
      responses.del(key);
      return sock.sendMessage(from, { text: `🗑️ Removed auto-response for: *${key}*` }, { quoted: msg });
    }

    if (sub === 'set') {
      const full = args.slice(1).join(' ');
      const sep  = full.indexOf(' | ');
      if (sep === -1) return sock.sendMessage(from, { text: '⚠️ Usage: .autorespond set keyword | reply' }, { quoted: msg });
      const keyword = full.slice(0, sep).toLowerCase().trim();
      const reply   = full.slice(sep + 3).trim();
      responses.set(keyword, reply);
      return sock.sendMessage(from, { text: `✅ Auto-response set!\n• *${keyword}* → ${reply}` }, { quoted: msg });
    }

    return sock.sendMessage(from, {
      text: `📋 *Auto-Respond Usage*\n\n.autorespond set hello | Hey there! 👋\n.autorespond del hello\n.autorespond list`,
    }, { quoted: msg });
  },

  // Expose for handler to check incoming messages
  getResponses: () => responses,
};
