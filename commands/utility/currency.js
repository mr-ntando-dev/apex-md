const fetch = require('node-fetch');
module.exports = {
  name: 'currency', aliases: ['convert', 'forex', 'fx'], category: 'utility',
  desc: 'Convert currency amounts', usage: '.currency 100 USD NGN',
  public: true,
  async execute({ sock, msg, from, args }) {
    const [amount, from_, to] = args;
    if (!amount || !from_ || !to) return sock.sendMessage(from, { text: '💱 .currency 100 USD NGN' }, { quoted: msg });
    try {
      const res  = await fetch(`https://open.er-api.com/v6/latest/${from_.toUpperCase()}`);
      const data = await res.json();
      const rate = data.rates[to.toUpperCase()];
      if (!rate) return sock.sendMessage(from, { text: `❌ Unknown currency: ${to}` }, { quoted: msg });
      const result = (parseFloat(amount) * rate).toFixed(2);
      return sock.sendMessage(from, {
        text: `💱 *Currency Conversion*\n\n${amount} ${from_.toUpperCase()} = *${result} ${to.toUpperCase()}*\n📊 Rate: 1 ${from_.toUpperCase()} = ${rate.toFixed(4)} ${to.toUpperCase()}`,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Conversion failed: ${err.message}` }, { quoted: msg });
    }
  },
};
