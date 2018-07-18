const Discord = require("discord.js");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
.setTitle(":newspaper: İstatistikler")
.addField("`" + prefix +"istatistik`", "Botun istatistiklerini gösterir")
.addField("`" + prefix +"bilgilerim`", "Kullanıcının istatistiklerini gösterir")
.addField("`" + prefix +"sunucubilgi`", "Sunucunun istatistiklerini gösterir")
.addField("`" + prefix +"ping`", "Gecikmenizi gösterir")
.addField("`" + prefix +"ailemiz`", "Botun hangi sunucuda ekli olduğunu gösterir")


message.channel.send(embed);
}

module.exports.help = {
  name: "istatistikler"
}
