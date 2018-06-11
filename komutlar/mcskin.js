	const Discord = require('discord.js');

exports.run = (client, message, args) => {
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setDescription('Özel mesajlarda komut kullanımı kapatılmıştır.')
  return message.author.sendEmbed(ozelmesajuyari); }
	let mesaj = args.slice(0).join(' ');
	if (mesaj.length < 1) return message.channel.sendEmbed(new Discord.RichEmbed().setDescription('Bir kullanıcı ismi yazmalısın. :writing_hand:').setColor('RANDOM'));
	const mesaj2 = new Discord.RichEmbed()
    .setColor('RANDOM')
	.setDescription(`${mesaj}`)
	.setImage(`https://visage.surgeplay.com/full/404/${mesaj}.png`)
  message.channel.sendEmbed(mesaj2);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mcskin', 'mcs'],
  permLevel: 0
};

exports.help = {
  name: 'mcskin',
  description: 'Yazdığınız İsmin Mc Skinini Gösterir.',
  usage: 'T!mcskin <isim>'
};
