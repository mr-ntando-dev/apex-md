const TRUTHS = [
  'What is the most embarrassing thing you\'ve done?',
  'Who do you have a secret crush on in this group? 👀',
  'What\'s the biggest lie you\'ve told recently?',
  'Have you ever ghosted someone?',
  'What\'s something you\'ve never told your parents?',
  'If you could swap lives with anyone here, who would it be?',
  'What\'s your most embarrassing childhood memory?',
  'Have you ever pretended to be sick to avoid something?',
  'What is your most used emoji and why? 😏',
  'What\'s the weirdest dream you\'ve ever had?',
];
const DARES = [
  'Send a voice note singing your favorite song 🎤',
  'Change your display name to something funny for 1 hour',
  'Tag 5 people and tell them they\'re beautiful',
  'Text "I love you" to the 3rd person in your contacts',
  'Do 20 pushups and send a video',
  'Let someone in the group post a message as you',
  'Send your most unflattering selfie in the group',
  'Speak only in emojis for the next 10 messages',
  'Compliment every person in this group',
  'Send the last photo in your gallery (no deleting!) 😂',
];
module.exports = {
  name: 'truthordare', aliases: ['tod', 'truth', 'dare'], category: 'fun',
  desc: 'Get a random truth or dare', usage: '.truth  OR  .dare  OR  .truthordare',
  public: true,
  async execute({ sock, msg, from, args }) {
    const cmd  = args[0]?.toLowerCase();
    if (cmd === 'dare' || msg.key?.id?.includes('dare')) {
      const d = DARES[Math.floor(Math.random() * DARES.length)];
      return sock.sendMessage(from, { text: `😈 *DARE*\n\n${d}` }, { quoted: msg });
    }
    const t = TRUTHS[Math.floor(Math.random() * TRUTHS.length)];
    return sock.sendMessage(from, { text: `🤭 *TRUTH*\n\n${t}` }, { quoted: msg });
  },
};
