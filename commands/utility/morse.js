const MORSE = {'a':'.-','b':'-...','c':'-.-.','d':'-..','e':'.','f':'..-.','g':'--.','h':'....','i':'..','j':'.---','k':'-.-','l':'.-..','m':'--','n':'-.','o':'---','p':'.--.','q':'--.-','r':'.-.','s':'...','t':'-','u':'..-','v':'...-','w':'.--','x':'-..-','y':'-.--','z':'--..',  '0':'-----','1':'.----','2':'..---','3':'...--','4':'....-','5':'.....','6':'-....','7':'--...','8':'---..','9':'----.',' ':'/'};
const REV   = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));
module.exports = {
  name:'morse', aliases:['morsecode'], category:'utility',
  desc:'Encode or decode Morse code', usage:'.morse encode [text] or .morse decode [... --- ...]', public:true,
  async execute({ sock, msg, from, args }) {
    const mode = args[0]?.toLowerCase();
    const input = args.slice(1).join(' ');
    if (!mode || !input) return sock.sendMessage(from, { text: 'Usage:\n.morse encode [text]\n.morse decode [morse code]' }, { quoted: msg });
    if (mode === 'encode') {
      const result = input.toLowerCase().split('').map(c => MORSE[c] || '?').join(' ');
      await sock.sendMessage(from, { text: `📡 *Morse Encoded:*\n\`${result}\`` }, { quoted: msg });
    } else if (mode === 'decode') {
      const result = input.split(' ').map(c => REV[c] || '?').join('');
      await sock.sendMessage(from, { text: `📡 *Morse Decoded:*\n${result.toUpperCase()}` }, { quoted: msg });
    } else {
      await sock.sendMessage(from, { text: 'Mode must be "encode" or "decode".' }, { quoted: msg });
    }
  },
};
