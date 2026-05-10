const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'code', aliases: ['codegen', 'program'], category: 'ai',
  desc: 'Generate code with AI', usage: '.code [language]: [what to build]',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const full = args.join(' ');
    const sep  = full.indexOf(':');
    const lang = sep !== -1 ? full.slice(0, sep).trim() : 'JavaScript';
    const task = sep !== -1 ? full.slice(sep + 1).trim() : full;
    if (!task) return sock.sendMessage(from, { text: '💻 .code Python: sort a list of numbers' }, { quoted: msg });
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, `Write ${lang} code to: ${task}. Provide only the code with brief comments. Keep it concise.`);
    return sock.sendMessage(from, { text: `💻 *${lang} Code*\n\n\`\`\`\n${reply}\n\`\`\`` }, { quoted: msg });
  },
};
