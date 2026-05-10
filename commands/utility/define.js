const fetch = require('node-fetch');
module.exports = {
  name: 'define', aliases: ['meaning', 'dictionary', 'dict'], category: 'utility',
  desc: 'Look up the definition of a word', usage: '.define [word]',
  public: true,
  async execute({ sock, msg, from, args }) {
    const word = args[0];
    if (!word) return sock.sendMessage(from, { text: '📖 .define serendipity' }, { quoted: msg });
    try {
      const res  = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      if (!Array.isArray(data)) return sock.sendMessage(from, { text: `❌ Word not found: *${word}*` }, { quoted: msg });
      const entry = data[0];
      const defs  = entry.meanings.slice(0, 2).map(m =>
        `*${m.partOfSpeech}*\n${m.definitions[0].definition}${m.definitions[0].example ? `\n_"${m.definitions[0].example}"_` : ''}`
      ).join('\n\n');
      const phonetic = entry.phonetic || '';
      return sock.sendMessage(from, { text: `📖 *${word}* ${phonetic}\n\n${defs}` }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Definition lookup failed.` }, { quoted: msg });
    }
  },
};
