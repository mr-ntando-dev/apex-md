// Quiz with coin rewards — uses WhatsApp native poll
const fetch     = require('node-fetch');
const NodeCache = require('node-cache');
const eco       = require('../../lib/economy');
const active    = new NodeCache({ stdTTL: 30 });

module.exports = {
  name: 'quiz', aliases: ['startquiz'], category: 'games',
  desc: 'Start a trivia quiz — correct answer earns coins!', usage: '.quiz',
  public: true,
  async execute({ sock, msg, from, sender }) {
    if (active.get('q:' + from)) return sock.sendMessage(from, { text: '⏳ A quiz is already active! Answer it first.' }, { quoted: msg });
    try {
      const res  = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await res.json();
      const q    = data.results[0];
      const all  = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);

      active.set('q:' + from, { answer: q.correct_answer, options: all });

      return sock.sendMessage(from, {
        poll: {
          name: `🧠 ${q.question} (${q.difficulty})`,
          options: all.map(o => ({ optionName: o })),
          selectableCount: 1,
        },
      });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Quiz failed: ${err.message}` }, { quoted: msg });
    }
  },
};
