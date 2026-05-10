<div align="center">

# ⚡ APEX-MD

**Advanced WhatsApp Multi-Device Bot — 2026 Edition**

[![Version](https://img.shields.io/badge/version-2.0.0-gold?style=for-the-badge)](.)
[![Node](https://img.shields.io/badge/node-18+-brightgreen?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](.)
[![Commands](https://img.shields.io/badge/commands-160+-orange?style=for-the-badge)](.)
[![AI](https://img.shields.io/badge/AI-Triple_Engine-purple?style=for-the-badge)](.)

Built on [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys) with a triple AI engine,
Guardian AI group protection, ElevenLabs voice notes, live web search, self-destruct messages, economy system, 6 social downloaders, and 160+ commands across 8 categories.

</div>

---

## 🌍 The WhatsApp Bot Ecosystem

There are genuinely great bots in this space — each built by talented developers:

| Bot | Strengths | Repo |
|-----|-----------|------|
| **Queen Elisa MD** | Pioneered the MD era, great UX, strong community | Community-maintained |
| **Knight Bot Mini** | Excellent UI, solid admin tools, active updates | Multiple forks |
| **STARK-MD** | Clean codebase, modular, easy to fork | Multiple forks |
| **MEGA-MD** | Good MongoDB integration, reliable | Multiple forks |
| **XstroMD** | Fast, minimal footprint | Community-maintained |
| **APEX-MD** | Triple AI engine, Guardian AI, voice notes, live search | **This repo** |

Every bot above is worth knowing. APEX-MD's focus is AI depth, group safety, and a complete command catalog. Use whatever fits your needs.

---

## ✨ What's New in v2.0.0

### 🤖 Triple AI Engine — Auto-Routing
Run up to three AI backends simultaneously. APEX-MD picks the best available and auto-retries on failure:
- **Claude 3.5 Sonnet** (Anthropic) — conversational quality priority
- **GPT-4o** (OpenAI) — DALL-E 3, Vision, code
- **Gemini 2.0 Flash** (Google) — fastest, free tier available

Add any one key and it works. Add all three for zero-downtime failover.

### 🛡️ Guardian AI
AI-powered group protection running silently in the background:
- **Scam detection** — heuristic fast-check + AI threat scoring (0-10)
- **Raid detection** — 5+ joins in 30 seconds triggers auto-lock + admin alert
- **Impersonation alerts** — detects users faking admin/owner identities
- Auto-kick on threat score ≥ 9 (configurable)

### 🆕 New Commands in v2.0.0
| Command | Category | Description |
|---------|----------|-------------|
| `.voice [text]` | AI | AI voice note via ElevenLabs (29 languages) |
| `.search [query]` | AI | Live web search via Perplexity Sonar Pro |
| `.debate [topic]` | AI | AI argues both sides + verdict |
| `.roast [@user]` | AI | Clever AI roast |
| `.burn [sec] [msg]` | Fun | Self-destructing message (5s–300s) |
| `.horoscope [sign]` | Fun | AI daily horoscope (all 12 signs) |
| `.remind [time] [msg]` | Utility | Smart reminders (30s / 5m / 2h / 1d) |

---

## 📋 Full Command Reference

All 160+ commands, organized by category. Every category gets equal weight — nothing is buried.

---

### 🤖 AI Commands

| Command | Description |
|---------|-------------|
| `.ai [text]` | Chat with AI — auto-routes to best engine, per-user memory (30 msg, 1hr) |
| `.imagine [prompt]` | Generate image — DALL-E 3 with Stable Diffusion XL fallback |
| `.analyze` | Analyze an image — reply to any image (GPT-4o Vision or Gemini Vision) |
| `.voice [text]` | AI voice note via ElevenLabs multilingual v2 — sends as WhatsApp ptt |
| `.search [query]` | Live web search via Perplexity Sonar Pro — real-time answers |
| `.debate [topic]` | AI argues FOR and AGAINST any topic, delivers a verdict |
| `.roast [@user/name]` | Clever AI roast — sharp but not hateful |
| `.code [task]` | Generate working code in any language |
| `.story [prompt]` | Generate a short story |
| `.summarize` | Summarize a long message — reply to any text |
| `.translate [lang] [text]` | AI-powered translation (100+ languages) |
| `.character [name]` | Chat with a famous character or custom persona |
| `.lyrics [song]` | Find song lyrics |
| `.clearchat` | Clear your personal AI conversation memory |

---

### 🛡️ Admin Commands
*Requires group admin role*

| Command | Description |
|---------|-------------|
| `.antilink` | Toggle anti-link protection — set action to delete / warn / kick |
| `.antispam` | Toggle anti-spam protection |
| `.antidelete` | Restore deleted messages in group log |
| `.warn @user` | Warn a user — 3 strikes triggers auto-kick |
| `.warnings @user` | Check a user's current warning count |
| `.resetwarn @user` | Reset a user's warnings |
| `.kick @user` | Remove a member from the group |
| `.promote @user` | Promote member to admin |
| `.demote @user` | Demote admin to member |
| `.tagall` | Mention all group members |
| `.mute` | Lock group — only admins can send messages |
| `.unmute` | Unlock group |
| `.setwelcome` | Set custom welcome and goodbye messages |
| `.setname [name]` | Change group name |
| `.setdesc [description]` | Change group description |
| `.revoke` | Reset group invite link |
| `.linkgroup` | Get current group invite link |
| `.poll [question]` | Create a poll with options |
| `.groupinfo` | Show group info, member count, and settings |
| `.filter [word]` | Add or remove a word from the bad-word filter |

---

### 💥 Fun Commands

| Command | Description |
|---------|-------------|
| `.burn [sec] [msg]` | Self-destructing message — deletes itself after countdown (5s–300s) |
| `.horoscope [sign]` | AI daily horoscope — all 12 signs |
| `.8ball [question]` | Magic 8-ball answer |
| `.joke` | Random joke |
| `.fact` | Random fun fact |
| `.meme` | Random meme image |
| `.quote` | Inspirational quote |
| `.truth` | Random truth question |
| `.ship @user1 @user2` | Compatibility percentage |
| `.choose [a/b/c]` | Bot picks one option for you |
| `.roll [N]` | Roll an N-sided dice |
| `.hangman` | Play Hangman |

---

### 🎮 Games & Economy

| Command | Description |
|---------|-------------|
| `.profile` | View your XP, level, and coin balance |
| `.daily` | Claim your daily coin reward |
| `.work` | Earn coins — random job payout |
| `.pay @user [amount]` | Send coins to another user |
| `.rob @user` | Attempt to rob someone (40% success rate) |
| `.slots [amount]` | Play the slot machine |
| `.flip [amount]` | Coin flip for coins |
| `.leaderboard` | Top 10 richest users in the server |
| `.quiz` | Daily quiz question for XP bonus |
| `.tictactoe @user` | Challenge someone to Tic-Tac-Toe |
| `.trivia` | Random trivia question (Open Trivia DB) |

---

### 📥 Downloader Commands

| Command | Description |
|---------|-------------|
| `.play [song name]` | Download YouTube audio — sends as audio file |
| `.ytmp4 [url]` | Download YouTube video |
| `.tiktok [url]` | Download TikTok video without watermark |
| `.instagram [url]` | Download Instagram video or reel |
| `.facebook [url]` | Download Facebook video |
| `.twitter [url]` | Download Twitter/X video |
| `.spotify [song]` | Spotify track info and 30s preview |

---

### 🎬 Media Commands

| Command | Description |
|---------|-------------|
| `.sticker` | Convert image or video to WhatsApp sticker — reply to media |
| `.toimg` | Convert sticker back to image |
| `.toaudio` | Extract audio from a video |
| `.tts [text]` | Text-to-speech voice note (standard) |
| `.viewonce` | Re-send a view-once message so it can be saved |

---

### 🔧 Utility Commands

| Command | Description |
|---------|-------------|
| `.remind [time] [msg]` | Set a reminder — 30s, 5m, 2h, 1d — bot pings you when due |
| `.help [command]` | Show all commands or details for a specific command |
| `.ping` | Bot latency, uptime, and memory usage |
| `.weather [city]` | Current weather for any city |
| `.translate [lang] [text]` | Translate text to any of 100+ languages |
| `.define [word]` | Dictionary definition |
| `.currency [amount] [FROM] [TO]` | Currency conversion |
| `.calc [expression]` | Calculator — supports complex expressions |
| `.qr [text/url]` | Generate a QR code |
| `.screenshot [url]` | Screenshot any website |
| `.time [city]` | Current time in any city |
| `.news [topic]` | Latest news headlines |
| `.schedule [cron] [msg]` | Schedule recurring messages (owner only) |

---

### 💼 Business Commands
*Owner only*

| Command | Description |
|---------|-------------|
| `.broadcast [message]` | Send a message to all chats the bot is in |
| `.autorespond [keyword] [reply]` | Set a keyword that triggers an automatic reply |

---

### 👑 Owner Commands

| Command | Description |
|---------|-------------|
| `.ban @user` | Ban a user from using the bot |
| `.unban @user` | Remove a ban |
| `.mode [public/private]` | Switch between public and private mode |
| `.setprefix [character]` | Change the command prefix |
| `.send [jid] [message]` | Send a message to any chat ID |
| `.restart` | Restart the bot process |

---

## 📁 Project Structure

```
apex-md/
├── index.js                  ← Main entry point (Baileys socket + event loop)
├── config.js                 ← All settings — override any value via .env
├── .env.example              ← Environment variable template with setup links
├── package.json
│
├── lib/
│   ├── handler.js            ← Command router, rate limiter, permissions
│   ├── ai.js                 ← Triple AI engine (GPT-4o + Claude + Gemini)
│   ├── guardian.js           ← Guardian AI (scam / raid / impersonation)
│   ├── database.js           ← MongoDB + in-memory fallback
│   ├── economy.js            ← XP / coins / level system
│   ├── scheduler.js          ← Cron-based message scheduler
│   └── logger.js             ← Structured logging (Pino)
│
└── commands/
    ├── ai/          ← chat, imagine, analyze, voice, search, debate, roast, code...
    ├── admin/       ← antilink, antispam, antidelete, warn, kick, promote, poll...
    ├── fun/         ← burn, horoscope, 8ball, joke, meme, hangman, ship...
    ├── games/       ← profile, daily, work, slots, flip, tictactoe, trivia, quiz...
    ├── downloader/  ← youtube, ytmp4, tiktok, instagram, facebook, twitter, spotify
    ├── media/       ← sticker, toimg, toaudio, tts, viewonce
    ├── utility/     ← remind, help, ping, weather, translate, calc, qr, news...
    ├── business/    ← broadcast, autorespond
    └── owner/       ← ban, unban, mode, setprefix, send, restart
```

---

## ⚙️ Configuration Reference

All settings live in `config.js` and can be overridden via `.env`.

| Key | Default | Description |
|-----|---------|-------------|
| `BOT_NAME` | `APEX-MD` | Bot display name |
| `BOT_VERSION` | `2.0.0` | Current version |
| `BOT_PREFIX` | `.` | Command trigger character |
| `OWNER_NUMBER` | *(required)* | Your WhatsApp number, no `+` |
| `PUBLIC_MODE` | `false` | `true` = anyone can use the bot |
| `AI_ROUTER` | `auto` | `auto` / `openai` / `claude` / `gemini` |
| `AI_CONTEXT_LIMIT` | `30` | Messages kept in memory per user session |
| `GUARDIAN_ENABLED` | `true` | AI scam / raid / impersonation protection |
| `GUARDIAN_SCAM_KICK` | `true` | Auto-kick at threat score ≥ 9 |
| `GUARDIAN_RAID_MUTE` | `true` | Auto-lock group during detected raid |
| `BURN_ENABLED` | `true` | Self-destruct messages |
| `BURN_MAX_SECONDS` | `300` | Maximum burn countdown (5 min) |
| `RATE_LIMIT` | `5` | Max commands per user per 10-second window |
| `ANTI_LINK` | `true` | Default global anti-link state |
| `AUTO_STATUS` | `true` | Auto-view contacts' status updates |
| `AUTO_TYPING` | `true` | Show "typing…" indicator while processing |
| `LOG_LEVEL` | `info` | `debug` / `info` / `warn` / `error` |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git
- At least one AI API key (OpenAI, Claude, or Gemini — any one works)
- MongoDB optional — bot works without it, settings just won't persist across restarts

### 1. Clone & Install

```bash
git clone https://github.com/mr-ntando-dev/apex-md.git
cd apex-md
npm install
```

### 2. Configure

```bash
cp .env.example .env
nano .env
```

Minimum required:

```env
OWNER_NUMBER=2348012345678
```

Add at least one AI key:

```env
OPENAI_API_KEY=sk-...           # platform.openai.com/api-keys
CLAUDE_API_KEY=sk-ant-...       # console.anthropic.com
GEMINI_API_KEY=AIza...          # aistudio.google.com/app/apikey (free tier)
```

Optional extras:

```env
ELEVENLABS_API_KEY=...          # elevenlabs.io — enables .voice command
PERPLEXITY_API_KEY=pplx-...     # perplexity.ai/settings/api — enables .search
STABILITY_API_KEY=...           # stability.ai — DALL-E 3 image fallback
MONGODB_URI=mongodb+srv://...   # cloud.mongodb.com — persistent group settings
WEATHER_API_KEY=...             # openweathermap.org
NEWS_API_KEY=...                # newsapi.org
```

### 3. Start

```bash
npm start
```

Scan the QR code with WhatsApp → Linked Devices → Link Device.

---

## 🚢 Deployment

### VPS (recommended for 24/7 uptime)

```bash
npm install -g pm2
pm2 start index.js --name apex-md
pm2 save && pm2 startup
```

### Koyeb / Railway / Render (free cloud hosting)

1. Push this repo to your GitHub
2. Create a new service pointing to your repo
3. Add env vars from `.env`
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
CMD ["node", "index.js"]
```

---

## 🔌 Adding Custom Commands

Drop a file in `commands/[category]/[name].js`:

```js
module.exports = {
  name:     'hello',
  aliases:  ['hi', 'hey'],
  category: 'utility',
  desc:     'Say hello',
  usage:    '.hello',
  public:   true,

  async execute({ sock, msg, from, sender, args }) {
    await sock.sendMessage(from, {
      text: '👋 Hello from APEX-MD!'
    }, { quoted: msg });
  },
};
```

Restart the bot — the command is loaded automatically. No registration step needed.

---

## ⚠️ Legal Notice

This project uses the unofficial [Baileys](https://github.com/WhiskeySockets/Baileys) library.
Excessive automation may violate WhatsApp's Terms of Service and lead to account bans.
Use responsibly. For production or high-volume deployments, consider the official
[WhatsApp Business API](https://business.whatsapp.com/products/business-platform).

---

## 📄 License

MIT — free to use, modify, and distribute.
