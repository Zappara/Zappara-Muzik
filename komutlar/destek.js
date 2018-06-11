const Discord = require('discord.js');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
  if (mesaj.length < 1) return message.reply('Hatayı Yazmayı Unuttun.');
  message.channel.send({embed: {
      color: 3447003,
      description: "Desteğini Gönderdim Birazdan Destek Ekibinden Gelecekler"
    }});
  message.channel.createInvite()
      .then(invite => client.channels.get('442776461993181194')
      .send(`Destek çağırdı.\nDestek isteyen: ${message.author.username}#${message.author.discriminator}\nServer Sayısı: ${message.guild.memberCount}\nSunucu İsmi: ${message.guild.name}\nDavet Linki: http://discord.gg/${invite.code}\nHata: ${mesaj}`))
      .catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['destek', 'botdestek','help'],
  permLevel: 0
};

exports.help = {
  name: 'destek',
  description: 'destek',
  usage: 'destek'
};
