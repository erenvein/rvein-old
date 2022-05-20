const Discord = require('discord.js');
const model = require("../../models/Guild");
module.exports = {
  name: "prefix",
  category: "admin",
  botperm: "",
  userperm: "MANAGE_GUILD",
  aliases: [],
  guild: true,
  usage: "prefix <prefix>",
  description: "Sets prefix (You can't change/remove mention prefix)",
  run: async (client, message, args) => {
  let g = await model.findOne({ guild: message.guild.id })
  if (!args[0]) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(`Prefixes`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
  .setDescription(`1. <@${client.user.id}>\n2. ${g ? g.prefix || client.prefix : client.prefix}`)
  .setColor(client.color)
  message.channel.send(embed)
  } else if (args[0] == "reset") {
   if (!g) return message.reply(`No prefix found to reset in database`)
if (!g.prefix) return message.reply(`No prefix found to reset in database`)
    await g.updateOne({ prefix: "" })
    message.reply(`Prefix is reset to default \`${client.prefix}\``)
    } else {
    if (!g) {
     let d = new model({
       guild: message.guild.id,
       prefix: args[0]
       })
     await d.save()
      message.reply(`Prefix is set to \`${args[0]}\``)
      } else {
        if (g.prefix == args[0]) return message.reply(`Already prefix is \`${args[0]}\` in database.`)
      await g.updateOne({ prefix: args[0] })
        message.reply(`Prefix is set to \`${args[0]}\``)
      };
    };
  },
};
