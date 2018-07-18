const Discord = require("discord.js");
const ayarlar = require("./ayarlar.json");
var prefix = ayarlar.prefix

module.exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle("Müzik")
    .setDescription("There are currently 8 commands in this category.\n`The default prefix will remain.`")
    .addField("`" + prefix +"çal`", "Müzik çalar")
    .addField("`" + prefix +"dur`", "Çalan müziği durdurur")
    .addField("`" + prefix +"kuyruk`", "Müzik kuyruğunu gösterir")
    .addField("`" + prefix +"geç`", "Bir sonraki müziği çalar")
    .addField("`" + prefix +"ses`", "Müziğin sesini ayarlar")
    .addField("`" + prefix +"devam`", "Durdurulan müziği devam ettirilir")
    .setFooter("Müzik Komutları | Tüm Hakları EnesOnurAta#9427 ye aittir.")

message.channel.send(embed);
}

module.exports.help = {
  name: "müzik"
}
