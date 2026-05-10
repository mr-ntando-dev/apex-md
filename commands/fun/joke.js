const fetch = require('node-fetch');
module.exports = {
  name: 'joke', aliases: ['jokes', 'lol'], category: 'fun',
  desc: 'Get a random joke', usage: '.joke',
  public: true,
  async execute({ sock, msg, from }) {
    try {
      const res  = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=racist,sexist&format=json');
      const data = await res.json();
      const text = data.type === 'twopart' ? `😂 ${data.setup}\n\n🤣 ${data.delivery}` : `😂 ${data.joke}`;
      return sock.sendMessage(from, { text }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '😂 Why did the bot crash?\n\nBecause you sent too many commands! 🤣' }, { quoted: msg });
    }
  },
};
