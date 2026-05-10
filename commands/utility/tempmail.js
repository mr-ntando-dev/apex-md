const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const mailCache = new NodeCache({ stdTTL: 600 });
module.exports = {
  name:'tempmail', aliases:['fakemail','disposablemail','tm'], category:'utility',
  desc:'Generate a temporary email address and check its inbox', usage:'.tempmail new | .tempmail inbox', public:true,
  async execute({ sock, msg, from, sender, args }) {
    const action = args[0]?.toLowerCase() || 'new';
    try {
      if (action === 'new') {
        const res  = await fetch('https://api.guerrillamail.com/ajax.php?f=get_email_address');
        const data = await res.json();
        const email = data.email_addr;
        const token = data.sid_token;
        mailCache.set('mail:'+sender, { email, token });
        await sock.sendMessage(from, { text: `📧 *Temporary Email Created!*\n━━━━━━━━━━━━━━━━━━━━━━━━\n📬 *Email:* ${email}\n⏰ *Expires in:* 10 minutes\n━━━━━━━━━━━━━━━━━━━━━━━━\nType *.tempmail inbox* to check for messages.` }, { quoted: msg });
      } else if (action === 'inbox') {
        const cached = mailCache.get('mail:'+sender);
        if (!cached) return sock.sendMessage(from, { text: '⚠️ No active temp mail. Type .tempmail new first.' }, { quoted: msg });
        const res  = await fetch(`https://api.guerrillamail.com/ajax.php?f=check_email&seq=0&sid_token=${cached.token}`);
        const data = await res.json();
        const emails = data.list;
        if (!emails?.length) return sock.sendMessage(from, { text: `📭 *Inbox empty*\n📬 Email: ${cached.email}\n\nWaiting for messages...` }, { quoted: msg });
        const preview = emails.slice(0, 5).map((e, i) => `${i+1}. 📨 *From:* ${e.mail_from}\n   *Subject:* ${e.mail_subject}\n   *Time:* ${new Date(e.mail_timestamp*1000).toLocaleString()}`).join('\n\n');
        await sock.sendMessage(from, { text: `📬 *Inbox: ${cached.email}*\n━━━━━━━━━━━━━━━━━━━━━━━━\n${preview}` }, { quoted: msg });
      } else {
        await sock.sendMessage(from, { text: 'Usage:\n.tempmail new — create temp email\n.tempmail inbox — check messages' }, { quoted: msg });
      }
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ TempMail error: ${err.message}` }, { quoted: msg });
    }
  },
};
