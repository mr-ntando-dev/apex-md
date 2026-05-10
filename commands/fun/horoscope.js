// ── .horoscope — AI-powered daily horoscope ───────────────────
const { aiReply } = require('../../lib/ai');
const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const EMOJI  = {aries:'♈',taurus:'♉',gemini:'♊',cancer:'♋',leo:'♌',virgo:'♍',libra:'♎',scorpio:'♏',sagittarius:'♐',capricorn:'♑',aquarius:'♒',pisces:'♓'};

module.exports = {
  name:'horoscope', aliases:['horo','zodiac','stars'], category:'fun',
  desc:'Get your AI daily horoscope', usage:'.horoscope [sign]', public:true,
  async execute({ sock, msg, from, sender, args }) {
    const sign = args[0]?.toLowerCase();
    if (!sign || !SIGNS.includes(sign))
      return sock.sendMessage(from, { text: `Usage: .horoscope [sign]\nSigns: ${SIGNS.join(', ')}` }, { quoted: msg });
    await sock.sendMessage(from, { text: `${EMOJI[sign]} Reading the stars...` }, { quoted: msg });
    const today = new Date().toDateString();
    const prompt = `Daily horoscope for ${sign} on ${today}. Format:
${EMOJI[sign]} *${sign.toUpperCase()} — ${today}*
💫 *Energy:* [1 sentence]
❤️ *Love:* [1 sentence]
💼 *Career:* [1 sentence]
💰 *Money:* [1 sentence]
⚠️ *Watch:* [1 sentence]
🌟 *Lucky number:* [N] | *Color:* [color]`;
    const horo = await aiReply(sender+'_horo', prompt, 'You are a mystical horoscope writer. Be poetic but concise.');
    if (!horo) return sock.sendMessage(from, { text: 'Stars are misaligned. Try again.' }, { quoted: msg });
    await sock.sendMessage(from, { text: horo }, { quoted: msg });
  },
};
