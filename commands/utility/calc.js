module.exports = {
  name: 'calc', aliases: ['math', 'calculate'], category: 'utility',
  desc: 'Calculate a math expression', usage: '.calc 2 + 2 * 10',
  public: true,
  async execute({ sock, msg, from, args }) {
    const expr = args.join(' ');
    if (!expr) return sock.sendMessage(from, { text: '🧮 .calc 2 + 2  OR  .calc 100 * 1.15' }, { quoted: msg });
    try {
      // Safe eval using Function (no arbitrary code — numbers and operators only)
      const safe = expr.replace(/[^0-9+\-*/().\s%]/g, '');
      if (!safe) throw new Error('Invalid expression');
      const result = Function('"use strict"; return (' + safe + ')')();
      return sock.sendMessage(from, { text: `🧮 ${expr} = *${result}*` }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '❌ Invalid math expression.' }, { quoted: msg });
    }
  },
};
