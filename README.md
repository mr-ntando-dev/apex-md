<div align="center">

# ⚡ APEX-MD — 2026 Supreme Edition

**Advanced WhatsApp Multi-Device Bot**

[![Version](https://img.shields.io/badge/version-2.1.0-gold?style=for-the-badge)](.)
[![Node](https://img.shields.io/badge/node-18+-brightgreen?style=for-the-badge)](.)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](.)
[![Commands](https://img.shields.io/badge/commands-200+-orange?style=for-the-badge)](.)
[![AI](https://img.shields.io/badge/AI-Triple_Engine-purple?style=for-the-badge)](.)

Built on [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys).  
Triple AI engine · Guardian AI · 26 anime reactions · 12 bot themes · Live plugin store · 10 social downloaders · Audio effects · Logo maker · 7 languages · 200+ commands.

</div>

---

## 🌍 The WhatsApp Bot Ecosystem

There are genuinely great bots in this space. Here's an honest map:

| Bot | What they do well |
|-----|-------------------|
| [**Queen Elisa MD**](https://github.com/WAheedbot/Queen-Elisa-MD-V2) | Pioneered the MD era, strong Sri Lankan community, solid economy system |
| [**Atlas-MD**](https://github.com/FantoX/Atlas-MD) | Live plugin store, 300+ commands with plugins, multi-key AI pool, 20 bot characters |
| [**Silva-MD**](https://github.com/SilvaTechB/silva-md-bot) | Beautiful theming (18+ personalities), excellent deployment guides, one-click hosting |
| [**STARK-MD**](https://github.com/ALI-INXIDE/STARK-MD) | Clean modular codebase, easy to fork and extend |
| [**MEGA-MD**](https://github.com/GlobalTechInfo/MEGA-MD) | Solid MongoDB integration, reliable group management |
| **APEX-MD** | Triple AI with auto-failover, Guardian AI (scam/raid/impersonation), 7-language UI |

Use whatever fits your needs. APEX-MD is built to be complete out of the box without installing extra plugins for core features.

---

## ✨ What's in v2.1.0

| Area | What was added |
|------|----------------|
| 🎭 **Anime Reactions** | 26 types: hug, kiss, slap, pat, bite, cry, bonk, wave, dance, poke, cuddle, blush, wink, laugh, stare, punch, lick, nom, yeet, nuzzle, smug, pout, shrug, facepalm, highfive, confused — all as GIFs via Tenor |
| 🎨 **Bot Themes** | 12 personalities: apex, naruto, gojo, itachi, zerotwo, nezuko, goku, batman, friday, ayanokoji, luffy, makima |
| 🧩 **Live Plugin Store** | `.install [url]` — load new commands without restarting |
| 🛡️ **Protection Suite** | Anti-Call, Anti-Fake, Anti-Demote, Anti-ViewOnce, Anti-@Everyone |
| 📥 **More Downloaders** | Pinterest, SoundCloud, Threads, MediaFire (total: 10 platforms) |
| 🎛️ **Audio Effects** | 8 effects: bass, nightcore, slow, reverse, echo, robot, chipmunk, deep |
| 🎨 **Logo Maker** | 40 styles: glitch, neon, fire, ice, galaxy, gold, chrome and 33 more |
| 🔧 **Utility Gaps** | `.shazam`, `.morse`, `.base64`, `.ip`, `.virus`, `.hidetag`, `.tempmail`, `.gitclone`, `.wikipedia`, `.ascii` |
| 🌍 **Multi-Language UI** | 7 languages: English, Português, Español, Français, Swahili, Zulu, Hausa |
| 🤖 **Triple AI Engine** | GPT-4o + Claude 3.5 Sonnet + Gemini 2.0 Flash (auto-routes, auto-failover) |
| 🛡️ **Guardian AI** | AI-powered scam detection, raid protection, impersonation alerts |

---

## 📋 Full Command Reference

All 200+ commands. Every category gets equal space.

---

### 🎭 Anime Reactions
*All 26 send an animated GIF via Tenor API. Use with @mention or solo.*

| Command | Action |
|---------|--------|
| `.hug [@user]` | Anime hug GIF |
| `.kiss [@user]` | Anime kiss GIF |
| `.slap [@user]` | Anime slap GIF |
| `.pat [@user]` | Head pat GIF |
| `.bite [@user]` | Anime bite GIF |
| `.cry` | Anime cry GIF |
| `.bonk [@user]` | Bonk GIF |
| `.wave [@user]` | Wave GIF |
| `.dance [@user]` | Dance GIF |
| `.poke [@user]` | Poke GIF |
| `.cuddle [@user]` | Cuddle GIF |
| `.blush` | Blush GIF |
| `.wink [@user]` | Wink GIF |
| `.laugh [@user]` | Laugh GIF |
| `.stare [@user]` | Stare GIF |
| `.punch [@user]` | Punch GIF |
| `.lick [@user]` | Lick GIF |
| `.nom [@user]` | Nom GIF |
| `.yeet [@user]` | Yeet GIF |
| `.nuzzle [@user]` | Nuzzle GIF |
| `.smug` | Smug face GIF |
| `.pout [@user]` | Pout GIF |
| `.shrug` | Shrug GIF |
| `.facepalm` | Facepalm GIF |
| `.highfive [@user]` | High five GIF |
| `.confused` | Confused GIF |

---

### 🤖 AI Commands

| Command | Description |
|---------|-------------|
| `.ai [text]` | Chat with AI — auto-routes to best engine (Claude/GPT-4o/Gemini) with per-user memory |
| `.imagine [prompt]` | Generate image — DALL-E 3 HD, falls back to Stable Diffusion XL |
| `.analyze` | Analyze an image — reply to any image (GPT-4o Vision or Gemini Vision) |
| `.voice [text]` | AI voice note via ElevenLabs multilingual v2 (29 languages) |
| `.search [query]` | Live web search via Perplexity Sonar Pro — real-time results |
| `.debate [topic]` | AI argues both sides + delivers a verdict |
| `.roast [@user]` | Clever AI roast |
| `.code [task]` | Generate working code in any language |
| `.story [prompt]` | Generate a short story |
| `.summarize` | Summarize a long message — reply to text |
| `.translate [lang] [text]` | AI translation (100+ languages) |
| `.character [name]` | Chat with a famous character or persona |
| `.lyrics [song]` | Find song lyrics |
| `.clearchat` | Clear your AI conversation memory |

---

### 🛡️ Admin Commands
*Requires group admin role*

| Command | Description |
|---------|-------------|
| `.antilink [on/off]` | Anti-link — set action to delete / warn / kick |
| `.antispam [on/off]` | Anti-spam protection |
| `.antidelete [on/off]` | Restore deleted messages in group log |
| `.warn @user` | Warn user — 3 strikes = auto-kick |
| `.warnings @user` | Check warning count |
| `.resetwarn @user` | Reset warnings |
| `.kick @user` | Remove member |
| `.promote @user` | Promote to admin |
| `.demote @user` | Demote from admin |
| `.tagall [msg]` | Mention all members with a message |
| `.hidetag [msg]` | Silently notify all members (no names shown) |
| `.mute` | Lock group — admins only can send |
| `.unmute` | Unlock group |
| `.setwelcome` | Set custom welcome/goodbye messages |
| `.setname [name]` | Change group name |
| `.setdesc [desc]` | Change group description |
| `.revoke` | Reset group invite link |
| `.linkgroup` | Get group invite link |
| `.poll [question]` | Create a poll |
| `.groupinfo` | Group info + stats |
| `.filter [word]` | Add/remove bad-word filter |

---

### 🛡️ Protection Suite
*Advanced group security — beyond basic antilink*

| Command | Description |
|---------|-------------|
| `.anticall [on/off]` | Auto-reject all incoming calls (owner exempt) |
| `.antifake [on/off]` | Block users with unrecognized country codes |
| `.antidemote [on/off]` | Auto-restore admins that get demoted |
| `.antivv [on/off]` | Auto-forward view-once media so it can be seen |
| `.antigm [on/off]` | Block mass @everyone / @mention spam |

**Guardian AI** (runs automatically, no command needed):
- Scam detection with threat scoring (0–10) + auto-kick at ≥ 9
- Raid detection — 5+ joins in 30s = auto-lock + admin alert
- Impersonation alerts — detects fake owner/admin names

---

### 💥 Fun Commands

| Command | Description |
|---------|-------------|
| `.burn [sec] [msg]` | Self-destructing message — deletes after countdown (5s–300s) |
| `.horoscope [sign]` | AI daily horoscope — all 12 signs |
| `.8ball [question]` | Magic 8-ball |
| `.joke` | Random joke |
| `.fact` | Random fun fact |
| `.meme` | Random meme |
| `.quote` | Inspirational quote |
| `.truth` | Random truth question |
| `.ship @user1 @user2` | Compatibility % |
| `.choose [a/b/c]` | Bot picks for you |
| `.roll [N]` | Roll N-sided dice |
| `.hangman` | Play Hangman |

---

### 🎮 Games & Economy

| Command | Description |
|---------|-------------|
| `.profile` | Your XP, level, and coin balance |
| `.daily` | Claim daily coins |
| `.work` | Earn coins from a job |
| `.pay @user [amount]` | Send coins |
| `.rob @user` | Rob someone (40% success rate) |
| `.slots [amount]` | Slot machine |
| `.flip [amount]` | Coin flip |
| `.leaderboard` | Top 10 richest users |
| `.quiz` | Daily quiz for XP |
| `.tictactoe @user` | Tic-Tac-Toe |
| `.trivia` | Random trivia (Open Trivia DB) |

---

### 📥 Downloaders
*10 platforms total*

| Command | Description |
|---------|-------------|
| `.play [song]` | YouTube audio |
| `.ytmp4 [url]` | YouTube video |
| `.tiktok [url]` | TikTok video (no watermark) |
| `.instagram [url]` | Instagram reel / post |
| `.facebook [url]` | Facebook video |
| `.twitter [url]` | Twitter/X video |
| `.spotify [song]` | Spotify track info + preview |
| `.pinterest [url/search]` | Pinterest image or video |
| `.soundcloud [url]` | SoundCloud audio |
| `.threads [url]` | Threads video or image |
| `.mediafire [url]` | MediaFire direct download link |

---

### 🎬 Media Commands

| Command | Description |
|---------|-------------|
| `.sticker` | Image/video → WhatsApp sticker |
| `.toimg` | Sticker → image |
| `.toaudio` | Video → audio |
| `.tts [text]` | Text-to-speech voice note |
| `.voice [text]` | AI voice note (ElevenLabs, 29 languages) |
| `.viewonce` | Re-send a view-once message |
| `.audioeffect [effect]` | Apply audio effect to any audio/video — bass, nightcore, slow, reverse, echo, robot, chipmunk, deep |
| `.logo [style] [text]` | Create a logo image (40 styles: glitch, neon, fire, ice, galaxy, gold, chrome...) — `.logo styles` to list |

---

### 🔧 Utility Commands

| Command | Description |
|---------|-------------|
| `.remind [time] [msg]` | Smart reminder — 30s, 5m, 2h, 1d |
| `.help [cmd]` | Show all commands or details for one command |
| `.ping` | Latency, uptime, memory |
| `.weather [city]` | Real-time weather |
| `.translate [lang] [text]` | Translate (100+ languages) |
| `.define [word]` | Dictionary definition |
| `.wikipedia [topic]` | Wikipedia summary |
| `.currency [amt] [FROM] [TO]` | Currency conversion |
| `.calc [expression]` | Calculator |
| `.qr [text/url]` | Generate QR code |
| `.screenshot [url]` | Screenshot any website |
| `.time [city]` | Current time in any city |
| `.news [topic]` | Latest news |
| `.shazam` | Identify a song — reply to audio/video |
| `.morse encode/decode [text]` | Morse code encoder/decoder |
| `.base64 encode/decode [text]` | Base64 encoder/decoder |
| `.ip [address]` | IP address lookup (country, ISP, coords) |
| `.virus [url]` | Scan URL for malware/phishing |
| `.tempmail new/inbox` | Generate temporary email + check inbox |
| `.gitclone [owner/repo]` | GitHub repo info + download ZIP |
| `.ascii [font] [text]` | ASCII text art (19 fonts) — `.ascii fonts` to list |
| `.schedule [cron] [msg]` | Schedule recurring messages (owner only) |
| `.setlang [code]` | Set bot language — en, pt, es, fr, sw, zu, ha |

---

### 🎭 Bot Themes

| Command | Description |
|---------|-------------|
| `.settheme [id]` | Change bot personality |
| `.charlist` | List all available themes |

**Available themes:** `apex` · `naruto` · `gojo` · `itachi` · `zerotwo` · `nezuko` · `goku` · `batman` · `friday` · `ayanokoji` · `luffy` · `makima`

---

### 💼 Business (owner only)

| Command | Description |
|---------|-------------|
| `.broadcast [msg]` | Send to all chats |
| `.autorespond [keyword] [reply]` | Set keyword auto-replies |

---

### 👑 Owner Commands

| Command | Description |
|---------|-------------|
| `.ban @user` | Ban from bot |
| `.unban @user` | Unban |
| `.mode [public/private]` | Switch mode |
| `.setprefix [char]` | Change prefix |
| `.send [jid] [msg]` | Send to any chat ID |
| `.restart` | Restart bot |
| `.install [url]` | Install plugin from URL (no restart needed) |
| `.uninstall [name]` | Remove installed plugin |
| `.plugins` | List installed plugins |
| `.settheme [id]` | Change bot personality |

---

## 📁 Project Structure

```
apex-md/
├── index.js                  ← Baileys socket + event loop
├── config.js                 ← All settings (override via .env)
├── .env.example              ← Template with setup links
├── package.json
│
├── lib/
│   ├── handler.js            ← Command router, rate limiter, permissions
│   ├── ai.js                 ← Triple AI engine (GPT-4o + Claude + Gemini)
│   ├── guardian.js           ← Guardian AI (scam / raid / impersonation)
│   ├── pluginLoader.js       ← Live plugin installer (no restart)
│   ├── i18n.js               ← Multi-language support (7 languages)
│   ├── database.js           ← MongoDB + in-memory fallback
│   ├── economy.js            ← XP / coins / level system
│   ├── scheduler.js          ← Cron message scheduler
│   └── logger.js             ← Structured logging (Pino)
│
├── themes/
│   └── index.js              ← 12 bot personality themes
│
├── plugins/                  ← User-installed live plugins (auto-loaded)
│
└── commands/
    ├── anime/       ← 26 reaction GIFs (hug, kiss, slap, pat, bite, cry...)
    ├── ai/          ← chat, imagine, analyze, voice, search, debate, roast, code...
    ├── admin/       ← antilink, antispam, antidelete, warn, kick, promote, hidetag...
    ├── protection/  ← anticall, antifake, antidemote, antivv, antigm
    ├── fun/         ← burn, horoscope, 8ball, joke, meme, hangman, ship...
    ├── games/       ← profile, daily, work, slots, flip, tictactoe, trivia, quiz...
    ├── downloader/  ← youtube, tiktok, instagram, facebook, twitter, spotify, pinterest, soundcloud, threads, mediafire
    ├── media/       ← sticker, toimg, toaudio, tts, viewonce, audioeffects, logo
    ├── utility/     ← remind, help, ping, weather, wikipedia, shazam, morse, base64, ip, virus, tempmail, gitclone, ascii, setlang...
    ├── business/    ← broadcast, autorespond
    └── owner/       ← ban, unban, mode, setprefix, send, restart, install, settheme...
```

---

## ⚙️ Configuration Reference

| Key | Default | Description |
|-----|---------|-------------|
| `BOT_NAME` | `APEX-MD` | Bot display name |
| `BOT_VERSION` | `2.1.0` | Current version |
| `BOT_PREFIX` | `.` | Command trigger |
| `OWNER_NUMBER` | *(required)* | Your number, no `+` |
| `PUBLIC_MODE` | `false` | `true` = anyone can use |
| `AI_ROUTER` | `auto` | `auto` / `openai` / `claude` / `gemini` |
| `AI_CONTEXT_LIMIT` | `30` | Messages kept per user session |
| `DEFAULT_LANG` | `en` | Default language |
| `GUARDIAN_ENABLED` | `true` | AI group protection |
| `GUARDIAN_SCAM_KICK` | `true` | Auto-kick at threat score ≥ 9 |
| `GUARDIAN_RAID_MUTE` | `true` | Auto-lock on raid detection |
| `BURN_ENABLED` | `true` | Self-destruct messages |
| `BURN_MAX_SECONDS` | `300` | Max burn countdown |
| `RATE_LIMIT` | `5` | Max commands per user per 10s |
| `ANTI_LINK` | `true` | Global anti-link default |
| `AUTO_STATUS` | `true` | Auto-view status updates |
| `AUTO_TYPING` | `true` | Show typing indicator |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- At least one AI API key (OpenAI, Claude, or Gemini — pick one)
- MongoDB optional (bot works without it)

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

Minimum:
```env
OWNER_NUMBER=2348012345678
```

AI (at least one):
```env
OPENAI_API_KEY=sk-...            # platform.openai.com
CLAUDE_API_KEY=sk-ant-...        # console.anthropic.com
GEMINI_API_KEY=AIza...           # aistudio.google.com (free)
```

For anime reactions (free):
```env
TENOR_API_KEY=...                # tenor.com/developer
```

### 3. Start

```bash
npm start
```

Scan the QR code: WhatsApp → Linked Devices → Link Device.

---

## 🚢 Deployment

### VPS (recommended)
```bash
npm install -g pm2
pm2 start index.js --name apex-md
pm2 save && pm2 startup
```

### Koyeb / Railway / Render
1. Push repo to GitHub
2. Connect service to your fork
3. Add env vars
4. Deploy

---

## 🔌 Adding Custom Commands

```js
module.exports = {
  name:     'hello',
  aliases:  ['hi'],
  category: 'utility',
  desc:     'Say hello',
  usage:    '.hello',
  public:   true,
  async execute({ sock, msg, from }) {
    await sock.sendMessage(from, { text: '👋 Hello from APEX-MD!' }, { quoted: msg });
  },
};
```

Drop in `commands/[category]/[name].js` — auto-loaded on restart.  
Or use `.install [url]` to load without restarting.

---

## ⚠️ Legal Notice

Uses the unofficial [Baileys](https://github.com/WhiskeySockets/Baileys) library.  
Overuse may violate WhatsApp ToS and cause account bans.  
For production/high-volume use: [WhatsApp Business API](https://business.whatsapp.com/products/business-platform).

---

## 📄 License

MIT — free to use, modify, distribute.
