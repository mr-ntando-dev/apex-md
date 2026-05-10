// ── Ping / Status ─────────────────────────────────────────────
const config = require('../../config');
const os     = require('os');

module.exports = {
  name:    'ping',
  aliases: ['speed', 'status', 'health'],
  category: 'utility',
  desc:    'Check bot latency and system status',
  usage:   '.ping',
  public:  true,

  async execute({ sock, msg, from }) {
    const start  = Date.now();
    const sent   = await sock.sendMessage(from, { text: '⚡ Measuring...' }, { quoted: msg });
    const ms     = Date.now() - start;
    const uptime = process.uptime();
    const hrs    = Math.floor(uptime / 3600);
    const mins   = Math.floor((uptime % 3600) / 60);
    const mem    = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1);

    return sock.sendMessage(from, {
      text: `⚡ *${config.BOT_NAME} Status*\n${config.DIVIDER}\n🏓 Latency: *${ms}ms*\n⏱️ Uptime: *${hrs}h ${mins}m*\n💾 Memory: *${mem} MB*\n🖥️ Platform: *${os.platform()}*\n✅ Status: *Online*`,
    }, { quoted: msg });
  },
};
