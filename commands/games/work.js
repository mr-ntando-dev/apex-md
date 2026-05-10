const eco = require('../../lib/economy');
const JOBS = [
  { name: 'Developer', min: 80, max: 200 },
  { name: 'Driver',    min: 40, max: 100 },
  { name: 'Chef',      min: 50, max: 120 },
  { name: 'Teacher',   min: 60, max: 130 },
  { name: 'Trader',    min: 30, max: 90  },
  { name: 'Designer',  min: 70, max: 160 },
  { name: 'Mechanic',  min: 45, max: 110 },
  { name: 'Doctor',    min: 100, max: 250 },
];
module.exports = {
  name: 'work', aliases: ['job', 'earn'], category: 'games',
  desc: 'Work a random job to earn coins (1hr cooldown)', usage: '.work',
  public: true,
  async execute({ sock, msg, from, sender }) {
    const u   = eco.getUser(sender);
    const cd  = 60 * 60 * 1000;
    const now = Date.now();
    if (now - (u.lastWork || 0) < cd) {
      const left = cd - (now - u.lastWork);
      const m    = Math.floor(left / 60000);
      return sock.sendMessage(from, { text: `⏳ You're tired! Rest for *${m} more minutes*.` }, { quoted: msg });
    }
    const job    = JOBS[Math.floor(Math.random() * JOBS.length)];
    const earned = Math.floor(Math.random() * (job.max - job.min + 1)) + job.min;
    u.coins   += earned;
    u.lastWork = now;
    eco.saveUser(sender, u);
    eco.addXP(sender, 15);
    return sock.sendMessage(from, {
      text: `💼 You worked as a *${job.name}* and earned *${earned} coins*!\n💰 Balance: *${u.coins}*`,
    }, { quoted: msg });
  },
};
