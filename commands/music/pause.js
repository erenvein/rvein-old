const ytdl = require("ytdl-core-discord");
module.exports = {
  name: "pause",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  description: "Pauses current playing song",
  run: async (client, message, args) => {
  if (!message.member.voice.channel) return message.reply(client.emotes.fail + ` | You have to join a voice channel to pause a song.`)
  let vc = message.member.voice.channel
   let sq = client.queue.get(message.guild.id)
  if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (vc ==! message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | You are not listening what i am playing now.`)
if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
   if (message.guild.me.voice.connection.dispatcher.paused) return message.reply(client.emotes.fail + ` | Already paused the song.`)
    await message.guild.me.voice.connection.dispatcher.pause(true)
    message.reply(client.emotes.succes + ` | Successfully paused \`${sq.songs[0].title}\`.`)
  },
};