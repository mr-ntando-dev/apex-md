module.exports = {
  name: 'restart', aliases: ['reboot'], category: 'owner',
  desc: 'Restart the bot process', usage: '.restart',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from }) {
    await sock.sendMessage(from, { text: '🔄 Restarting APEX-MD...' }, { quoted: msg });
    setTimeout(() => process.exit(0), 1000); // PM2 will auto-restart
  },
};
