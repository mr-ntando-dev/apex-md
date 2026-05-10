// ── Economy Engine ────────────────────────────────────────────
// Coins, XP, levels, daily, work, gambling — persisted per user
const NodeCache = require('node-cache');
const eco = new NodeCache({ stdTTL: 0 });

function getUser(id) {
  return eco.get('eco:' + id) || {
    coins: 500, xp: 0, level: 1, bank: 0,
    lastDaily: 0, lastWork: 0, lastRob: 0,
    inventory: [], totalWon: 0, totalLost: 0,
  };
}

function saveUser(id, data) {
  eco.set('eco:' + id, data);
}

function addXP(id, amount) {
  const u = getUser(id);
  u.xp += amount;
  const needed = u.level * 100;
  if (u.xp >= needed) { u.level++; u.xp -= needed; }
  saveUser(id, u);
  return u;
}

function addCoins(id, amount) {
  const u = getUser(id);
  u.coins = Math.max(0, u.coins + amount);
  saveUser(id, u);
  return u;
}

function getLeaderboard(n = 10) {
  const all = eco.keys().filter(k => k.startsWith('eco:')).map(k => {
    const u = eco.get(k);
    return { id: k.replace('eco:', ''), coins: u.coins + u.bank, level: u.level };
  });
  return all.sort((a, b) => b.coins - a.coins).slice(0, n);
}

module.exports = { getUser, saveUser, addXP, addCoins, getLeaderboard };
