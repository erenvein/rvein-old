const y = require("ytdl-core-discord");
const s = require("simple-youtube-api");
const a = new s(process.env.YT_TOKEN)
module.exports = {
  name: "end",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: ["stop"],
  sub: "",
  usage: "",
  guild: true,
  description: "Ends current playing music",
  run: async (client, message, args) => {
  if (!message.member.voice.channel) return message.reply(client.emotes.fail + ` | You have to join a voice channel to end a song.`)
  let vc = message.member.voice.channel
  if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (vc !== message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | You are not listening what i am playing now.`)
  if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I am not playing any song in this server right now.`) 
  if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I am not playing any music in this server right now.`) 
  
  let s = client.queue.get(message.guild.id)
  message.reply(client.emotes.succes + ` | Successfully stopped \`${s.songs[0].title}\``)
  await message.guild.me.voice.connection.dispatcher.end()
  },
};