// ── .remind — Smart Reminders ─────────────────────────────────
function parseTime(str) {
  const m = str.match(/^(\d+)(s|m|h|d)$/i);
  if (!m) return null;
  return parseInt(m[1]) * {s:1000,m:60000,h:3600000,d:86400000}[m[2].toLowerCase()];
}

module.exports = {
  name:'remind', aliases:['reminder','remindme'], category:'utility',
  desc:'Set a reminder. Bot pings you when time is up.',
  usage:'.remind [time] [message] — e.g. .remind 30m Take medicine', public:true,
  async execute({ sock, msg, from, sender, args }) {
    const timeStr  = args[0];
    const reminder = args.slice(1).join(' ');
    if (!timeStr || !reminder)
      return sock.sendMessage(from, { text: 'Usage: .remind [time] [message]\nExamples:\n.remind 30m Take medicine\n.remind 2h Check the oven\n.remind 1d Pay rent' }, { quoted: msg });
    const ms = parseTime(timeStr);
    if (!ms) return sock.sendMessage(from, { text: 'Invalid time. Use: 30s, 5m, 2h, 1d' }, { quoted: msg });
    if (ms > 604800000) return sock.sendMessage(from, { text: 'Max reminder is 7 days.' }, { quoted: msg });
    const fireAt = new Date(Date.now() + ms);
    await sock.sendMessage(from, { text: `⏰ *Reminder set!*\n⏱ In: ${timeStr.toUpperCase()}\n📝 Note: ${reminder}\n🔔 At: ${fireAt.toLocaleString()}` }, { quoted: msg });
    setTimeout(async () => {
      try {
        await sock.sendMessage(from, { text: `🔔 *APEX-MD Reminder*\n@${sender.split('@')[0]}\n\n📝 ${reminder}`, mentions: [sender] });
      } catch (_) {}
    }, ms);
  },
};
