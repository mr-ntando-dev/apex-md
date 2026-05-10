// ── .install / .uninstall / .plugins ──────────────────────────
const { installPlugin, uninstallPlugin, listPlugins } = require('../../lib/pluginLoader');

module.exports = [
  {
    name: 'install', aliases: ['addplugin'], category: 'owner',
    desc: 'Install a plugin from a URL without restarting the bot',
    usage: '.install [url]', public: false,
    async execute({ sock, msg, from, args, handler }) {
      const url = args[0];
      if (!url || !url.startsWith('http')) return sock.sendMessage(from, { text: 'Usage: .install [url]\nExample: .install https://gist.githubusercontent.com/.../plugin.js' }, { quoted: msg });
      await sock.sendMessage(from, { text: '📦 Installing plugin...' }, { quoted: msg });
      try {
        const result = await installPlugin(url, handler);
        await sock.sendMessage(from, { text: `✅ *Plugin installed!*\n📛 Name: ${result.name}\n🔧 Commands: ${result.commands.join(', ')}\n\nNo restart needed.` }, { quoted: msg });
      } catch (err) {
        await sock.sendMessage(from, { text: `❌ Install failed: ${err.message}` }, { quoted: msg });
      }
    },
  },
  {
    name: 'uninstall', aliases: ['removeplugin', 'delplugin'], category: 'owner',
    desc: 'Remove an installed plugin', usage: '.uninstall [name]', public: false,
    async execute({ sock, msg, from, args, handler }) {
      const name = args[0];
      if (!name) return sock.sendMessage(from, { text: 'Usage: .uninstall [plugin-name]' }, { quoted: msg });
      try {
        uninstallPlugin(name, handler);
        await sock.sendMessage(from, { text: `🗑️ Plugin *${name}* removed successfully.` }, { quoted: msg });
      } catch (err) {
        await sock.sendMessage(from, { text: `❌ ${err.message}` }, { quoted: msg });
      }
    },
  },
  {
    name: 'plugins', aliases: ['pluginlist', 'installed'], category: 'owner',
    desc: 'List all installed plugins', usage: '.plugins', public: false,
    async execute({ sock, msg, from }) {
      const list = listPlugins();
      if (!list.length) return sock.sendMessage(from, { text: '📦 No plugins installed yet.\nUse .install [url] to add one.' }, { quoted: msg });
      const lines = list.map(p => `📦 *${p.name}*\n   Commands: ${p.commands.join(', ')}\n   Loaded: ${p.loadedAt.toLocaleString()}`);
      await sock.sendMessage(from, { text: `📦 *Installed Plugins (${list.length})*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${lines.join('\n\n')}` }, { quoted: msg });
    },
  },
];
