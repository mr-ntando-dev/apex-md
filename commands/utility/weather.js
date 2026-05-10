// ── Weather ───────────────────────────────────────────────────
const fetch  = require('node-fetch');
const config = require('../../config');

module.exports = {
  name:    'weather',
  aliases: ['forecast', 'temp'],
  category: 'utility',
  desc:    'Get current weather for any city',
  usage:   '.weather [city]',
  public:  true,

  async execute({ sock, msg, from, args }) {
    const city = args.join(' ');
    if (!city) return sock.sendMessage(from, { text: '🌤️ Example: .weather Lagos' }, { quoted: msg });
    if (!config.WEATHER_API_KEY) return sock.sendMessage(from, { text: '⚠️ Set WEATHER_API_KEY in .env (get one free at openweathermap.org)' }, { quoted: msg });

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${config.WEATHER_API_KEY}&units=metric`;
      const res = await fetch(url);
      const d   = await res.json();

      if (d.cod !== 200) return sock.sendMessage(from, { text: `❌ City not found: ${city}` }, { quoted: msg });

      const emo = { Clear:'☀️', Clouds:'☁️', Rain:'🌧️', Drizzle:'🌦️', Thunderstorm:'⛈️', Snow:'❄️', Mist:'🌫️' };
      const icon = emo[d.weather[0].main] || '🌡️';

      return sock.sendMessage(from, {
        text: `${icon} *Weather in ${d.name}, ${d.sys.country}*\n${config.DIVIDER}\n🌡️ Temp: *${d.main.temp}°C* (feels ${d.main.feels_like}°C)\n💧 Humidity: *${d.main.humidity}%*\n🌬️ Wind: *${d.wind.speed} m/s*\n🌥️ Condition: *${d.weather[0].description}*`,
      }, { quoted: msg });
    } catch (err) {
      return sock.sendMessage(from, { text: `❌ Weather fetch failed: ${err.message}` }, { quoted: msg });
    }
  },
};
