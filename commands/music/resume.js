const ytdl = require("ytdl-core-discord");
module.exports = {
  name: "resume",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: ["unpause"],
  sub: "",
  usage: "",
  guild: true,
  description: "Resumes the paused music",
  run: async (client, message, args) => {
  if (!message.member.voice.channel) return message.reply(client.emotes.fail + ` | You have to join a voice channel to resume a song.`)
  let vc = message.member.voice.channel
  if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I am not playing any music in this server right now.`) 
  if (vc ==! message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | You are not listening what i am playing now.`)
  if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (!message.guild.me.voice.connection.dispatcher.paused) return message.reply(client.emotes.fail + ` | The current playing song is already didnt paused.`)
    await message.guild.me.voice.connection.dispatcher.resume(true)
    message.reply(client.emotes.succes + ` | Successfully resumed \`${client.queue.get(message.guild.id).songs[0].title}\`.`)
  },
};