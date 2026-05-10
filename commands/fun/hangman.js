const NodeCache = require('node-cache');
const games  = new NodeCache({ stdTTL: 300 });
const WORDS  = ['javascript','python','whatsapp','programming','computer','elephant','universe','knowledge','adventure','champion','fantastic','developer'];
const STAGES = ['😵','😨😰','😰🦵','😰🦵🦵','😰💪🦵🦵','😰💪💪🦵🦵','🪦 DEAD'];

module.exports = {
  name: 'hangman', aliases: ['hm'], category: 'fun',
  desc: 'Play Hangman in the chat', usage: '.hangman — start  |  .hangman [letter] — guess',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    const key = 'hm:' + from;

    if (!args[0] || args[0].length > 1) {
      // Start new game
      const word    = WORDS[Math.floor(Math.random() * WORDS.length)];
      const display = '_'.repeat(word.length).split('');
      games.set(key, { word, display, wrong: [], tries: 0 });
      return sock.sendMessage(from, {
        text: `🎮 *Hangman Started!*\n\nWord: *${display.join(' ')}*\n📏 ${word.length} letters\n\nGuess a letter with .hangman [letter]`,
      }, { quoted: msg });
    }

    const g = games.get(key);
    if (!g) return sock.sendMessage(from, { text: '❌ No active game. Start with .hangman' }, { quoted: msg });

    const letter = args[0].toLowerCase();
    if (g.wrong.includes(letter) || g.display.includes(letter)) {
      return sock.sendMessage(from, { text: `⚠️ Already guessed: *${letter}*` }, { quoted: msg });
    }

    if (g.word.includes(letter)) {
      g.word.split('').forEach((c, i) => { if (c === letter) g.display[i] = letter; });
    } else {
      g.wrong.push(letter);
      g.tries++;
    }

    games.set(key, g);
    const won  = !g.display.includes('_');
    const lost = g.tries >= 6;

    if (won) {
      games.del(key);
      return sock.sendMessage(from, { text: `🎉 *You Won!*\nWord: *${g.word}*` }, { quoted: msg });
    }
    if (lost) {
      games.del(key);
      return sock.sendMessage(from, { text: `💀 *Game Over!*\nWord was: *${g.word}*\n${STAGES[6]}` }, { quoted: msg });
    }

    return sock.sendMessage(from, {
      text: `🎮 *Hangman*\n\nWord: *${g.display.join(' ')}*\n❌ Wrong: ${g.wrong.join(', ') || 'none'}\n${STAGES[g.tries]} Lives left: ${6 - g.tries}/6`,
    }, { quoted: msg });
  },
};
