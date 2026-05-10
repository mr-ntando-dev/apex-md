// ============================================================
//  APEX-MD  ·  Configuration
//  The most advanced WhatsApp MD Bot — 2026 Supreme Edition
//  "Queen Elisa ruled 2023. APEX-MD rules 2026." — forever.
// ============================================================

require('dotenv').config();

module.exports = {
  // ── Identity ──────────────────────────────────────────────
  BOT_NAME:      process.env.BOT_NAME      || 'APEX-MD',
  BOT_VERSION:   '2.0.0',
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

  // ── AI / LLM — Triple Engine (2026 Supreme) ───────────────
  OPENAI_API_KEY:    process.env.OPENAI_API_KEY    || '',
  CLAUDE_API_KEY:    process.env.CLAUDE_API_KEY    || '',   // Anthropic Claude 3.5 Sonnet
  GEMINI_API_KEY:    process.env.GEMINI_API_KEY    || '',   // Google Gemini 2.0 Flash
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || '', // AI Voice (ElevenLabs)
  STABILITY_API_KEY:  process.env.STABILITY_API_KEY  || '', // Stability AI (Stable Diffusion XL)
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY || '', // Perplexity AI (live web search)

  // AI routing strategy: 'openai' | 'claude' | 'gemini' | 'auto' (tries best available)
  AI_MODEL:          process.env.AI_MODEL          || 'gpt-4o',
  AI_CLAUDE_MODEL:   'claude-3-5-sonnet-20241022',
  AI_GEMINI_MODEL:   'gemini-2.0-flash-exp',
  AI_ROUTER:         process.env.AI_ROUTER         || 'auto',
  AI_ENABLED:        process.env.AI_ENABLED        !== 'false',
  AI_CONTEXT_LIMIT:  30,  // messages to retain per session (bumped from 20)
  AI_VOICE_ENABLED:  process.env.ELEVENLABS_API_KEY ? true : false,
  AI_VOICE_ID:       process.env.AI_VOICE_ID       || 'EXAVITQu4vr4xnSDxMaL', // Bella (ElevenLabs)

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
  WEATHER_API_KEY:   process.env.WEATHER_API_KEY   || '',
  NEWS_API_KEY:      process.env.NEWS_API_KEY       || '',

  // ── Session ───────────────────────────────────────────────
  SESSION_DIR: './session',

  // ── Logging ───────────────────────────────────────────────
  LOG_LEVEL:  process.env.LOG_LEVEL  || 'info',

  // ── Guardian AI (2026 anti-scam/raid system) ─────────────
  GUARDIAN_ENABLED:     process.env.GUARDIAN_ENABLED !== 'false',
  GUARDIAN_SCAM_KICK:   process.env.GUARDIAN_SCAM_KICK !== 'false',
  GUARDIAN_RAID_MUTE:   true,   // auto-mute group if >5 joins/30s (raid detection)
  GUARDIAN_IMPERSONATION: true, // detect bots pretending to be owner/admin

  // ── Economy (2026 upgrades) ───────────────────────────────
  ECONOMY_ENABLED:   true,
  DAILY_COINS:       500,
  WORK_COINS_MIN:    50,
  WORK_COINS_MAX:    300,
  ROB_CHANCE:        0.4,       // 40% success rate
  LEVEL_XP_BASE:     100,       // XP needed for level 2 (scales x1.5 per level)

  // ── Self-Destruct Messages ────────────────────────────────
  BURN_ENABLED:      true,
  BURN_MAX_SECONDS:  300,       // max 5 minutes before self-destruct


  // ── New 2026 Supreme keys ─────────────────────────────────
  TENOR_API_KEY:     process.env.TENOR_API_KEY     || '',   // Anime GIFs — get free at tenor.com/developer
  AUDD_API_KEY:      process.env.AUDD_API_KEY      || '',   // Shazam/song recognition — audd.io
  URLSCAN_API_KEY:   process.env.URLSCAN_API_KEY   || '',   // URL malware scan — urlscan.io

  // ── Default language ──────────────────────────────────────
  DEFAULT_LANG:      process.env.DEFAULT_LANG      || 'en', // en | pt | es | fr | sw | zu | ha

  // ── Theme / UI ────────────────────────────────────────────
  THEME_EMOJI:   '⚡',
  DIVIDER:       '━━━━━━━━━━━━━━━━━━━━━━━━',
  CROWN:         '👑',           // APEX-MD is the crown. Always has been.
};
