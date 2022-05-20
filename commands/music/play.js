const D = require("discord.js");
const ytdl = require("ytdl-core-discord");
const yT = require("simple-youtube-api");
const yt = new yT(process.env.YT_TOKEN)
module.exports = {
  name: "play",
  category: "music",
  userperm: "",
  botperm: [],
  aliases: ["p"],
  usage: "",
  guild: true,
  status: false,
  description: "Searchs and plays music from youtube",
  run: async (client, message, args) => {
  if (!args[0]) return message.reply(`You did'nt indicate url or search terms.`)
  if (!message.member.voice.channel) return message.reply(`You have to join a voice channel to play a song.`)
  let vc = message.member.voice.channel
  if (message.guild.me.voice.channel && vc.id !== message.guild.me.voice.channel.id) { if (message.guild.me.voice.channel.members.size > 1) { if (message.guild.me.voice.connection.dispatcher) { message.reply(`You have to join in my channel to play a song.`) } else { await message.guild.me.voice.connection.disconnect() } } else { if (message.guild.me.voice.connection.dispatcher) await message.guild.me.voice.connection.dispatcher.end(), await message.guild.me.voice.connection.disconnect()}}
  if (!vc.permissionsFor(client.user).has(["CONNECT", "SPEAK"])) return message.reply(`I am missing one or more \`CONNECT\`, \`SPEAK\` permissions to play a song.`)
  let results = await yt.searchVideos(args.join(" "))
  if (!results || !results[0] || !results[0].url) return message.reply(`No results for \`${args.join(" ")}\``)
  let result = results[0]
  let song = { loop: false, title: result.title, url: result.url, thumbnail: null/*esult.videoDetails.thumbnail.thumbnails[3].url, duration: result.videoDetails.lengthSeconds, loop: false*/}
  let q = client.queue.get(message.guild.id)
  let embed = new D.MessageEmbed().setColor(client.color)
  if (!q) {
  client.queue.set(message.guild.id, { songs: [song], loop: false })
  let c = message.guild.me.voice.connection
  if (!message.guild.me.voice.channel) c = await vc.join()
  if (!c) c = await vc.join()
  await c.play(await ytdl(song.url, { filter: "audioonly" }), { type: "opus" })
  embed.setAuthor(`Now Playing`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  embed.setDescription(`[${song.title}](${song.url})`)
  //embed.setThumbnail(song.thumbnail)
  message.channel.send(embed)
  } else {
   
  await q.songs.push(song)
  embed.setAuthor(`Added to Queue`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  embed.setDescription(`[${song.title}](${song.url})`)
  //embed.setThumbnail(song.thumbnail)
  message.channel.send(embed)}
  if (message.guild.me.voice.connection && message.guild.me.voice.connection.dispatcher) {
let d = message.guild.me.voice.connection.dispatcher
  d.on("finish", async () => {
  if (message.guild.me.voice.channel.members.size <= 1) { 
  await message.guild.me.voice.connection.disconnect() 
  client.queue.delete(message.guild.id)
  } else {
  if (!q) await message.guild.me.voice.connection.disconnect()
   else if (!q.songs[0]) {
     await message.guild.me.voice.connection.disconnect()
     client.queue.delete(message.guild.id)
                        
                        
                        
                        
     
  } else {
     if (!q.songs[0].loop || q.songs[0].loop == false) await q.songs.shift()
      await message.guild.me.voice.connection.play(await ytdl(q.songs[0].url, { filter: "audioonly" }), { type: "opus" })
   embed.setAuthor(`Now Playing`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  embed.setDescription(`[${q.songs[0].title}](${q.songs[0].url})`)
  message.channel.send(embed)
    }
      
   } 
  });
    }
   },
  };