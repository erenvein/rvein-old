const d = require("discord.js");
const aa = require("ytdl-core-discord");
const a = require("simple-youtube-api");
const p = new a(process.env.YT_TOKEN)
module.exports = {
  name: "queue",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  status: false,
  description: "Sends all musics name in the queue",
  run: async (client, message, args) => {
  if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song on this server right now.`)
  if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I am not playing any song on this server right now.`)
  if (!client.queue.get(message.guild.id)) return message.reply(client.emotes.fail + ` | I am not playing any song on this server right now.`)
  if (!client.queue.get(message.guild.id).songs[0]) return message.reply(client.emotes.fail + ` | I am not playing any song on this server right now.`)
  let e = new d.MessageEmbed()
  .setAuthor(`Queue of server`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  .setColor(client.color)
  .addField(`Now playing`, `[${client.queue.get(message.guild.id).songs[0].title}](${client.queue.get(message.guild.id).songs[0].url})`)
  .addField(`Up next`, `${client.queue.get(message.guild.id).songs[1] ? client.queue.get(message.guild.id).songs.slice(1).map(a => `[${a.title}](${a.url})`).join("\n") || "** **" : "** **"}`)
  message.channel.send(e)
  },
  };