const model = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
  name: "antispam",
  category: "admin",
  botperm: "MANAGE_MESSAGES",
  userperm: "MANAGE_MESSAGES",
  aliases: ["anti-spam"],
  guild: true,
  usage: "antispam enable/disable",
  description: "Enables/Disables antispam.",
  run: async (client, message, args) => {
  let g = await model.findOne({ guild: message.guild.id })
  let aa = g ? g.prefix || client.prefix : client.prefix
    let embed = new d.MessageEmbed()
    .setColor(client.color)
    .setAuthor(`${client.user.username} Antispam`, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
    .setDescription(`${client.user.username}'s stops the spammers`)
    .addField(`Antispam`, `**Antispam**: ${client.user.username}'s stops the spammers if they can spam 5 messages in 5 seconds\n\Enable - \`${aa}antispam enable\`\nDisable - \`${aa}antispam disable\``)
    if (!args[0]) return message.channel.send(embed)
    else if (args[0].toLowerCase() == "enable") {
    if (!g) {
      const db = new model({ guild: message.guild.id, "automod.antispam": true })
      await db.save()
      message.reply(client.emotes.succes + ` | Successfully antispam is enabled.`)
      } else {
        if (g.automod) {
        if (g.automod.antispam == true) return message.reply(client.emotes.fail + ` | Already antispam is enabled.`)
          }
        await g.updateOne({ "automod.antispam": true })
        message.reply(client.emotes.succes + ` | Successfully antispam is enabled.`)
        };
    } else if (args[0].toLowerCase() == "disable") {
      if (!g) return message.reply(client.emotes.fail + ` | Already antispam is disabled.`)
      if (!g.automod) return message.reply(client.emotes.fail + ` | Already antispam is disabled.`)
      if (!g.automod.antispam) return message.reply(client.emotes.fail + ` | Already antispam is disabled.`)
      if (g.automod.antispam == false) return message.reply(client.emotes.fail + ` | Already antispam is disabled.`)
        await g.updateOne({ "automod.antispam": false })
        message.reply(client.emotes.succes + ` | Successfully antispam is disabled.`)
    } else return message.channel.send(embed)

      
    },
  };