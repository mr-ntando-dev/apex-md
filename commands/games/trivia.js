// ── Trivia Game ───────────────────────────────────────────────
const fetch     = require('node-fetch');
const NodeCache = require('node-cache');
const active    = new NodeCache({ stdTTL: 30 }); // 30s to answer

module.exports = {
  name:    'trivia',
  aliases: ['quiz'],
  category: 'games',
  desc:    'Answer a random trivia question',
  usage:   '.trivia',
  public:  true,

  async execute({ sock, msg, from, sender, args }) {
    // Answer phase
    if (args[0]) {
      const q = active.get(`trivia:${from}`);
      if (!q) return;
      const ans = args.join(' ').toLowerCase().trim();
      const correct = q.answer.toLowerCase();
      if (ans === correct || correct.includes(ans)) {
        active.del(`trivia:${from}`);
        return sock.sendMessage(from, { text: `✅ Correct! 🎉\nAnswer: *${q.answer}*` }, { quoted: msg });
      } else {
        return sock.sendMessage(from, { text: `❌ Wrong! Try again or wait for the answer.` }, { quoted: msg });
      }
    }

    // New question
    try {
      const res  = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await res.json();
      const q    = data.results[0];
      const all  = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
      const opts = all.map((a, i) => `${String.fromCharCode(65 + i)}. ${a}`).join('\n');
      const letter = String.fromCharCode(65 + all.indexOf(q.correct_answer));

      active.set(`trivia:${from}`, { answer: q.correct_answer, letter });

      return sock.sendMessage(from, {
        text: `🧠 *Trivia Time!*\n${q.category} | ${q.difficulty}\n${q.question}\n\n${opts}\n\nType the answer letter (A/B/C/D) or the full answer!`,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Failed to load question: ${err.message}` }, { quoted: msg });
    }
  },
};
