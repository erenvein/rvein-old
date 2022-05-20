const modlog = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
  name: "ban",
  category: "mod",
  userperm: "BAN_MEMBERS",
  botperm: "BAN_MEMBERS",
  aliases: [],
  guild: true,
  description: "Bans a member with optional reason in server", //whether or not the member is in the server",
  run: async (client, message, args) => {
    if (!args) return message.reply(client.errors.args+" a user!")
    let user = message.mentions.users.first() || client.users.cache.find(u => u.username  == args[0])
    if (!user) return message.reply(client.errors.args+" a user!")//there's a user but i cant find")
    let member = message.guild.member(user)
    if (!member) return message.reply("there's a user named " + user.username + " but not in this server is it already banned? idk")
    if (!member.bannable) return message.reply("I am not high enough in the role hierarchy to do that.")
    if (message.author.id == member.id) return message.reply("You are not high enough in the role hierarcy to do that.")
    if (message.author.id ==! message.guild.owner.id) {


     if (message.member.roles.highest.rawPosition == member.roles.highest.rawPosition) return message.reply("You are not high enough in the role hierarchy to do that.")
    if (message.member.roles.highest.rawPosition < member.roles.highest.rawPosition) return message.reply("You are not high enough in the role hierarchy to do that.")
    }
    if (member.id == message.guild.owner.id) return message.reply("You are not high enough in the role hierarchy to do that.")
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "N/A"//yardm istermsn
   // if (!log) return; //eturn new modlog({guild: message.guild.id, channel: db.channel}).collection.deleteOne()
   let a = await message.guild.fetchBans()
   if (a.find(u => u.id == user.id)) return message.reply(client.emotes.fail + ` | The user already banned.`)
    await member.ban({reason: `${message.author.tag} banned due to ${reason}`}).then(async()=> {
   // user.send("You got banned from " + message.guild.name + "by " + message.author.tag + " due to " + reason)
     let guild = await modlog.findOne({ guild: member.guild.id })
      if (guild) {
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
				})
     message.channel.send(`${client.emotes.succes} | Banned **${member.user.tag}** for ${reason} [\`#${guild.moderations.length}\`]`)
     if (!guild.log.channel) return;
     const channel = message.guild.channels.cache.get(guild.log.channel)
     if (!channel) return;
     const embed = new d.MessageEmbed()//let embed bok better
    .setColor(client.color)
    .setAuthor("Ban | Case #" + guild.moderations.length, message.guild.iconURL())//"478587347")
    .addField("User", user.tag, true)
    .addField("Moderator", message.author.tag, true)
    .addField("Reason", reason, true)
  //  .setAuthor(user.tag + " banned", user.avatarURL({ dynamic: true }) || user.defaultAvatarURL)
      channel.send(embed)
    }
                                                                                    
     /*     const embed = new d.MessageEmbed()//let embed bok better
    .setColor(client.color)
    .setTitle("Ban | Case #" + Math.floor(Math.random() * 10000) + 1000)//"478587347")
    .addField("User", user.tag, true)
    .addField("Moderator", message.author.tag, true)
    .addField("Reason", reason, true)
    .setAuthor(user.tag, user.avatarURL({ dynamic: true }))
      log.send(embed)*/
      });
    },
};