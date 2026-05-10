// ── Anime Reactions (26 types via Tenor API) ──────────────────
const config = require('../../config');

const REACTIONS = {
  hug:      { text: 'hugs', emoji: '🤗', query: 'anime hug' },
  kiss:     { text: 'kisses', emoji: '😘', query: 'anime kiss' },
  slap:     { text: 'slaps', emoji: '👋', query: 'anime slap' },
  pat:      { text: 'pats', emoji: '😊', query: 'anime headpat' },
  bite:     { text: 'bites', emoji: '😈', query: 'anime bite' },
  cry:      { text: 'cries', emoji: '😢', query: 'anime cry' },
  bonk:     { text: 'bonks', emoji: '🔨', query: 'anime bonk' },
  wave:     { text: 'waves at', emoji: '👋', query: 'anime wave' },
  dance:    { text: 'dances with', emoji: '💃', query: 'anime dance' },
  poke:     { text: 'pokes', emoji: '👉', query: 'anime poke' },
  cuddle:   { text: 'cuddles', emoji: '🥰', query: 'anime cuddle' },
  blush:    { text: 'blushes at', emoji: '😳', query: 'anime blush' },
  wink:     { text: 'winks at', emoji: '😉', query: 'anime wink' },
  laugh:    { text: 'laughs at', emoji: '😂', query: 'anime laugh' },
  stare:    { text: 'stares at', emoji: '👀', query: 'anime stare' },
  punch:    { text: 'punches', emoji: '👊', query: 'anime punch' },
  lick:     { text: 'licks', emoji: '👅', query: 'anime lick' },
  nom:      { text: 'noms', emoji: '😋', query: 'anime nom' },
  yeet:     { text: 'yeets', emoji: '🚀', query: 'anime yeet' },
  nuzzle:   { text: 'nuzzles', emoji: '😌', query: 'anime nuzzle' },
  smug:     { text: 'smug face at', emoji: '😏', query: 'anime smug' },
  pout:     { text: 'pouts at', emoji: '😤', query: 'anime pout' },
  shrug:    { text: 'shrugs at', emoji: '🤷', query: 'anime shrug' },
  facepalm: { text: 'facepalms at', emoji: '🤦', query: 'anime facepalm' },
  highfive: { text: 'high-fives', emoji: '🙌', query: 'anime high five' },
  confused: { text: 'is confused by', emoji: '😵', query: 'anime confused' },
};

async function fetchGif(query) {
  if (!config.TENOR_API_KEY) return null;
  const fetch = require('node-fetch');
  try {
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(query)}&key=${config.TENOR_API_KEY}&limit=20&media_filter=gif`;
    const res  = await fetch(url);
    const data = await res.json();
    const results = data?.results;
    if (!results?.length) return null;
    const pick = results[Math.floor(Math.random() * results.length)];
    return pick?.media_formats?.gif?.url || pick?.media_formats?.tinygif?.url || null;
  } catch (_) { return null; }
}

// Generate a module for each reaction type
const names = Object.keys(REACTIONS);

module.exports = names.map(name => {
  const r = REACTIONS[name];
  return {
    name,
    aliases: [],
    category: 'anime',
    desc: `Send an anime ${name} reaction GIF`,
    usage: `.${name} [@mention]`,
    public: true,
    async execute({ sock, msg, from, sender, mentions }) {
      const target = mentions?.[0]
        ? `@${mentions[0].split('@')[0]}`
        : '';
      const senderName = sender.split('@')[0];
      const caption = target
        ? `${r.emoji} *${senderName}* ${r.text} *${target}*`
        : `${r.emoji} *${senderName}* ${r.text}`;

      const gifUrl = await fetchGif(r.query);
      if (gifUrl) {
        const fetch = require('node-fetch');
        const buf = await (await fetch(gifUrl)).buffer();
        await sock.sendMessage(from, {
          video:    buf,
          mimetype: 'image/gif',
          caption,
          gifPlayback: true,
          mentions: mentions || [],
        }, { quoted: msg });
      } else {
        // Fallback: text only if no Tenor key
        await sock.sendMessage(from, {
          text: `${caption}\n\n_(Add TENOR_API_KEY to .env for GIFs)_`,
          mentions: mentions || [],
        }, { quoted: msg });
      }
    },
  };
});
