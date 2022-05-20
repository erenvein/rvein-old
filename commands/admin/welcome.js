const d = require("discord.js");
const model = require("../../models/Guild");
module.exports = {
name: "welcome",
category: "admin",
botperm: [],
userperm: ["MANAGE_CHANNELS"],
cooldown: {},
aliases: [],
guild: true,
usage: "",
description: "",
run: async (client, message, args) => {
let g = await model.findOne({ guild: message.guild.id })
let a = g ? g.prefix || client.prefix : client.prefix
let e = new d.MessageEmbed()
.setAuthor(`${client.user.username} Welcome System`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
.setDescription(`${client.user.username} sends custom message to custom welcome channel`)
.setColor(client.color)
.addField(`Welcome Channel`, `**Welcome channel**: The channel what customizable channel to ${client.user.username} sends message when triggered a member joined to server\nSet - \`${a}welcome channel <channel>\`\nReset - \`${a}welcome channel reset\``)
.addField(`Welcome Message`, `**Welcome message**: The message what customazible message to ${client.user.username} sends this message when triggered a member joined to server\nSet - \`${a}welcome message <message>\`\nReset - \`${a}welcome message reset\`\n\n**Variables**: You can use variables to customizable welcome message\n\`{member}\` - Mention member\n\`{member.username}\` - Username of member`)
  
  if (!args[1] || !args[0]) return message.channel.send(e)
  else if (args[0].toLowerCase() == "channel") {
  if (args[1].toLowerCase() == "reset") {
  if (!g) return message.reply(`No welcome channel found to reset in database.`)
  if (!g.welcome) return message.reply(`No welcome channel found to reset in database.`)
  if (!g.welcome.channel) return message.reply(`No welcome channel found to reset in database.`)
  await g.updateOne({ "welcome.channel": "" })
  message.reply(`Successfully welcome channel is reset`)
  } else {
  let ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() == args.slice(1).join(" "))
  if (!ch) return message.channel.send(e)
  if (ch.type !== "text") return message.reply(`You are trying to set welcome channel a non-text channel?`)
  if (!ch.permissionsFor(client.user).has("SEND_MESSAGES")) return message.reply(`I am missing required permissions to send messages to ${ch}`)
  if (!g) {
  let da = new model({ guild: message.guild.id, "welcome.channel": ch.id })
  await da.save()
  message.reply(`Successfully Welcome channel is set to ${ch}`)
  } else {
  await g.updateOne({ "welcome.channel": ch.id })
  if (g.welcome) { if (g.welcome.channel == ch.id) return message.reply(`Already welcome channel is ${ch} in database.`) }
  message.reply(`Successfully Welcome channel is set to ${ch}`)}}
  } else if (args[0].toLowerCase() == "msg" || args[0].toLowerCase() == "message") {
  
  if (args[1].toLowerCase() == "reset") {
  if (!g) return message.reply(`No welcome message found to reset in database.`)
  if (!g.welcome) return message.reply(`No welcome message found to reset in database.`)
  if (!g.welcome.msg) return message.reply(`No welcome message found to reset in database.`)
  await g.updateOne({ "welcome.msg": "" })
  message.reply(`Successfully Welcome message is reset.`)
  } else {
  let m = args.slice(1).join(" ")
  if (!g) {
  let da = new model({ guild: message.guild.id, "welcome.msg": m })
  await da.save()
  message.reply(`Successfully Welcome message is set to \`${m}\``)
  } else {
  await g.updateOne({ "welcome.msg": m })
  message.reply(`Successfully Welcome message is set to \`${m}\``)
      }
    }
  }
},
};