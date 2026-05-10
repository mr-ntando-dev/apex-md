module.exports = {
  name: 'poll', aliases: ['vote', 'createpoll'], category: 'admin',
  desc: 'Create a WhatsApp native poll', usage: '.poll Question | Option1 | Option2 | Option3',
  groupOnly: true, public: true,
  async execute({ sock, msg, from, args }) {
    const full = args.join(' ');
    const parts = full.split('|').map(s => s.trim()).filter(Boolean);
    if (parts.length < 3) {
      return sock.sendMessage(from, { text: '⚠️ Usage: .poll Question | Option A | Option B | Option C\n(Max 10 options)' }, { quoted: msg });
    }
    const question = parts[0];
    const options  = parts.slice(1, 11);
    return sock.sendMessage(from, {
      poll: {
        name: question,
        options: options.map(o => ({ optionName: o })),
        selectableCount: 1,
      },
    });
  },
};
