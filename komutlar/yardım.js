const Discord = require('discord.js');
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("KATEGORİLER")
    .setAuthor("Prefix: ${ayarlar.prefix}", bot.user.displayAvatarURL)
    .addField("Yardım", "`" + prefix + "yardım`", true)
    .addField("Müzik", "`" + prefix + "müzik`", true)
    .addField("İstatistikler", "`" + prefix + "istatistikler`", true)
    .addField("Geliştirici", "`" + prefix + "geliştirici`", true)
    .setFooter("Müzik Botu" + prefix + "yardım" + "Tüm Hakları EnesOnurAta#9427 ye aittir.")
    message.channel.send(embed);
}
module.exports.help = {
    name: "yardım"
}
