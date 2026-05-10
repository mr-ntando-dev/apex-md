// ── Database (MongoDB + in-memory fallback) ──────────────────
const mongoose = require('mongoose');
const NodeCache = require('node-cache');
const config   = require('../config');
const logger   = require('./logger');

// ── In-memory cache (used when MongoDB not configured) ──
const cache = new NodeCache({ stdTTL: 0 }); // never expire

// ── Group Settings Schema ──────────────────────────────
const groupSchema = new mongoose.Schema({
  id:            { type: String, required: true, unique: true },
  antiLink:      { type: Boolean, default: false },
  antiLinkAction:{ type: String,  default: 'delete' },
  antiBadWord:   { type: Boolean, default: false },
  antiSpam:      { type: Boolean, default: false },
  antiDelete:    { type: Boolean, default: false },
  welcome:       { type: Boolean, default: false },
  welcomeMsg:    { type: String,  default: '' },
  goodbye:       { type: Boolean, default: false },
  muted:         { type: Boolean, default: false },
  warnCount:     { type: Map, of: Number, default: {} },
  language:      { type: String,  default: 'en' },
  updatedAt:     { type: Date,    default: Date.now },
});

// ── User Stats Schema ──────────────────────────────────
const userSchema = new mongoose.Schema({
  id:            { type: String, required: true, unique: true },
  banned:        { type: Boolean, default: false },
  premium:       { type: Boolean, default: false },
  xp:            { type: Number,  default: 0 },
  level:         { type: Number,  default: 1 },
  warnings:      { type: Number,  default: 0 },
  commandCount:  { type: Number,  default: 0 },
  lastSeen:      { type: Date,    default: Date.now },
});

// ── Scheduled Messages Schema ──────────────────────────
const scheduleSchema = new mongoose.Schema({
  chatId:    { type: String, required: true },
  message:   { type: String, required: true },
  cronExpr:  { type: String, required: true },
  ownerId:   { type: String, required: true },
  active:    { type: Boolean, default: true },
  createdAt: { type: Date,    default: Date.now },
});

const Group    = mongoose.model('Group',    groupSchema);
const User     = mongoose.model('User',     userSchema);
const Schedule = mongoose.model('Schedule', scheduleSchema);

// ── Connection ─────────────────────────────────────────
async function connect() {
  if (!config.DB_ENABLED) {
    logger.warn('[DB] MongoDB URI not set — using in-memory store (settings will not persist across restarts)');
    return false;
  }
  try {
    await mongoose.connect(config.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    logger.info('[DB] Connected to MongoDB ✓');
    return true;
  } catch (err) {
    logger.error('[DB] MongoDB connection failed:', err.message);
    logger.warn('[DB] Falling back to in-memory store');
    return false;
  }
}

// ── Group helpers ──────────────────────────────────────
async function getGroup(id) {
  if (!config.DB_ENABLED) return cache.get('group:' + id) || {};
  let g = await Group.findOne({ id });
  if (!g) { g = await Group.create({ id }); }
  return g.toObject();
}

async function setGroup(id, data) {
  if (!config.DB_ENABLED) {
    const prev = cache.get('group:' + id) || {};
    cache.set('group:' + id, { ...prev, ...data });
    return;
  }
  await Group.findOneAndUpdate({ id }, { ...data, updatedAt: new Date() }, { upsert: true });
}

// ── User helpers ───────────────────────────────────────
async function getUser(id) {
  if (!config.DB_ENABLED) return cache.get('user:' + id) || {};
  let u = await User.findOne({ id });
  if (!u) { u = await User.create({ id }); }
  return u.toObject();
}

async function setUser(id, data) {
  if (!config.DB_ENABLED) {
    const prev = cache.get('user:' + id) || {};
    cache.set('user:' + id, { ...prev, ...data });
    return;
  }
  await User.findOneAndUpdate({ id }, { ...data, lastSeen: new Date() }, { upsert: true });
}

async function incrementStat(userId, field, by = 1) {
  if (!config.DB_ENABLED) {
    const u = cache.get('user:' + userId) || {};
    u[field] = (u[field] || 0) + by;
    cache.set('user:' + userId, u);
    return;
  }
  await User.findOneAndUpdate({ id: userId }, { $inc: { [field]: by } }, { upsert: true });
}

module.exports = { connect, getGroup, setGroup, getUser, setUser, incrementStat, Group, User, Schedule };
