const eco = require('../../lib/economy');
module.exports = {
  name: 'leaderboard', aliases: ['lb', 'top', 'richlist'], category: 'games',
  desc: 'View top 10 richest users', usage: '.leaderboard',
  public: true,
  async execute({ sock, msg, from }) {
    const top   = eco.getLeaderboard(10);
    if (!top.length) return sock.sendMessage(from, { text: '📭 No economy data yet. Use .daily or .work to start!' }, { quoted: msg });
    const medals = ['🥇','🥈','🥉'];
    const list   = top.map((u, i) => `${medals[i] || `${i+1}.`} @${u.id.split('@')[0]} — *${u.coins}* coins | Lv.${u.level}`).join('\n');
    return sock.sendMessage(from, { text: `🏆 *Top 10 Richest*\n\n${list}` }, { quoted: msg });
  },
};
