// ── i18n — Multi-language UI support ─────────────────────────
// Languages: EN, PT, ES, FR, SW (Swahili), ZU (Zulu), HA (Hausa)

const STRINGS = {
  en: {
    botOnline:     '⚡ *{name} is Online!*\nPrefix: {prefix} | Mode: {mode}\n\nType {prefix}help to see all commands.',
    helpTitle:     '⚡ *{name} — Command Menu*',
    pingMsg:       '⚡ *Pong!*\n🏓 Latency: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Memory: {memory}MB',
    unknownCmd:    '❓ Unknown command. Type {prefix}help for the full list.',
    noPermission:  '🚫 You don\'t have permission to use this command.',
    groupOnly:     '👥 This command only works in groups.',
    ownerOnly:     '👑 This command is for the bot owner only.',
    rateLimited:   '⏱️ Slow down! You\'re sending commands too fast.',
    aiUnavailable: '🤖 AI is currently unavailable. Try again shortly.',
    banned:        '⛔ You are banned from using this bot.',
  },
  pt: {
    botOnline:     '⚡ *{name} está Online!*\nPrefixo: {prefix} | Modo: {mode}\n\nDigite {prefix}help para ver os comandos.',
    helpTitle:     '⚡ *{name} — Menu de Comandos*',
    pingMsg:       '⚡ *Pong!*\n🏓 Latência: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Memória: {memory}MB',
    unknownCmd:    '❓ Comando desconhecido. Digite {prefix}help para a lista completa.',
    noPermission:  '🚫 Você não tem permissão para usar este comando.',
    groupOnly:     '👥 Este comando só funciona em grupos.',
    ownerOnly:     '👑 Este comando é apenas para o dono do bot.',
    rateLimited:   '⏱️ Devagar! Você está enviando comandos muito rápido.',
    aiUnavailable: '🤖 IA indisponível no momento. Tente novamente.',
    banned:        '⛔ Você está banido de usar este bot.',
  },
  es: {
    botOnline:     '⚡ *¡{name} está en línea!*\nPrefijo: {prefix} | Modo: {mode}\n\nEscribe {prefix}help para ver los comandos.',
    helpTitle:     '⚡ *{name} — Menú de Comandos*',
    pingMsg:       '⚡ *¡Pong!*\n🏓 Latencia: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Memoria: {memory}MB',
    unknownCmd:    '❓ Comando desconocido. Escribe {prefix}help para la lista completa.',
    noPermission:  '🚫 No tienes permiso para usar este comando.',
    groupOnly:     '👥 Este comando solo funciona en grupos.',
    ownerOnly:     '👑 Este comando es solo para el dueño del bot.',
    rateLimited:   '⏱️ ¡Más despacio! Estás enviando comandos muy rápido.',
    aiUnavailable: '🤖 IA no disponible en este momento. Inténtalo de nuevo.',
    banned:        '⛔ Estás baneado de usar este bot.',
  },
  fr: {
    botOnline:     '⚡ *{name} est en ligne !*\nPréfixe : {prefix} | Mode : {mode}\n\nTapez {prefix}help pour voir les commandes.',
    helpTitle:     '⚡ *{name} — Menu des Commandes*',
    pingMsg:       '⚡ *Pong !*\n🏓 Latence : {latency}ms\n⏱️ Uptime : {uptime}\n💾 Mémoire : {memory}MB',
    unknownCmd:    '❓ Commande inconnue. Tapez {prefix}help pour la liste complète.',
    noPermission:  '🚫 Vous n\'avez pas la permission d\'utiliser cette commande.',
    groupOnly:     '👥 Cette commande ne fonctionne que dans les groupes.',
    ownerOnly:     '👑 Cette commande est réservée au propriétaire du bot.',
    rateLimited:   '⏱️ Doucement ! Vous envoyez des commandes trop vite.',
    aiUnavailable: '🤖 L\'IA est temporairement indisponible. Réessayez.',
    banned:        '⛔ Vous êtes banni d\'utiliser ce bot.',
  },
  sw: {
    botOnline:     '⚡ *{name} iko Mtandaoni!*\nKianzio: {prefix} | Hali: {mode}\n\nAndika {prefix}help kuona amri.',
    helpTitle:     '⚡ *{name} — Orodha ya Amri*',
    pingMsg:       '⚡ *Pong!*\n🏓 Muda: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Kumbukumbu: {memory}MB',
    unknownCmd:    '❓ Amri haijulikani. Andika {prefix}help kwa orodha kamili.',
    noPermission:  '🚫 Huna ruhusa ya kutumia amri hii.',
    groupOnly:     '👥 Amri hii inafanya kazi katika vikundi tu.',
    ownerOnly:     '👑 Amri hii ni kwa mmiliki wa bot peke yake.',
    rateLimited:   '⏱️ Pole pole! Unatuma amri kwa haraka sana.',
    aiUnavailable: '🤖 AI haipo kwa sasa. Jaribu tena baadaye.',
    banned:        '⛔ Umefungiwa kutumia bot hii.',
  },
  zu: {
    botOnline:     '⚡ *{name} ikhona Ku-intanethi!*\nIsikhulu: {prefix} | Indlela: {mode}\n\nBhala {prefix}help ukuze ubone yonke imiyalo.',
    helpTitle:     '⚡ *{name} — Uhla Lwemiyalo*',
    pingMsg:       '⚡ *Pong!*\n🏓 Isikhathi: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Imemori: {memory}MB',
    unknownCmd:    '❓ Umyalo awuziwa. Bhala {prefix}help ukuze ubone uhla olugcwele.',
    noPermission:  '🚫 Awunemvume yokusebenzisa lo myalo.',
    groupOnly:     '👥 Lo myalo usebenza kuphela emaqenjini.',
    ownerOnly:     '👑 Lo myalo ungowomnikazi webhoti kuphela.',
    rateLimited:   '⏱️ Hamba kancane! Uthumela imiyalo ngokushesha kakhulu.',
    aiUnavailable: '🤖 AI ayitholakali manje. Zama futhi maduze.',
    banned:        '⛔ Uvinjelwe ukusebenzisa le bhoti.',
  },
  ha: {
    botOnline:     '⚡ *{name} yana kan layi!*\nKumbugi: {prefix} | Yanayi: {mode}\n\nKuga {prefix}help don duba umarni.',
    helpTitle:     '⚡ *{name} — Jerin Umarni*',
    pingMsg:       '⚡ *Pong!*\n🏓 Latency: {latency}ms\n⏱️ Uptime: {uptime}\n💾 Ƙwaƙwalwa: {memory}MB',
    unknownCmd:    '❓ Ba\'a san wannan umarnin ba. Kuga {prefix}help don cikakken jeri.',
    noPermission:  '🚫 Ba ka da izni don amfani da wannan umarni.',
    groupOnly:     '👥 Wannan umarni yana aiki ne kawai a ƙungiyoyi.',
    ownerOnly:     '👑 Wannan umarni ga mai bot ne kawai.',
    rateLimited:   '⏱️ A hankali! Kana aika umarni da sauri sosai.',
    aiUnavailable: '🤖 AI ba ta samuwa yanzu. Gwada kuma daga baya.',
    banned:        '⛔ An hana ka amfani da wannan bot.',
  },
};

function t(lang, key, vars = {}) {
  const str = STRINGS[lang]?.[key] || STRINGS['en'][key] || key;
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
}

function supportedLangs() {
  return Object.keys(STRINGS);
}

module.exports = { t, supportedLangs, STRINGS };
