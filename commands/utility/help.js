// ── Help Menu ─────────────────────────────────────────────────
const config   = require('../../config');
const { commands } = require('../../lib/handler');

module.exports = {
  name:    'help',
  aliases: ['menu', 'commands', 'h'],
  category: 'utility',
  desc:    'Show all available commands',
  usage:   '.help [command]',
  public:  true,

  async execute({ sock, msg, from, args }) {
    const { BOT_NAME, BOT_VERSION, THEME_EMOJI, DIVIDER, BOT_PREFIX: P } = config;

    // ── Single command lookup ───────────────────────────────
    if (args[0]) {
      const cmd = commands.get(args[0].toLowerCase());
      if (!cmd) return sock.sendMessage(from, { text: `❌ Command *${args[0]}* not found.` }, { quoted: msg });
      return sock.sendMessage(from, {
        text: `${THEME_EMOJI} *${cmd.name.toUpperCase()}*\n${DIVIDER}\n📋 ${cmd.desc}\n💡 Usage: ${cmd.usage}\n🏷️ Category: ${cmd.category}\n${cmd.aliases ? `🔁 Aliases: ${cmd.aliases.join(', ')}` : ''}`,
      }, { quoted: msg });
    }

    // ── Full menu by category ───────────────────────────────
    const cats = {};
    for (const [, cmd] of commands) {
      if (!cats[cmd.category]) cats[cmd.category] = [];
      cats[cmd.category].push(cmd.name);
    }

    const catEmoji = {
      admin:      '🛡️',
      ai:         '🤖',
      media:      '🎬',
      games:      '🎮',
      utility:    '🔧',
      business:   '💼',
      fun:        '😂',
      owner:      '👑',
      downloader: '⬇️',
      nsfw:       '🔞',
    };

    let text = `${THEME_EMOJI} *${BOT_NAME} v${BOT_VERSION}*\n${DIVIDER}\n\n`;
    text += `Prefix: *${P}*  |  Commands: *${commands.size}*\n\n`;

    for (const [cat, cmds] of Object.entries(cats)) {
      text += `${catEmoji[cat] || '📂'} *${cat.toUpperCase()}*\n`;
      text += cmds.map(c => `  ${P}${c}`).join('\n');
      text += '\n\n';
    }
    text += `${DIVIDER}\n💡 ${P}help [command] for details`;

    return sock.sendMessage(from, { text }, { quoted: msg });
  },
};
