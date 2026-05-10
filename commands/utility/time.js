module.exports = {
  name: 'time', aliases: ['date', 'datetime', 'clock'], category: 'utility',
  desc: 'Get current time and date for any timezone', usage: '.time [timezone]  e.g. .time Africa/Lagos',
  public: true,
  async execute({ sock, msg, from, args }) {
    const tz  = args.join(' ') || 'UTC';
    try {
      const now = new Date().toLocaleString('en-US', { timeZone: tz, dateStyle: 'full', timeStyle: 'medium' });
      return sock.sendMessage(from, { text: `🕐 *Time in ${tz}*\n\n${now}` }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '❌ Invalid timezone. Example: .time Africa/Lagos' }, { quoted: msg });
    }
  },
};
