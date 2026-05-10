// ── AI Chat Command ────────────────────────────────────────────
const { aiReply, clearContext } = require('../../lib/ai');

module.exports = {
  name:    'ai',
  aliases: ['chat', 'ask', 'gpt', 'bot'],
  category: 'ai',
  desc:    'Chat with GPT-4o powered AI',
  usage:   '.ai [your question]',
  public:  true,

  async execute({ sock, msg, from, sender, args }) {
    const question = args.join(' ');
    if (!question) {
      return sock.sendMessage(from, { text: '🤖 Please include a message. Example: .ai What is the capital of France?' }, { quoted: msg });
    }
    await sock.sendPresenceUpdate('composing', from);
    const reply = await aiReply(sender, question);
    return sock.sendMessage(from, { text: `🤖 *APEX AI*\n\n${reply}` }, { quoted: msg });
  },
};
