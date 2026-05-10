const fetch = require('node-fetch');
module.exports = {
  name: 'meme', aliases: ['memes', 'reddit'], category: 'fun',
  desc: 'Get a random meme from Reddit', usage: '.meme',
  public: true,
  async execute({ sock, msg, from }) {
    try {
      const subs = ['memes', 'dankmemes', 'me_irl', 'funny', 'AdviceAnimals'];
      const sub  = subs[Math.floor(Math.random() * subs.length)];
      const res  = await fetch(`https://www.reddit.com/r/${sub}/random.json?limit=1`, {
        headers: { 'User-Agent': 'APEX-MD/1.0' },
      });
      const data = await res.json();
      const post = data[0]?.data?.children[0]?.data;
      if (!post || !post.url?.match(/\.(jpg|jpeg|png|gif)/i)) throw new Error();
      const imgRes = await fetch(post.url);
      const buffer = Buffer.from(await imgRes.arrayBuffer());
      return sock.sendMessage(from, { image: buffer, caption: `😂 *${post.title}*\n👍 ${post.ups} upvotes` }, { quoted: msg });
    } catch {
      return sock.sendMessage(from, { text: '😅 Could not fetch meme right now. Try again!' }, { quoted: msg });
    }
  },
};
