// ============================================================
//  APEX-MD  ·  Configuration
//  The most advanced WhatsApp MD Bot — 2026 Edition
// ============================================================

require('dotenv').config();

module.exports = {
  // ── Identity ──────────────────────────────────────────────
  BOT_NAME:      process.env.BOT_NAME      || 'APEX-MD',
  BOT_VERSION:   '1.0.0',
  BOT_PREFIX:    process.env.BOT_PREFIX    || '.',
  OWNER_NAME:    process.env.OWNER_NAME    || 'Owner',
  OWNER_NUMBER:  process.env.OWNER_NUMBER  || '',   // e.g. 2348012345678
  BOT_NUMBER:    process.env.BOT_NUMBER    || '',

  // ── Mode ──────────────────────────────────────────────────
  PUBLIC_MODE:   process.env.PUBLIC_MODE === 'true' || false,
  AUTO_READ:     process.env.AUTO_READ     !== 'false',
  AUTO_STATUS:   process.env.AUTO_STATUS   !== 'false',
  AUTO_TYPING:   process.env.AUTO_TYPING   !== 'false',
  AUTO_RECORDING: false,

  // ── AI / LLM ──────────────────────────────────────────────
  OPENAI_API_KEY:  process.env.OPENAI_API_KEY  || '',
  AI_MODEL:        process.env.AI_MODEL        || 'gpt-4o',
  AI_ENABLED:      process.env.AI_ENABLED      !== 'false',
  AI_CONTEXT_LIMIT: 20,  // messages to retain per session

  // ── Database ──────────────────────────────────────────────
  MONGODB_URI:    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/apexmd',
  DB_ENABLED:     process.env.MONGODB_URI ? true : false,

  // ── Anti-Spam / Rate Limit ────────────────────────────────
  RATE_LIMIT:       5,    // max commands per user per 10s window
  RATE_WINDOW_MS:   10000,
  ANTI_SPAM:        true,
  ANTI_LINK:        true,
  ANTI_LINK_ACTION: 'delete',  // 'delete' | 'warn' | 'kick'
  ANTI_BAD_WORD:    true,
  ANTI_DELETE:      true,      // restore deleted messages in log

  // ── Media ─────────────────────────────────────────────────
  MAX_DOWNLOAD_SIZE_MB: 200,
  SUPPORTED_VIDEO:  ['mp4', 'mkv', 'avi', 'mov'],
  SUPPORTED_AUDIO:  ['mp3', 'm4a', 'ogg', 'wav', 'flac'],

  // ── Scheduling ────────────────────────────────────────────
  ENABLE_SCHEDULER: true,

  // ── Business / CRM ────────────────────────────────────────
  ENABLE_CRM:       false,
  CRM_WEBHOOK_URL:  process.env.CRM_WEBHOOK_URL || '',

  // ── APIs ──────────────────────────────────────────────────
  WEATHER_API_KEY:  process.env.WEATHER_API_KEY  || '',
  NEWS_API_KEY:     process.env.NEWS_API_KEY      || '',
  GEMINI_API_KEY:   process.env.GEMINI_API_KEY    || '',

  // ── Session ───────────────────────────────────────────────
  SESSION_DIR: './session',

  // ── Logging ───────────────────────────────────────────────
  LOG_LEVEL:  process.env.LOG_LEVEL  || 'info',

  // ── Theme / UI ────────────────────────────────────────────
  THEME_EMOJI:   '⚡',
  DIVIDER:       '━━━━━━━━━━━━━━━━━━━━━━━━',
};
