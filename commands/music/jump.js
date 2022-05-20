const y = require("ytdl-core-discord");
module.exports = {
  name: "jump",
  category: "music",
  userperm: ["MUTE_MEMBERS"],
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  description: "Jumps to specified music in the queue",
  run: async (client, message, args) => {
  if (!args[0]) return message.reply(`You must type a number to jump in queue`) 
  let vc = message.member.voice.channel
  if (!message.guild.me.voice.channel) return message.reply(`I am not playing any song in this server right now.`)
  if (!vc) return message.reply(`You have to join a voice channel to jump a song.`)
  if (vc.id !== message.guild.me.voice.channel.id) return message.reply(`You are not in my voice channel.`)
  if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  let s = client.queue.get(message.guild.id)
  if (isNaN(args[0])) return message.reply(`You must type a number to jump in queue`)
  if (!s) return message.reply(`I am not playing any song in this server right now.`)
  if (!s.songs[0]) return message.reply(`I am not playing a song right now.`)
//  if (!message.guild.me.voice.connection) return; messag
  if (args[0] > s.songs.length) return message.reply(`I could not find #${args[0]} song.`)
  await s.songs.splice(0, Math.floor(parseInt(args[0]) - 1))
  await message.guild.me.voice.connection.play(await y(s.songs[0].url, { filter: "audioonly", quality: "highestaudio" }), { type: "opus" })
/*  let e = new (require("discord.js")).MessageEmbed()
  .setAuthor(`Now playing`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  .setColor(client.color)
  .setDescription(`[${s.songs[0].title}](${s.songs[0].url})`)
message.channel.send(e)*/
  
  },
  };