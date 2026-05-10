const { aiReply } = require('../../lib/ai');
module.exports = {
  name: 'summarize', aliases: ['tldr', 'sum'], category: 'ai',
  desc: 'Summarize any text or quoted message', usage: '.summarize [text] OR reply to a message with .summarize',
  public: true,
  async execute({ sock, msg, from, sender, args, rawMsg }) {
    const quoted = rawMsg?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation || '';
    const text   = args.join(' ') || quoted;
    if (!text) return sock.sendMessage(from, { text: '📝 Provide text or reply to a message.' }, { quoted: msg });
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, `Summarize this in 3-5 bullet points, be concise:\n\n${text}`);
    return sock.sendMessage(from, { text: `📝 *Summary*\n\n${reply}` }, { quoted: msg });
  },
};
