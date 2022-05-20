const modlog = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
  name: "unban",
  category: "mod",
  userperm: "BAN_MEMBERS",
  botperm: "BAN_MEMBERS",
  aliases: [],
  guild: true,
  description: "Unbans a member with optional reason in server", //whether or not the member is in the server",
  run: async (client, message, args) => {
    if (!args) return message.reply(client.errors.args+" a user.")
    let user = message.mentions.users.first() || client.users.cache.find(u => u.username  == args[0]) || client.users.cache.get(args[0])
    if (!user) return message.reply(client.errors.args+" a user.")//there's a user but i cant find")
    if (message.author.id == user.id) return message.reply("You are not high enough in the role hierarcy to do that.")
    if (user.id == message.guild.owner.id) return message.reply("You are not high enough in the role hierarchy to do that.")
    let reason = args.slice(1).join(" ")
    if (!reason) reason = "N/A"
   let a = await message.guild.fetchBans()
   if (!a.find(u => u.id == user.id)) return message.reply(client.emotes.fail + ` | The user isnt banned already.`)
   await message.guild.members.unban(user, reason).then(async() => {
    user.send("You got unbanned from " + message.guild.name + "by " + message.author.tag + " due to " + reason)
     message.reply(`You unbanned ${user.tag} due to ${reason}`)
  let guild = await modlog.findOne({ guild: message.guild.id })
     await guild.updateOne({
					$push: {
						moderations: {
							kick: {
								user: user.id,
								mod: message.author.id,
								reason: reason,
								case_id: guild.moderations.length
							}
						}
					}
				})
     modlog.findOne({
    guild: message.guild.id
  }, (err, db) => {
      
     if (!db.log.channel) return;
     const channel = message.guild.channels.cache.get(db.log.channel)
     if (!channel) return;
     const embed = new d.MessageEmbed()//let embed bok better
    .setColor(client.color)
    .setTitle(`${user.tag} | Unban Case #` + guild.moderations.length)//"478587347")
    .addField("User", user.tag, true)
    .addField("Moderator", message.author.tag, true)
    .addField("Reason", reason, true)
     .setAuthor(user.tag + " got unbanned", user.avatarURL({ dynamic: true }) || user.defaultAvatarURL)
      channel.send(embed)
    })
                                                                                    
})
    },
};