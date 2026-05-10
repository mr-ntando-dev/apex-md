// ── Scheduler — cron-based message scheduling ────────────────
const cron   = require('node-cron');
const logger = require('./logger');

const jobs = new Map(); // jobId → cron task

function scheduleMessage(sock, jobId, chatId, message, cronExpr) {
  if (jobs.has(jobId)) {
    jobs.get(jobId).stop();
    jobs.delete(jobId);
  }
  if (!cron.validate(cronExpr)) {
    throw new Error(`Invalid cron expression: ${cronExpr}`);
  }
  const task = cron.schedule(cronExpr, async () => {
    try {
      await sock.sendMessage(chatId, { text: `🗓️ *Scheduled Message*\n\n${message}` });
      logger.info(`[Scheduler] Sent scheduled message to ${chatId}`);
    } catch (err) {
      logger.error('[Scheduler] Failed to send scheduled msg:', err.message);
    }
  });
  jobs.set(jobId, task);
  logger.info(`[Scheduler] Job ${jobId} scheduled: "${cronExpr}"`);
  return task;
}

function cancelJob(jobId) {
  if (jobs.has(jobId)) {
    jobs.get(jobId).stop();
    jobs.delete(jobId);
    return true;
  }
  return false;
}

function listJobs() {
  return Array.from(jobs.keys());
}

module.exports = { scheduleMessage, cancelJob, listJobs };
