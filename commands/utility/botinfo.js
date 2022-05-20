/*const D = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
module.exports = {
  name: "botinfo",
  category: "info",
  userperm: "",
  botperm: "EMBED_LINKS",
  aliases: [],
  guild: false,
  description: "Gets bot info from top.gg",
  usage: "botinfo <bot>",
  run: async (client, message, args, mentionuser) => {
      let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args[0]) //message.guild.members.cache.get(args[0]).user || message.guild.members.cache.find(m => m.user.username == args).user || message.author

      if (!user) user = client.user//return message.reply(client.emotes.fail + ` | I could could not find any bot gets info.`)
  if (!bot) return message.channel.send(`${client.emotes.fail} | Cannot find this bot`)
  let e = new D.MessageEmbed()
  //message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL, `${client.user.username} BOT Info`)
  .setColor(client.color)
  .setAuthor(bot.username+"#"+bot.discriminator, client.users.cache.get(bot.id).avatarURL())
  //.addField("Owners", bot.owners.map(o => `${o}`))
  .addField("Prefix", bot.prefix)
  .addField("Short description", bot.shortdesc)
  .addField("Library", bot.lib)
  .addField("Upvotes", bot.points)
  .addField("Tags", bot.tags.join(", "))
  
  message.channel.send(e)
  },
};*/