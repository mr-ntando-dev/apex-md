const fetch = require('node-fetch');
module.exports = {
  name: 'quote', aliases: ['inspiration', 'motivate', 'inspire'], category: 'fun',
  desc: 'Get a random inspirational quote', usage: '.quote',
  public: true,
  async execute({ sock, msg, from }) {
    try {
      const res  = await fetch('https://zenquotes.io/api/random');
      const data = await res.json();
      const q    = data[0];
      return sock.sendMessage(from, { text: `💭 *"${q.q}"*\n\n— *${q.a}*` }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '💭 *"The best time to start was yesterday. The next best time is now."*\n\n— Unknown' }, { quoted: msg });
    }
  },
};
