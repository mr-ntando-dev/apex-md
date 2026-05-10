// ── Message Scheduler ─────────────────────────────────────────
const { scheduleMessage, cancelJob, listJobs } = require('../../lib/scheduler');
const config = require('../../config');

module.exports = {
  name:      'schedule',
  aliases:   ['remind', 'sched'],
  category:  'utility',
  desc:      'Schedule a message to be sent on a cron schedule',
  usage:     '.schedule [cron] [message]  OR  .schedule cancel [id]  OR  .schedule list',
  ownerOnly: true,
  public:    false,

  async execute({ sock, msg, from, args, sender }) {
    if (!config.ENABLE_SCHEDULER) return sock.sendMessage(from, { text: '⚠️ Scheduler is disabled.' }, { quoted: msg });

    const sub = args[0];

    if (sub === 'list') {
      const jobs = listJobs();
      return sock.sendMessage(from, {
        text: jobs.length ? `📅 *Active Scheduled Jobs*\n\n${jobs.join('\n')}` : '📭 No active scheduled jobs.',
      }, { quoted: msg });
    }

    if (sub === 'cancel') {
      const id = args[1];
      if (!id) return sock.sendMessage(from, { text: '⚠️ Provide job ID.' }, { quoted: msg });
      const ok = cancelJob(id);
      return sock.sendMessage(from, { text: ok ? `✅ Job *${id}* cancelled.` : `❌ Job *${id}* not found.` }, { quoted: msg });
    }

    // .schedule "0 9 * * *" Good morning!
    const cronExpr = args[0];
    const message  = args.slice(1).join(' ');
    if (!cronExpr || !message) {
      return sock.sendMessage(from, {
        text: `📅 *Scheduler Usage*\n\n.schedule "0 9 * * *" Good morning!\n.schedule list\n.schedule cancel [id]\n\nUse https://crontab.guru to build cron expressions.`,
      }, { quoted: msg });
    }

    const jobId = `job_${Date.now()}`;
    try {
      scheduleMessage(sock, jobId, from, message, cronExpr);
      return sock.sendMessage(from, {
        text: `✅ *Scheduled!*\n📅 Cron: ${cronExpr}\n💬 Message: ${message}\n🆔 Job ID: ${jobId}`,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ ${err.message}` }, { quoted: msg });
    }
  },
};
