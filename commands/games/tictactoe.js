// ── Tic-Tac-Toe (WhatsApp-native, text board) ─────────────────
const NodeCache = require('node-cache');
const games     = new NodeCache({ stdTTL: 600 });

function renderBoard(board) {
  const sym = { null: '⬜', X: '❌', O: '⭕' };
  return [
    `${sym[board[0]]}${sym[board[1]]}${sym[board[2]]}`,
    `${sym[board[3]]}${sym[board[4]]}${sym[board[5]]}`,
    `${sym[board[6]]}${sym[board[7]]}${sym[board[8]]}`,
  ].join('\n');
}

function checkWinner(board) {
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for (const [a,b,c] of wins) if (board[a] && board[a]===board[b] && board[b]===board[c]) return board[a];
  return board.includes(null) ? null : 'draw';
}

module.exports = {
  name:    'tictactoe',
  aliases: ['ttt'],
  category: 'games',
  desc:    'Play Tic-Tac-Toe against another player',
  usage:   '.tictactoe @opponent  |  .tictactoe [1-9] to play a move',
  public:  true,

  async execute({ sock, msg, from, sender, args, rawMsg }) {
    // Start new game
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    if (mentions.length) {
      const opponent = mentions[0];
      const gameId   = `ttt:${from}`;
      const board    = Array(9).fill(null);
      games.set(gameId, { board, players: [sender, opponent], turn: 0 });

      return sock.sendMessage(from, {
        text: `🎮 *Tic-Tac-Toe Started!*\n❌ = @${sender.split('@')[0]}\n⭕ = @${opponent.split('@')[0]}\n\n${renderBoard(board)}\n\n@${sender.split('@')[0]}'s turn! Type .tictactoe [1-9] to play.\n\n1️⃣2️⃣3️⃣\n4️⃣5️⃣6️⃣\n7️⃣8️⃣9️⃣`,
        mentions: [sender, opponent],
      }, { quoted: msg });
    }

    // Make a move
    const pos    = parseInt(args[0]) - 1;
    const gameId = `ttt:${from}`;
    const game   = games.get(gameId);

    if (!game) return sock.sendMessage(from, { text: '❌ No active game. Start one with .tictactoe @user' }, { quoted: msg });
    if (game.players[game.turn] !== sender) return sock.sendMessage(from, { text: `⏳ It's not your turn!` }, { quoted: msg });
    if (isNaN(pos) || pos < 0 || pos > 8 || game.board[pos]) return sock.sendMessage(from, { text: '⚠️ Invalid move. Pick 1-9 on an empty cell.' }, { quoted: msg });

    const symbol   = game.turn === 0 ? 'X' : 'O';
    game.board[pos] = symbol;
    game.turn       = 1 - game.turn;
    const winner    = checkWinner(game.board);

    if (winner) {
      games.del(gameId);
      const winText = winner === 'draw' ? '🤝 *It\'s a draw!*' : `🏆 *${winner === 'X' ? '@' + game.players[0].split('@')[0] : '@' + game.players[1].split('@')[0]} wins!*`;
      return sock.sendMessage(from, {
        text:     `${renderBoard(game.board)}\n\n${winText}`,
        mentions: game.players,
      }, { quoted: msg });
    }

    games.set(gameId, game);
    return sock.sendMessage(from, {
      text:     `${renderBoard(game.board)}\n\n@${game.players[game.turn].split('@')[0]}'s turn!`,
      mentions: [game.players[game.turn]],
    }, { quoted: msg });
  },
};
