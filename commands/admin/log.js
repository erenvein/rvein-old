const model = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
name: "log",
category: "admin",
botperm: [],
userperm: ["MANAGE_CHANNELS"],
cooldown: {},
aliases: [],
guild: true,
usage: "log <channel|reset>",
description: "Sets/Resets log channel.",
run: async (client, message, args) => {
let g = await model.findOne({ guild: message.guild.id })

 let e = new d.MessageEmbed()
 .setAuthor(`Rvein Logging BETA`, message.author.avatarURL({ dynamic: true })|| message.athor.defaultAvatarURL)
 .setColor(client.color)
 .setDescription(`${client.user.username}'s logs **everything** to log channel`)
 .addField(`Log Channel`, `**Log channel**: The channel what ${client.user.username}'s logs every events.\nSet - \`${g ? g.prefix || client.prefix : client.prefix}log <channel>\`\nReset - \`${g ? g.prefix || client.prefix : client.prefix}log reset\``)


 if (!args[0]) return message.channel.send(e)
 else {
   if (args[0] == "reset") {
     if (!g) return message.reply(`No log channel found to reset in database`)
       if (!g.log) return message.reply(`No log channel found to reset in database`)
       if (!g.log.channel) return message.reply(`No log channel found to reset in database`)
       await g.updateOne({ "log.channel": "" })
        message.reply(`Successfully Log channel is reset.`)
     } else {
   let channel = message.mentions.channels.first() || message.guild.channels.cache.filter(c => c.type == "text").get(args[0]) || message.guild.channels.cache.filter(c => c.type == "text").find(c => c.name == args[0])
        if (!channel) return message.channel.send(e)
       else {
   if (channel.type ==! "text") return message.reply(`You are trying to set a non-text channel wtf?`)
            if (!channel.permissionsFor(client.user).has(["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"])) return message.reply(`I am missing one or more of the following permissions to send messages in ${channel}`)
        if (!g) {
          let d = new model({
            guild: message.guild.id,
            "log.channel": channel.id
            })
          d.save()
         message.reply(`Successfully Log channel set to <#${channel.id}>`)
          } else {
            if (g.log) {
            if (g.log.channel == channel.id) return message.reply(`Already log channel is <#${channel.id}> in database.`)
            }
           await g.updateOne({ "log.channel": channel.id })
            message.reply(`Successfully Log channel set to <#${channel.id}>`)
            }
        }
   }
   }
 },
};