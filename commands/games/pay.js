const eco = require('../../lib/economy');
module.exports = {
  name: 'pay', aliases: ['give', 'transfer'], category: 'games',
  desc: 'Send coins to another user', usage: '.pay @user [amount]',
  public: true,
  async execute({ sock, msg, from, sender, args, rawMsg }) {
    const mentions = rawMsg?.extendedTextMessage?.contextInfo?.mentionedJid || [];
    const amount   = parseInt(args[args.length - 1]);
    if (!mentions.length || isNaN(amount) || amount < 1) return sock.sendMessage(from, { text: '.pay @user 100' }, { quoted: msg });
    const target = mentions[0];
    if (target === sender) return sock.sendMessage(from, { text: "💀 You can't pay yourself." }, { quoted: msg });
    const payer = eco.getUser(sender);
    if (payer.coins < amount) return sock.sendMessage(from, { text: `❌ Not enough coins. You have *${payer.coins}*.` }, { quoted: msg });
    payer.coins -= amount;
    eco.saveUser(sender, payer);
    eco.addCoins(target, amount);
    return sock.sendMessage(from, {
      text: `💸 *Transfer Complete!*\n@${sender.split('@')[0]} → @${target.split('@')[0]}\n🪙 Amount: *${amount} coins*`,
      mentions: [sender, target],
    }, { quoted: msg });
  },
};
