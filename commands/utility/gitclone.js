const fetch = require('node-fetch');
module.exports = {
  name:'gitclone', aliases:['github','ghclone'], category:'utility',
  desc:'Get a zip download link for any public GitHub repository', usage:'.gitclone [owner/repo]', public:true,
  async execute({ sock, msg, from, args }) {
    const repo = args[0];
    if (!repo || !repo.includes('/')) return sock.sendMessage(from, { text: 'Usage: .gitclone [owner/repo]\nExample: .gitclone mr-ntando-dev/apex-md' }, { quoted: msg });
    const [owner, repoName] = repo.replace('https://github.com/','').split('/');
    try {
      const res  = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
      const data = await res.json();
      if (data.message === 'Not Found') return sock.sendMessage(from, { text: '⚠️ Repository not found. Check the owner/repo name.' }, { quoted: msg });
      const zipUrl = `https://github.com/${owner}/${repoName}/archive/refs/heads/${data.default_branch}.zip`;
      const lines  = [
        `📦 *GitHub Repo: ${data.full_name}*`, '━━━━━━━━━━━━━━━━━━━━━━━━',
        `📝 *Description:* ${data.description || 'No description'}`,
        `⭐ *Stars:* ${data.stargazers_count?.toLocaleString()}`,
        `🍴 *Forks:* ${data.forks_count?.toLocaleString()}`,
        `🌿 *Branch:* ${data.default_branch}`,
        `📅 *Last updated:* ${new Date(data.updated_at).toLocaleDateString()}`,
        ``, `🔗 *Clone URL:*\nhttps://github.com/${owner}/${repoName}.git`,
        `📥 *Download ZIP:*\n${zipUrl}`,
        '━━━━━━━━━━━━━━━━━━━━━━━━',
      ];
      await sock.sendMessage(from, { text: lines.join('\n') }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(from, { text: `❌ GitHub error: ${err.message}` }, { quoted: msg });
    }
  },
};
