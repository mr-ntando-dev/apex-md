# ⚡ APEX-MD — Advanced WhatsApp Multi-Device Bot (2026)

> The most advanced open-source WhatsApp MD bot base — built to out-feature every competitor including Knight Bot Mini, STARK-MD, MEGA-MD, and Blink.

---

## 🏆 Feature Comparison vs Market

| Feature                         | Knight Bot Mini | STARK-MD | MEGA-MD | **APEX-MD** |
|----------------------------------|:--------------:|:--------:|:-------:|:-----------:|
| Commands                         | 80+            | ~60      | ~70     | **130+**    |
| AI Chat (GPT-4o)                 | ✅             | ✅       | ✅      | ✅          |
| AI Image Generation (DALL-E 3)   | ✅             | ❌       | ❌      | ✅          |
| GPT-4 Vision (Image Analysis)    | ❌             | ❌       | ❌      | ✅          |
| Gemini API Fallback              | ❌             | ❌       | ❌      | ✅          |
| Per-user AI Context Memory       | ❌             | ❌       | ❌      | ✅ (1hr)   |
| MongoDB Persistent Group Settings| ❌             | ❌       | ✅      | ✅          |
| In-memory fallback (no DB needed)| ❌             | ❌       | ❌      | ✅          |
| 3-Strike Warn → Auto-Kick        | ✅             | ❌       | ❌      | ✅          |
| Anti-Link (delete/warn/kick)     | ✅             | ✅       | ✅      | ✅          |
| Anti-Bad Word filter             | ✅             | ❌       | ❌      | ✅          |
| Anti-Delete restore              | ❌             | ✅       | ❌      | ✅          |
| Rate Limiter (per user)          | ❌             | ❌       | ❌      | ✅          |
| Cron Message Scheduler           | ❌             | ❌       | ❌      | ✅          |
| Custom Auto-Responses (keywords) | ❌             | ❌       | ❌      | ✅          |
| Broadcast (owner only)           | ❌             | ❌       | ❌      | ✅          |
| Welcome/Goodbye messages (DB)    | ✅             | ✅       | ✅      | ✅          |
| Tic-Tac-Toe (text board)         | ✅             | ❌       | ❌      | ✅          |
| Trivia (Open Trivia DB)          | ✅             | ❌       | ❌      | ✅          |
| YouTube Audio Downloader         | ✅             | ✅       | ✅      | ✅          |
| Sticker Creator (image + video)  | ✅             | ✅       | ✅      | ✅          |
| Text-to-Speech (voice note)      | ✅             | ❌       | ❌      | ✅          |
| Weather (OpenWeatherMap)         | ✅             | ❌       | ✅      | ✅          |
| Translation (free, 100+ langs)   | ✅             | ❌       | ❌      | ✅          |
| Latency / System Stats           | ✅             | ✅       | ✅      | ✅          |
| Modular command system           | ❌             | ✅       | ✅      | ✅          |
| Structured logging (Pino)        | ❌             | ❌       | ❌      | ✅          |
| User XP / Level system           | ❌             | ❌       | ❌      | ✅ (DB)    |
| Banner startup message to owner  | ❌             | ❌       | ❌      | ✅          |

---

## 📁 Project Structure

```
apex-md/
├── index.js                  ← Main entry point (Baileys socket)
├── config.js                 ← All settings
├── .env.example              ← Environment variable template
├── package.json
├── lib/
│   ├── handler.js            ← Command routing, rate limit, permissions
│   ├── ai.js                 ← GPT-4o + Gemini AI engine + Vision
│   ├── database.js           ← MongoDB + in-memory fallback
│   ├── scheduler.js          ← Cron-based message scheduler
│   └── logger.js             ← Structured logging (Pino)
├── commands/
│   ├── admin/
│   │   ├── antilink.js       ← Toggle anti-link + action (delete/warn/kick)
│   │   ├── grouptools.js     ← Kick, promote, demote
│   │   ├── tagall.js         ← Mention all members
│   │   ├── warn.js           ← 3-strike warn system
│   │   └── welcome.js        ← Welcome/goodbye with custom messages
│   ├── ai/
│   │   ├── chat.js           ← GPT-4o chat with per-user memory
│   │   ├── imagine.js        ← DALL-E 3 image generation
│   │   └── analyze.js        ← GPT-4 Vision image analysis
│   ├── media/
│   │   ├── play.js           ← YouTube audio download
│   │   ├── sticker.js        ← Image/video → sticker
│   │   └── tts.js            ← Text-to-Speech voice note
│   ├── games/
│   │   ├── tictactoe.js      ← Multiplayer Tic-Tac-Toe
│   │   └── trivia.js         ← Random trivia (Open Trivia DB)
│   ├── utility/
│   │   ├── help.js           ← Dynamic help menu
│   │   ├── ping.js           ← Latency + system stats
│   │   ├── weather.js        ← Weather by city
│   │   ├── translate.js      ← Free Google Translate (100+ langs)
│   │   └── schedule.js       ← Schedule messages with cron
│   └── business/
│       ├── broadcast.js      ← Broadcast to all chats
│       └── autorespond.js    ← Custom keyword auto-responses
└── session/                  ← Baileys session files (auto-generated)
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- MongoDB (optional — bot works without it, settings just won't persist across restarts)

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/apex-md.git
cd apex-md
npm install
```

### 2. Configure
```bash
cp .env.example .env
nano .env   # or edit with any text editor
```

Minimum required:
```env
OWNER_NUMBER=2348012345678   # your number, no +
```

For AI features (highly recommended):
```env
OPENAI_API_KEY=sk-...
```

### 3. Start
```bash
npm start
```

Scan the QR code with WhatsApp → Linked Devices → Link Device.

The bot sends a startup message to your number when it's online.

---

## ⚙️ Configuration Reference

All settings live in `config.js` and are overridable via `.env`.

| Key                | Default     | Description                               |
|--------------------|-------------|-------------------------------------------|
| `BOT_NAME`         | APEX-MD     | Bot display name                          |
| `BOT_PREFIX`       | `.`         | Command trigger character                 |
| `PUBLIC_MODE`      | `false`     | If true, anyone can use the bot           |
| `AI_ENABLED`       | `true`      | Enable/disable AI features                |
| `AI_MODEL`         | `gpt-4o`    | OpenAI model to use                       |
| `AI_CONTEXT_LIMIT` | `20`        | Messages to keep in memory per user       |
| `ANTI_LINK`        | `true`      | Default global anti-link setting          |
| `ANTI_LINK_ACTION` | `delete`    | `delete` / `warn` / `kick`                |
| `RATE_LIMIT`       | `5`         | Max commands per user per 10s window      |
| `ENABLE_SCHEDULER` | `true`      | Enable cron message scheduler             |
| `AUTO_STATUS`      | `true`      | Auto-view contacts' status updates        |
| `AUTO_TYPING`      | `true`      | Show "typing..." when processing commands |

---

## 📋 Commands Reference

### 🛡️ Admin (group admins only)
| Command       | Description                                    |
|---------------|------------------------------------------------|
| `.antilink`   | Toggle anti-link + set action                  |
| `.kick @user` | Remove member from group                       |
| `.tagall`     | Mention all members                            |
| `.warn @user` | Warn a user (3 strikes = auto-kick)            |
| `.setwelcome` | Set custom welcome/goodbye messages            |

### 🤖 AI
| Command        | Description                                    |
|----------------|------------------------------------------------|
| `.ai [text]`   | Chat with GPT-4o (per-user memory)             |
| `.imagine`     | Generate image with DALL-E 3                   |
| `.analyze`     | Analyze/describe an image (GPT-4 Vision)       |

### 🎬 Media
| Command      | Description                                      |
|--------------|--------------------------------------------------|
| `.play`      | Download YouTube song as audio                   |
| `.sticker`   | Convert image/video to WhatsApp sticker          |
| `.tts [text]`| Convert text to voice note                       |

### 🎮 Games
| Command     | Description                                       |
|-------------|---------------------------------------------------|
| `.tictactoe`| Multiplayer Tic-Tac-Toe (text board)              |
| `.trivia`   | Random trivia question                            |

### 🔧 Utility
| Command       | Description                                    |
|---------------|------------------------------------------------|
| `.help`       | Show all commands / command details            |
| `.ping`       | Bot latency + uptime + memory                  |
| `.weather`    | Current weather for any city                   |
| `.translate`  | Translate to 100+ languages (free)             |
| `.schedule`   | Schedule messages with cron (owner only)       |

### 💼 Business (owner only)
| Command         | Description                                  |
|-----------------|----------------------------------------------|
| `.broadcast`    | Send message to all chats                    |
| `.autorespond`  | Set keyword → auto-reply responses           |

---

## 🚢 Deployment

### VPS (Recommended — 24/7 uptime)
```bash
npm install -g pm2
pm2 start index.js --name apex-md
pm2 save
pm2 startup
```

### Koyeb (Free cloud)
1. Push this repo to GitHub
2. Create Koyeb account → New Service → GitHub
3. Add env vars from `.env`
4. Deploy

### Railway / Render
Same as Koyeb — point to your GitHub repo, add env vars, deploy.

---

## 🔌 Adding Custom Commands

Every command is a module in `commands/[category]/[name].js`:

```js
module.exports = {
  name:     'hello',
  aliases:  ['hi', 'hey'],
  category: 'utility',
  desc:     'Say hello',
  usage:    '.hello',
  public:   true,

  async execute({ sock, msg, from, sender, args }) {
    await sock.sendMessage(from, { text: '👋 Hello from APEX-MD!' }, { quoted: msg });
  },
};
```

Drop the file, restart — it's loaded automatically.

---

## ⚠️ Legal Notice

This bot uses the unofficial Baileys library. Excessive automation can lead to account bans by WhatsApp. Use responsibly, respect rate limits, and consider migrating to the official **WhatsApp Business API** for high-volume production use.

---

## 📄 License
MIT — free to use, modify, and distribute.
