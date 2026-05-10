const { supportedLangs } = require('../../lib/i18n');
const db = require('../../lib/database');
const LANG_NAMES = { en:'English', pt:'Português', es:'Español', fr:'Français', sw:'Swahili', zu:'Zulu', ha:'Hausa' };
module.exports = {
  name:'setlang', aliases:['language','lang'], category:'utility',
  desc:'Set the bot\'s response language for this group/chat', usage:'.setlang [code]\n.setlang list — see all languages', public:false,
  async execute({ sock, msg, from, sender, args }) {
    const code = args[0]?.toLowerCase();
    const langs = supportedLangs();
    if (!code || code === 'list') {
      const list = langs.map(l => `*${l}* — ${LANG_NAMES[l] || l}`).join('\n');
      return sock.sendMessage(from, { text: `🌍 *Supported Languages*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${list}\n━━━━━━━━━━━━━━━━━━━━━━━━\nUsage: .setlang [code]\nExample: .setlang sw` }, { quoted: msg });
    }
    if (!langs.includes(code)) return sock.sendMessage(from, { text: `⚠️ Unknown language code "${code}".\nType .setlang list to see options.` }, { quoted: msg });
    await db.setGroup(from, { language: code });
    await sock.sendMessage(from, { text: `🌍 Language set to *${LANG_NAMES[code] || code}* for this chat.` }, { quoted: msg });
  },
};
