const { clearContext } = require('../../lib/ai');
module.exports = {
  name: 'clearchat', aliases: ['resetai', 'newchat'], category: 'ai',
  desc: 'Clear your AI conversation memory and start fresh', usage: '.clearchat',
  public: true,
  async execute({ sock, msg, from, sender }) {
    clearContext(sender);
    return sock.sendMessage(from, { text: '🧹 AI memory cleared! Starting fresh.' }, { quoted: msg });
  },
};
