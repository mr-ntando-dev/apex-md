// Group keyword filter (like STARK-MD's G filter system)
const NodeCache = require('node-cache');
const filters   = new NodeCache({ stdTTL: 0 });

module.exports = {
  name: 'filter', aliases: ['gfilter', 'keyword'], category: 'admin',
  desc: 'Set keyword auto-replies for the group', usage: '.filter set keyword | reply\n.filter del keyword\n.filter list',
  adminOnly: true, groupOnly: true, public: true,

  async execute({ sock, msg, from, args }) {
    const sub = (args[0] || '').toLowerCase();
    const key = `f:${from}`;

    if (sub === 'list') {
      const all = filters.get(key) || {};
      const entries = Object.entries(all);
      if (!entries.length) return sock.sendMessage(from, { text: '📭 No filters set for this group.' }, { quoted: msg });
      return sock.sendMessage(from, { text: `📋 *Filters*\n\n${entries.map(([k,v]) => `• *${k}* → ${v}`).join('\n')}` }, { quoted: msg });
    }

    if (sub === 'del') {
      const word = args.slice(1).join(' ').toLowerCase();
      const all  = filters.get(key) || {};
      delete all[word];
      filters.set(key, all);
      return sock.sendMessage(from, { text: `🗑️ Filter removed: *${word}*` }, { quoted: msg });
    }

    if (sub === 'set') {
      const rest = args.slice(1).join(' ');
      const sep  = rest.indexOf(' | ');
      if (sep === -1) return sock.sendMessage(from, { text: 'Usage: .filter set keyword | reply text' }, { quoted: msg });
      const word  = rest.slice(0, sep).toLowerCase().trim();
      const reply = rest.slice(sep + 3).trim();
      const all   = filters.get(key) || {};
      all[word]   = reply;
      filters.set(key, all);
      return sock.sendMessage(from, { text: `✅ Filter added!\n• *${word}* → ${reply}` }, { quoted: msg });
    }

    return sock.sendMessage(from, { text: `.filter set greet | Hello! 👋\n.filter del greet\n.filter list` }, { quoted: msg });
  },

  getFilters: () => filters,
};
