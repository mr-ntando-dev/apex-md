const fetch = require('node-fetch');
const config = require('../../config');
module.exports = {
  name:'virus', aliases:['scanurl','safescan','virustotal'], category:'utility',
  desc:'Scan a URL for malware and phishing threats', usage:'.virus [url]', public:true,
  async execute({ sock, msg, from, args }) {
    const url = args[0];
    if (!url || !url.startsWith('http')) return sock.sendMessage(from, { text: 'Usage: .virus [url]\nExample: .virus https://example.com' }, { quoted: msg });
    await sock.sendMessage(from, { text: '🔍 Scanning URL for threats...' }, { quoted: msg });
    try {
      // Use urlscan.io free API (no key needed for basic scan)
      const res = await fetch('https://urlscan.io/api/v1/scan/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'API-Key': config.URLSCAN_API_KEY || '' },
        body: JSON.stringify({ url, visibility: 'public' }),
      });
      const data = await res.json();
      if (data?.result) {
        await sock.sendMessage(from, { text: `🔍 *URL Scan Started*\n📋 URL: ${url}\n⏳ Result will be available at:\n${data.result}\n\n_Full results in ~30 seconds_` }, { quoted: msg });
      } else if (data?.message) {
        // Fallback: Google Safe Browsing check via proxy
        const safe = await fetch(`https://transparencyreport.google.com/transparencyreport/api/v3/safebrowsing/status?site=${encodeURIComponent(url)}`);
        const txt  = await safe.text();
        const isSafe = txt.includes('"SOCIAL_ENGINEERING":false') || !txt.includes('true');
        await sock.sendMessage(from, {
          text: `🔍 *URL Safety Check*\n📋 URL: ${url}\n${isSafe ? '✅ No known threats detected (Google Safe Browsing)' : '⚠️ Potential threat detected!'}\n\n_For deeper scanning add URLSCAN_API_KEY to .env_`,
        }, { quoted: msg });
      }
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ Scan error: ${err.message}` }, { quoted: msg });
    }
  },
};
