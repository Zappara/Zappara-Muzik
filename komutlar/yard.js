const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../ayarlar.json');

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
  
  .setTitle("Bot Komutları")
  .setAuthor("Rangin ∞ | Kodlar (r!) İle Başlar", "")
  .setColor("RANDOM")
  .setDescription('davet • Botun davet linkini atar.\nYeni Kodlar Gelicek\nbug • Bottaki bugu bildirmenizi sağlar.\nping • Botun pingini gösterir.\nsunucubilgi • Bu komutu hangi sunucuda kullanıysanız oranın bilgisini verir.\ntavsiye • Botun sahibine verdiğiniz tavsiyeyi gönderir.\n')
  .setFooter("")
  .setThumbnail("")
  .setTimestamp()
  
  .addField("Moderasyon Komutları", "ban • Belirttiğiniz kişiyi sunucudan banlar.\nkick • Belirttiğiniz kişiyi sunucudan atar.\nsustur • Belirttiğin kişiyi susturur.\ntemizle • Sohbeti belirttiğin sayı kadar siler.\nunban • Belirttiğin kişinin sunucudaki yasağını kaldırır.\noylama • Oylama Açarsınız.\nhastebin • Hastebine Kod Ekler.\n")
  .addField("Müzik Kodları", "çal• Müzik Çalar.\ngeç • Müzik Atlar\ndur • Müziği Durdurur\nkuyruk • müzik listesi\n", true)
  .addBlankField(true)
  .addField(" Kullanıcı Komutları", "• Yeni Kodlar Gelicek\nkurucu • Sunucunun kurucusunu gösterir.\nkullanıcıbilgim • Bu komutu kullanan her kimse hakkında bilgi verir.\n", true)
  message.channel.send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot bilgi', 'botbilgi', 'bb', 'botb', 'bbot', 'hakkında', 'bot hakkında', 'bothakkında'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Bot ile ilgili komut listesini verir.',
  usage: 'yardım'
};
