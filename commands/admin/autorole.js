const Discord = require('discord.js');
const model = require("../../models/Guild");
module.exports = {
  name: "autorole",
  category: "admin",
  botperm: "MANAGE_ROLES",
  userperm: "MANAGE_ROLES",
  aliases: ["autoroles"],
  guild: true,
  usage: "autorole <role|reset>",
  description: "Sets/Resets human/bot/all autorole",
  run: async (client, message, args) => {
  let g = await model.findOne({ guild: message.guild.id });
  let a = g ? g.prefix || client.prefix : client.prefix
  let r = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(ra => ra.name.toLowerCase() == args.slice(1).join(" "))
  let embed = new Discord.MessageEmbed()
    .setAuthor(`Rvein Autorole`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
    .setColor(client.color)
    .setDescription(`Rvein autorole system gives role to new members`)
    .addField(`Autoroles`, `\n**Auto role**: ${client.user.username} gives role specified in database to new joined all members\nSet \`${a}autorole all <role>\`\nReset \`${a}autorole reset all\`\n\n**Auto human role**: Rvein gives only role specified in the database to new joined humans\nSet \`${a}autorole human <role>\`\nReset \`${a}autorole bot reset\`\n\n**Auto bot role**: ${client.user.username} gives only role specified in the database to new joined bots\nSet \`${a}autorole bot <role>\`\nReset \`${a}autorole bot reset\``)
 
  if (!args[0]) return message.channel.send(embed);
  else if (args[0].toLowerCase() == "reset") {
     let s = "";
       if (args[1].toLowerCase() == "human" || args[1].toLowerCase() == "humans") {
         if (!g) return message.reply(`No auto human role found to reset in database.`)
         if (!g.autoroles) return message.reply(`No auto human role found to reset in database.`)
         if (!g.autoroles.human) return message.reply(`No auto human role found to reset in database.`)
         await g.updateOne({ "autoroles.human": "" });
        } else if (args[1].toLowerCase() == "bot" || args[1].toLowerCase() == "all") {
        if (!g) return message.reply(`No auto bot role found to reset in database.`)
         if (!g.autoroles) return message.reply(`No auto bot role found to reset in database.`)
         if (!g.autoroles.bot) return message.reply(`No auto bot role found to reset in database.`)
          await g.updateOne({ "autoroles.bot": "" })
      } else if (args[1].toLowerCase() == "all") {
        if (!g) return message.reply(`No autorole found to reset in database.`)
         if (!g.autoroles) return message.reply(`No autorole found to reset in database.`)
         if (!g.autoroles.all) return message.reply(`No autorole found to reset in database.`)
         await g.updateOne({ "autoroles.all": "" })
      } else return message.channel.send(embed);
         } else if (args[0].toLowerCase() == "human" || args[0].toLowerCase() == "humans") {
         if (!r) return message.channel.send(embed)
        if (!g) {
          let d = new model({ guild: message.guild.id, "autoroles.human": r.id })
          await d.save()
         message.reply(`Successfully auto human role is set to \`${r.name}\``)
       } else {
         if (g.autoroles) { if (g.autoroles.human == r.id) return message.reply(`Already auto human role is \`${r.name}\` in database.`) }
        await g.updateOne({ "autoroles.human": r.id })
       message.reply(`Successfully auto human role is set to \`${r.name}\``)
       }
         } else if (args[0].toLowerCase() == "all" || args[0].toLowerCase() == "all") {
         if (!r) return message.channel.send(embed)
        if (!g) {
          let d = new model({ guild: message.guild.id, "autoroles.all": r.id })
          await d.save()
         message.reply(`Successfully autorole is set to \`${r.name}\``)
      } else {
        if (g.autoroles) { if (g.autoroles.all == r.id) return message.reply(`Already autorole is \`${r.name}\` in database.`) }
        await g.updateOne({ "autoroles.all": r.id })
          message.reply(`Successfully auto human role is set to \`${r.name}\``)  
      }
        } else if (args[0].toLowerCase() == "bot" || args[0].toLowerCase() == "bots") {
         if (!r) return message.channel.send(embed)
        if (!g) {
          let d = new model({ guild: message.guild.id, "autoroles.bot": r.id })
          await d.save()
         message.reply(`Successfully auto bot role is set to \`${r.name}\``)
      } else {
        if (g.autoroles) { if (g.autoroles.bot == r.id) return message.reply(`Already auto bot role is \`${r.name}\` in database.`) }
        await g.updateOne({ "autoroles.bot": r.id })
          message.reply(`Successfully auto human role is set to \`${r.name}\``)  
      }
        } else return message.channel.send(embed)
    },
   };