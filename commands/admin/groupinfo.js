module.exports = {
  name: 'groupinfo', aliases: ['ginfo', 'gc'], category: 'admin',
  desc: 'Show group info and stats', usage: '.groupinfo',
  groupOnly: true, public: true,
  async execute({ sock, msg, from }) {
    const meta    = await sock.groupMetadata(from);
    const admins  = meta.participants.filter(p => p.admin).length;
    const members = meta.participants.length;
    const created = new Date(meta.creation * 1000).toDateString();
    return sock.sendMessage(from, {
      text: `📋 *Group Info*\n━━━━━━━━━━━━━━━\n👥 Name: ${meta.subject}\n📅 Created: ${created}\n👤 Members: ${members}\n🛡️ Admins: ${admins}\n🔗 JID: ${from}\n📝 Desc: ${meta.desc || 'None'}`,
    }, { quoted: msg });
  },
};
