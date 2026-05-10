// ── .burn — Self-Destructing Messages ─────────────────────────
const config = require('../../config');
const burnTimers = new Map();

module.exports = {
  name:     'burn',
  aliases:  ['selfdestruct', 'sd'],
  category: 'fun',
  desc:     'Send a self-destructing message that deletes itself after N seconds',
  usage:    '.burn [seconds] [message] — e.g. .burn 30 This message will vanish!',
  public:   true,
  async execute({ sock, msg, from, sender, args }) {
    if (!config.BURN_ENABLED) return sock.sendMessage(from, { text: 'Self-destruct messages are disabled.' }, { quoted: msg });
    const seconds = parseInt(args[0]);
    const text    = args.slice(1).join(' ');
    if (!seconds || isNaN(seconds) || seconds < 5 || seconds > config.BURN_MAX_SECONDS)
      return sock.sendMessage(from, { text: `Usage: .burn [5-${config.BURN_MAX_SECONDS}] [message]\nExample: .burn 30 This message self-destructs!` }, { quoted: msg });
    if (!text) return sock.sendMessage(from, { text: 'Include a message to burn.' }, { quoted: msg });
    const sent = await sock.sendMessage(from, {
      text: `💥 *[SELF-DESTRUCT IN ${seconds}s]*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${text}\n━━━━━━━━━━━━━━━━━━━━━━━━\n_Deletes in ${seconds} seconds._`,
    });
    const key = sent?.key;
    if (!key) return;
    const timer = setTimeout(async () => {
      try { await sock.sendMessage(from, { delete: key }); burnTimers.delete(key.id); } catch (_) {}
    }, seconds * 1000);
    burnTimers.set(key.id, timer);
  },
};
