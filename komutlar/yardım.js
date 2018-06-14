const Discord = require("discord.js");
const ayarlar = require("./ayarlar.json");
const prefix = ayarlar.prefix;
exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle("Müzik")
    .setDescription("There are currently 8 commands in this category.\n`The default prefix will remain.`")
    .addField("`" + prefix +"çal`", "Müzik çalar")
    .addField("`" + prefix +"neçalıyor`", "Şu anda ne çaldığını gösterir.")
    .addField("`" + prefix +"dur`", "Çalan müziği durdurur")
    .addField("`" + prefix +"kuyruk`", "Müzik kuyruğunu gösterir")
    .addField("`" + prefix +"geç`", "Bir sonraki müziği çalar")
    .addField("`" + prefix +"ses`", "Müziğin sesini ayarlar")
    .addField("`" + prefix +"devamet`", "Durdurulan müziği devam ettirilir")
    .setImage("https://cdn.discordapp.com/attachments/440820385643233290/449932578833825816/unnamed_1.gif")
    .setThumbnail("https://cdn.discordapp.com/emojis/424321045034696724.gif")
    .setFooter("Müzik Bot | ${prefix}davet | Sahip: Enes Onur Ata#9427 | 7/24")

message.channel.send(embed);
}

exports.help = {
  name: "yardım"
}
