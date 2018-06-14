const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX, GOOGLE_API_KEY } = require('./ayarlar');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(GOOGLE_API_KEY);

const queue = new Map();

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Bot Baglandi!'));

client.on('disconnect', () => console.log('Internetten kaynakli bir sorun cikti.'));

client.on('reconnecting', () => console.log('Bot tekrar baglandi.'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === 'çal') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(':x: Lutfen Sesli Bir Kanala Giriniz.');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(':x: Odaya Girme Yetkim Yok');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send(':x: Kanalda Konuşma Yetkim Yok');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`Oynatma Listesi: **${playlist.title}** Listeye Eklendi`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Sarki Listesi:**__

${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}

Hangi şarkıyı seçmek istiyorsun? 1-10 Kadar sayı seç.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send(':x: Süre bitti. Biraz hızlı yaz!');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(':x: Arama sonucunu elde edemedim.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'geç') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: Sesli Kanalda Değilsin.');
		if (!serverQueue) return msg.channel.send(':x: Şarkı Çalmıyor');
		serverQueue.connection.dispatcher.end(':white_check_mark:  Başarıyla Atladın');
		return undefined;
	} else if (command === 'dur') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x: Sesli Kanala Giriniz.');
		if (!serverQueue) return msg.channel.send(':x: Şarkı Çalmıyor.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(':white_check_mark:  Başarıyla Durdu');
		return undefined;
	} else if (command === 'ses') {
		if (!msg.member.voiceChannel) return msg.channel.send(':x:  Sesli Kanala Giriniz');
		if (!serverQueue) return msg.channel.send(':x: Şarkı Çalmıyor.');
		if (!args[1]) return msg.channel.send(`Şimdiki Ses Durumu: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Yeni Ses Durumu: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send(':x: Müzik Çalmıyor');
		return msg.channel.send(`Oynatilan Sarki: **${serverQueue.songs[0].title}**`);
	} else if (command === 'kuyruk') {
		if (!serverQueue) return msg.channel.send(':x: Müzik Çalmıyor');
		return msg.channel.send(`
__**Şarkı Kuyruğu**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Oynatılan:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'dur') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('Şarkı Durdu');
		}
		return msg.channel.send('Şarkı Durdu.');
	} else if (command === 'devam') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('Tekrar Başladı!');
		}
		return msg.channel.send(':x: Müzik Çalmıyor');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:x: Ses Kanalına Giremedim Hata: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`:x: Ses Kanalına Giremedim Hata: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`Oynatma Listesine **${song.title}** İsimli Şarkı Eklendi.`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'internetten kaynaklı sorun çıktı.') console.log('Sarkilar Bitti..');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`:notes: **${song.title}** Adlı Şarkı Başladı`);
}


//Komut Algılaması
const Discord = require("discord.js");
const fs = require("fs");
let bot = new Discord.Client();
let client = new Discord.Client();
bot.commands = new Discord.Collection();
const ayarlar = require("./ayarlar.json")
var prefix = ayarlar.prefix;
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, bot);
message.prefix = prefix;
var prefix = ayarlar.prefix;

	bot.on('ready', () => {
	console.log("Yukleniyor...");
	setTimeout(function(){
	console.log("Basariyla yuklendi.");
	}, 1000);
	function botStatus() {
        let status = [
            `Prefix 》${botconfig.prefix}`,
            `Teşekkürler 》${bot.guilds.size} sunucu.`,
	    `Teşekkürler 》${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} kullanıcı.`,
            `Yardıma mı ihtiyacınız var? 》 ${botconfig.prefix}yardım`,
 	    `Müzik dinlemek için 》 ${botconfig.prefix}çal <şarkı_ismi yada linki>`,
	    `Müziği durdurmak için 》 ${botconfig.prefix}dur`,
	    `Sıradaki müziğe geçmek için 》${botconfig.prefix}geç`,
	    `Şarkı kuyruğuna bakmak için 》${botconfig.prefix}kuyruk `,
	    `Ses seviyesini ayarlamak için 》${botconfig.prefix}ses <ses_seviyesi>`,
	    `Sizlere 7/24 Hizmet Veriyoruz!`,
	    `©2018 Müzik™ by Enes Onur Ata#9427`,
            `Botun Geliştiricisi 》 Enes Onur Ata#9427`
        ];
        let rstatus = Math.floor(Math.random() * status.length);

        bot.user.setActivity(status[rstatus], {Type: 'STREAMING'});        // BOT STATUS
      }; setInterval(botStatus, 20000)
        setInterval(() => {
        dbl.postStats(bot.guilds.size)
        }, 1800000);
	})

	fs.readdir("./komutlar/", (err, files) => {
    console.log(`Yuklendi ${files.length} komut.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Komutlar bulunamadi.");
	return;
	}


	jsfile.forEach((f, i) =>{
	let props = require(`./komutlar/${f}`);
	console.log(`Yuklendi : ${f}`);
	bot.commands.set(props.help.name, props);
	});
	});


	try {
	let commandFile = require(`./komutlar/${cmd}.js`);
	commandFile.run(bot, message, args);
	if(!commandFile) return message.channel.send("Bu isimde bir komut yok!");
	} catch (e) { console.log(e) }







//Haşmetli TOKEN
client.login(process.env.BOT_TOKEN);
