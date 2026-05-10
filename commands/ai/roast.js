const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'roast', aliases: ['clap'], category: 'ai',
  desc: 'Generate a savage AI roast for someone', usage: '.roast @user OR .roast [name]',
  public: true,
  async execute({ sock, msg, from, sender, args, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const target   = mentions.length ? `@${mentions[0].split('@')[0]}` : args.join(' ') || 'that person';
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, `Give a funny, clever roast for "${target}". Keep it playful, not truly offensive. 2-3 sentences max.`);
    return sock.sendMessage(from, {
      text: `🔥 *Roast for ${target}*\n\n${reply}`,
      mentions: mentions,
    }, { quoted: msg });
  },
};
