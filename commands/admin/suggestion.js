const Discord = require('discord.js');
const model = require("../../models/Guild");
module.exports = {
  name: "suggestion",
  category: "admin",
  botperm: "",
  status: false,
  userperm: "",
  aliases: ["suggest"],
  guild: true,
  usage: "suggestion <channel|suggestion> <#channel|reset>",
  description: "Sets/Resets suggestion channel or suggest anything",
  run: async (client, message, args) => {
  let g = await model.findOne({ guild: message.guild.id })
  let a = g ? g.prefix || client.prefix : client.prefix
  let embed = new Discord.MessageEmbed()
    .setColor(client.color)
    .setAuthor(`${client.user.username} Suggestion System`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
    .setDescription(`Members can suggest anything to useful things for your server and mods can approve or denie suggestions.`)//bu komtu herkes kullanabilio farkettn migzl
    .addField(`Suggestion`, `**Suggestion channel**: The channel what the suggestions to will be sent.\nSet - \`${a}suggestion channel <channel>\`\nReset - \`${a}suggestion channel reset\`\n\n**Suggest**: Something you can think will be good for server.\nSuggest - \`${a}suggest <content>\``)
    
    if (!args[0]) return message.channel.send(embed)
    else if (args[0] == "channel") {
      if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply(`You are missing one or more of following permissions\n\`MANAGE_CHANNELS\``)
      if (args[1] == "reset") {
       if (!g) return message.reply(`No suggestion channel found to reset in database`)
       if (!g.suggestion) return message.reply(`No suggestion channel found to reset in database`)
       if (!g.suggestion.channel) return message.reply(`No suggestion channel found to reset in database`)
       await g.updateOne({ "suggestion.channel": "" })
        message.reply(`Successfully suggestion channel is reset.`)
      } else {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.filter(c => c.type == "text").get(args[0]) || message.guild.channels.cache.filter(c => c.type == "text").find(c => c.name == args[0])
        if (!channel) return message.channel.send(embed)
           else {
            if (channel.type ==! "text") return message.reply(`You are trying to set a non-text channel wtf?`)
            if (!channel.permissionsFor(client.user).has(["SEND_MESSAGES", "EMBED_LINKS"])) return message.reply(`I am missing one or more of the following permissions to send messages in ${channel}`)
        if (!g) {
          let d = new model({
            guild: message.guild.id,
            "suggestion.channel": channel.id
            })
          d.save()
         message.reply(`Successfully suggestion channel set to <#${channel.id}>`)
          } else {
            if (g.suggestion) {
              if (g.suggestion.channel == channel.id) return message.reply(`Already suggestion channel is <#${channel.id}> in database.`)
              }
           await g.updateOne({ "suggestion.channel": channel.id })
            message.reply(`Successfully suggestion channel set to <#${channel.id}>`)
            }
          }
        };
     } else {
      if (!g) return message.channel.send(embed)
      if (!g.suggestion)  return message.channel.send(embed)
      if (!g.suggestion.channel) return  message.channel.send(embed)
      else {
               let channel = message.guild.channels.cache.get(g.suggestion.channel)
               if (!channel) return;
                await message.delete()
               let embesd = new Discord.MessageEmbed()
               .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
               .setTitle(`Suggestion #${g.s.length}`)
               .setDescription(args.join(" "))
               .setTimestamp()
             let a = await channel.send(embesd)
                await g.updateOne({ $push: { s: { ss: { case: g.s.length, author: message.author.id, content: args.join(" "), msg: a.id } } } })
            //await g.updateOne({  $push: { s: { author: message.author.id, content: args.join(" "), msg: a.id } } })
                await a.react(client.emotes.up)
                await a.react(client.emotes.down)
                }
     }
     
  },
};