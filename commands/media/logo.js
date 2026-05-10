// ── .logo — Logo/text art generator (40 styles) ───────────────
const fetch = require('node-fetch');
const fs    = require('fs');
const path  = require('path');
const os    = require('os');

// Style list powered by api.ztcmd.com (free logo API)
const STYLES = [
  'glitch','neon','fire','ice','galaxy','gold','chrome','wood','stone','graffiti',
  'shadow','outline','retro','pixel','matrix','blood','toxic','electric','lava','ocean',
  'sunset','forest','sand','cloud','smoke','rainbow','hologram','carbon','led','laser',
  'copper','bronze','silver','diamond','crystal','vaporwave','synthwave','cyberpunk','steampunk','minimal',
];

module.exports = {
  name: 'logo', aliases: ['textart','makelogo'], category: 'media',
  desc: `Create a logo image from text (${STYLES.length} styles)`,
  usage: '.logo [style] [text]\nExample: .logo neon APEX-MD\n.logo styles — list all styles',
  public: true,
  async execute({ sock, msg, from, sender, args }) {
    if (args[0]?.toLowerCase() === 'styles') {
      const list = STYLES.map((s, i) => `${i+1}. ${s}`).join('\n');
      return sock.sendMessage(from, { text: `🎨 *Logo Styles (${STYLES.length})*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${list}\n━━━━━━━━━━━━━━━━━━━━━━━━\nUsage: .logo [style] [text]` }, { quoted: msg });
    }

    const style = args[0]?.toLowerCase();
    const text  = args.slice(1).join(' ');

    if (!style || !text) return sock.sendMessage(from, { text: 'Usage: .logo [style] [text]\nType .logo styles to see all styles.' }, { quoted: msg });
    if (!STYLES.includes(style)) return sock.sendMessage(from, { text: `⚠️ Unknown style "${style}". Type .logo styles for the full list.` }, { quoted: msg });
    if (text.length > 30) return sock.sendMessage(from, { text: '⚠️ Text too long. Max 30 characters for logo.' }, { quoted: msg });

    await sock.sendMessage(from, { text: `🎨 Creating *${style}* logo...` }, { quoted: msg });

    try {
      // Try ztcmd logo API
      const apiUrl = `https://api.ztcmd.com/logo?text=${encodeURIComponent(text)}&style=${style}`;
      const res    = await fetch(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });

      if (res.ok && res.headers.get('content-type')?.includes('image')) {
        const buf = await res.buffer();
        return sock.sendMessage(from, { image: buf, caption: `🎨 *${style.toUpperCase()}* — ${text}` }, { quoted: msg });
      }

      // Fallback: use textpro.me API
      const fallbackUrl = `https://www.textpro.me/api/generate?text=${encodeURIComponent(text)}&style=${style}&size=100`;
      const res2 = await fetch(fallbackUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res2.ok) {
        const buf = await res2.buffer();
        return sock.sendMessage(from, { image: buf, caption: `🎨 *${style.toUpperCase()}* — ${text}` }, { quoted: msg });
      }

      await sock.sendMessage(from, { text: `⚠️ Logo generation failed for style "${style}". Try another style.` }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Logo error: ${err.message}` }, { quoted: msg });
    }
  },
};
