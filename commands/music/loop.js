const model = require("../../models/Guild")
module.exports = {
  name: "loop",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  status: false,
  guild: true,
  description: "Loops specified music/queue",
  run: async (client, message, args) => {
  let g = await model.findOne({ guild: message.guild.id })
  let a = g ? g.prefix || client.prefix : client.prefix
  let q = client.queue.get(message.guild.id)
  if (!q) return message.reply(`I am not playing any song in this server right now.`)
  if (!q.songs[0]) return message.reply(`I am not playing any song in this server right now.`)
  let embed = new (require("discord.js")).MessageEmbed()
  .setAuthor(`${client.user.username}'s Looping System`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  .setDescription(`${client.user.username} loops the current playing song or queue`)
  .addField(`Loop`, `**Looping**: It always does the same thing without stopping\nLoop current playing song - \`${a}loop song\`\nLoop the queue - \`${a}loop queue\`\nStops the loop\`${a}loop stop\``)
  .setColor(client.color)
  if (!args[0]) return message.reply(embed)
  if (args[0].toLowerCase() == "song") {
  q.loop = false
  q.songs[0].loop = true
  message.reply(`Successfully looping the current playing song.`)
  } else if (args[0].toLowerCase() == "queue") {
  if (q.loop == false) q.loop = true
  if (q.songs[0].loop == true) q.songs[0].loop = false
  message.reply(`Successfully looping the queue.`)
  } else if (args[0].toLowerCase() == "stop") {
  if (q.loop == true) q.loop = false
  if (q.songs[0].loop == true) q.songs[0].loop = false
  message.reply(`Successfully stopped the loop.`)
  } else return message.channel.send(embed)
    },
  };