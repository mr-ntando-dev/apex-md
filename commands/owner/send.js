module.exports = {
  name: 'send', aliases: ['msg', 'dm'], category: 'owner',
  desc: 'Send a message to any number or group JID (owner only)', usage: '.send [JID] [message]',
  ownerOnly: true, public: false,
  async execute({ sock, msg, from, args }) {
    const jid     = args[0];
    const message = args.slice(1).join(' ');
    if (!jid || !message) return sock.sendMessage(from, { text: '.send 2348012345678@s.whatsapp.net Hello!' }, { quoted: msg });
    await sock.sendMessage(jid, { text: message });
    return sock.sendMessage(from, { text: `✅ Message sent to ${jid}` }, { quoted: msg });
  },
};
