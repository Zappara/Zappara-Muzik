const Discord = require("discord.js");
const ayarlar = require("./ayarlar.json");

exports.run = async (bot, message, args) => {

let embed = new Discord.RichEmbed()
    .setTitle("Müzik")
    .setDescription("There are currently 8 commands in this category.\n`The default prefix will remain.`")
    .addField("`" + ayarlar.prefix +"çal`", "Müzik çalar")
    .addField("`" + ayarlar.prefix +"neçalıyor`", "Şu anda ne çaldığını gösterir.")
    .addField("`" + ayarlar.prefix +"dur`", "Çalan müziği durdurur")
    .addField("`" + ayarlar.prefix +"kuyruk`", "Müzik kuyruğunu gösterir")
    .addField("`" + ayarlar.prefix +"geç`", "Bir sonraki müziği çalar")
    .addField("`" + ayarlar.prefix +"ses`", "Müziğin sesini ayarlar")
    .addField("`" + ayarlar.prefix +"devam`", "Durdurulan müziği devam ettirilir")
    .setImage("https://cdn.discordapp.com/attachments/440820385643233290/449932578833825816/unnamed_1.gif")
    .setThumbnail("https://cdn.discordapp.com/emojis/424321045034696724.gif")
    .setFooter("Müzik Bot | ${ayarlar.prefix}davet | Sahip: Enes Onur Ata#9427 | 7/24")

message.channel.send(embed);
}

exports.help = {
  name: "yardım"
}
