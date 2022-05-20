const modlog = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
  name: "kick",
  category: "mod",
  userperm: "KICK_MEMBERS",
  botperm: "KICK_MEMBERS",
  aliases: [],
  guild: true,
  description: "Kick a member with optional reason in server", //whether or not the member is in the server",
  run: async (client, message, args) => {
    if (!args) return message.reply("uh oh i don't know who i should kick?")
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username  == args[0])
    if (!user) return message.reply("uh oh i don't know who i should kick?")//there's a user but i cant find")
    let member = message.guild.member(user)
    if (!member) return message.reply("there's a user named " + user.username + " but not in this server is it already banned? idk")
    if (!member.kickable) return message.reply("I am not high enough in the role hierarchy to do that.")
    if (message.author.id == member.id) return message.reply("You are not high enough in the role hierarcy to do that.")
    if (message.author.id ==! message.guild.owner.id) {

     
      if (message.member.roles.highest.rawPosition == member.roles.highest.rawPosition) return message.reply("You are not high enough in the role hierarchy to do that.")
    if (message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.reply("You are not high enough in the role hierarchy to do that.")
    }
    if (member.id == message.guild.owner.id) return message.reply("You are not high enough in the role hierarchy to do that.")
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "N/A"
    await member.kick({reason: `${message.author.tag} kicked due to ${reason}`}).then(async()=> {
    user.send("You got kicked from " + message.guild.name + "by " + message.author.tag + " due to " + reason)
     message.reply(`You kicked ${user.tag} due to ${reason}`)
      const model = require("../../models/Guild")
      const guild = await model.findOne({ guild: message.guild.id })
      await guild.updateOne({
					$push: {
						moderations: {
							kick: {
								user: member.id,
								mod: message.author.id,
								reason: reason,
								case_id: guild.moderations.length
							}
						}
					}
				})//mla arda
     const log = await modlog.findOne({ guild: message.guild.id })
     if (!log.log.channel) return;
     const channel = message.guild.channels.cache.get(log.log.channel)
     if (!channel) return;
     const embed = new d.MessageEmbed()//let embed bok better
    .setColor(client.color)
    .setTitle("Kick | Case #" + guild.moderations.length, message.guild.iconURL())//"478587347")
    .addField("User", user.tag, true)
    .addField("Moderator", message.author.tag, true)
    .addField("Reason", reason, true)
    .setAuthor(user.tag + " kicked", user.avatarURL({ dynamic: true }) || user.defaultAvatarURL)
      channel.send(embed)
      });
    },
};