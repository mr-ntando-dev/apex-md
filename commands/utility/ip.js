const fetch = require('node-fetch');
module.exports = {
  name:'ip', aliases:['iplookup','ipinfo','geoip'], category:'utility',
  desc:'Look up information about an IP address', usage:'.ip [ip address]', public:true,
  async execute({ sock, msg, from, args }) {
    const ip = args[0];
    if (!ip) return sock.sendMessage(from, { text: 'Usage: .ip [ip address]\nExample: .ip 8.8.8.8' }, { quoted: msg });
    try {
      const res  = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      if (data.error) return sock.sendMessage(from, { text: `⚠️ ${data.reason || 'IP not found.'}` }, { quoted: msg });
      const lines = [
        `🌐 *IP Lookup: ${ip}*`, '━━━━━━━━━━━━━━━━━━━━━━━━',
        `🏳️ *Country:* ${data.country_name} (${data.country})`,
        `🏙️ *City:* ${data.city || 'Unknown'}`,
        `🗺️ *Region:* ${data.region || 'Unknown'}`,
        `📮 *Postal:* ${data.postal || 'Unknown'}`,
        `🏢 *ISP/Org:* ${data.org || 'Unknown'}`,
        `⏰ *Timezone:* ${data.timezone || 'Unknown'}`,
        `📍 *Coords:* ${data.latitude}, ${data.longitude}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━',
      ];
      await sock.sendMessage(from, { text: lines.join('\n') }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ IP lookup error: ${err.message}` }, { quoted: msg });
    }
  },
};
