const fetch = require('node-fetch');
module.exports = {
  name: 'fact', aliases: ['facts', 'randomfact'], category: 'fun',
  desc: 'Get a random interesting fact', usage: '.fact',
  public: true,
  async execute({ sock, msg, from }) {
    try {
      const res  = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
      const data = await res.json();
      return sock.sendMessage(from, { text: `🧠 *Random Fact*\n\n${data.text}` }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '🧠 *Fact:* A group of flamingos is called a "flamboyance". Fitting.' }, { quoted: msg });
    }
  },
};
