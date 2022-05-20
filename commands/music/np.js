const ytdl = require("ytdl-core-discord");
const d = require("discord.js");
module.exports = {
  name: "np",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: ["nowplaying"],
  sub: "",
  usage: "",
  guild: true,
  description: "Sends info about current playing music",
  status: true,
  run: async (client, message, args) => {
   if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`)
   if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`)
   let sq = client.queue.get(message.guild.id)
   if (!sq) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`)
   if (!sq.songs[0]) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`)
   let embed = new d.MessageEmbed()
   .setColor(client.color)
   .setAuthor(`Now playing in #${message.guild.voice.channel.name}`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
   .setDescription(`[${sq.songs[0].title}](${sq.songs[0].url})`)
   .setThumbnail(sq.songs[0].thumbnail)
   message.channel.send(embed)
   },
  };