// ── .settheme / .charlist ──────────────────────────────────────
const { listThemes, getTheme } = require('../../themes');
const db = require('../../lib/database');

module.exports = [
  {
    name: 'settheme', aliases: ['setchar', 'theme', 'character'], category: 'owner',
    desc: 'Change the bot personality/theme', usage: '.settheme [id]', public: false,
    async execute({ sock, msg, from, sender, args }) {
      const id = args[0]?.toLowerCase();
      if (!id) {
        return sock.sendMessage(from, {
          text: `🎭 *Available Themes*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${listThemes()}\n━━━━━━━━━━━━━━━━━━━━━━━━\nUsage: .settheme [id]`,
        }, { quoted: msg });
      }
      const theme = getTheme(id);
      if (theme.id !== id) return sock.sendMessage(from, { text: `⚠️ Unknown theme "${id}". Type .settheme to see all.` }, { quoted: msg });
      await db.setUser('bot_theme', { theme: id });
      await sock.sendMessage(from, { text: `${theme.emoji} Theme set to *${theme.name}*!\nRestart not needed — takes effect immediately.` }, { quoted: msg });
    },
  },
  {
    name: 'charlist', aliases: ['themelist', 'themes'], category: 'owner',
    desc: 'List all available bot themes', usage: '.charlist', public: true,
    async execute({ sock, msg, from }) {
      await sock.sendMessage(from, {
        text: `🎭 *Bot Themes*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${listThemes()}\n━━━━━━━━━━━━━━━━━━━━━━━━\nSet with: .settheme [id]`,
      }, { quoted: msg });
    },
  },
];
