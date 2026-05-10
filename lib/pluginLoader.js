// ── Live Plugin Loader — install commands without restart ──────
const fs     = require('fs');
const path   = require('path');
const fetch  = require('node-fetch');
const logger = require('./logger');

const PLUGINS_DIR = path.join(__dirname, '../plugins');
if (!fs.existsSync(PLUGINS_DIR)) fs.mkdirSync(PLUGINS_DIR, { recursive: true });

// Registry: name -> { file, commands[] }
const registry = new Map();

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase();
}

async function installPlugin(url, handler) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching plugin`);
  const code = await res.text();

  // Basic safety check — no exec/eval/child_process
  const BANNED = ['child_process', 'require("fs")', "require('fs')", '__dirname'];
  for (const b of BANNED) {
    if (code.includes(b)) throw new Error(`Plugin blocked: contains banned pattern "${b}"`);
  }

  // Derive plugin name from URL filename
  const rawName = path.basename(url, '.js').replace(/[^a-zA-Z0-9_-]/g, '-');
  const name    = sanitizeName(rawName);
  const file    = path.join(PLUGINS_DIR, `${name}.js`);

  fs.writeFileSync(file, code, 'utf8');

  // Load and register
  delete require.cache[require.resolve(file)];
  let mod;
  try {
    mod = require(file);
  } catch (err) {
    fs.unlinkSync(file);
    throw new Error(`Plugin load error: ${err.message}`);
  }

  const commands = Array.isArray(mod) ? mod : [mod];
  for (const cmd of commands) {
    if (cmd?.name && handler) handler.register(cmd);
  }

  registry.set(name, { file, url, commands: commands.map(c => c.name), loadedAt: new Date() });
  logger.info(`[Plugins] Installed: ${name} (${commands.length} commands)`);
  return { name, commands: commands.map(c => c.name) };
}

function uninstallPlugin(name, handler) {
  const entry = registry.get(sanitizeName(name));
  if (!entry) throw new Error(`Plugin "${name}" not found`);
  if (handler) {
    for (const cmd of entry.commands) handler.unregister(cmd);
  }
  if (fs.existsSync(entry.file)) fs.unlinkSync(entry.file);
  delete require.cache[require.resolve(entry.file)];
  registry.delete(sanitizeName(name));
  logger.info(`[Plugins] Uninstalled: ${name}`);
}

function listPlugins() {
  return Array.from(registry.entries()).map(([name, e]) => ({
    name, commands: e.commands, loadedAt: e.loadedAt,
  }));
}

// Load all persisted plugins on startup
async function loadPersistedPlugins(handler) {
  if (!fs.existsSync(PLUGINS_DIR)) return;
  const files = fs.readdirSync(PLUGINS_DIR).filter(f => f.endsWith('.js'));
  for (const file of files) {
    const full = path.join(PLUGINS_DIR, file);
    try {
      delete require.cache[require.resolve(full)];
      const mod = require(full);
      const commands = Array.isArray(mod) ? mod : [mod];
      const name = path.basename(file, '.js');
      for (const cmd of commands) {
        if (cmd?.name && handler) handler.register(cmd);
      }
      registry.set(name, { file: full, url: 'local', commands: commands.map(c => c.name), loadedAt: new Date() });
      logger.info(`[Plugins] Loaded persisted: ${name}`);
    } catch (err) {
      logger.warn(`[Plugins] Failed to load ${file}: ${err.message}`);
    }
  }
}

module.exports = { installPlugin, uninstallPlugin, listPlugins, loadPersistedPlugins };
