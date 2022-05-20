const Discord = require("discord.js");
const emo = require("../../models/Guild");
module.exports = {
  name: "unmute",
  category: "mod",
  userperm: "MANAGE_ROLES",
  botperm: "MANAGE_CHANNELS",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  description: "Unmutes a member with optional reason in server",
  run: async (client, message, args, mentionuser) => {
 if (!args[0]) return message.reply(client.errors.args)
 let u = message.guild.member(mentionuser) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]) || message.guild.members.cache.find(m => m.user.tag == args[0]) || message.guild.members.cache.find(m => m.user.tag.includes(args[0]))
 if (!u) return message.reply(client.errors.args)
 let reason = args.slice(1).join(" ") || "N/A"
 if (message.author.id ==! message.guild.owner.id){
 if (u.roles.highest.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
 if (u.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)}
  let role = message.guild.roles.cache.find(r => r.name.toLowerCase() == "muted")
   if (!role) return message.reply("no muted role? uh oh")
    if (!u.roles.cache.find(r => r.name.toLowerCase() == "muted")) return message.reply("that member already not muted?")
  await u.roles.remove(role).then(async() => {
   // u.send(`You got unmuted due to ${reason} by ${message.author.tag} in ${message.guild.name}`)
  let db = await emo.findOne({ guild: message.guild.id })
   if (db) {
     await db.updateOne({
					$push: {
						moderations: {
							kick: {
								user: u.id,
								mod: message.author.id,
								reason: reason,
								case_id: db.moderations.length
							}
						}
					}
				})
    message.channel.send(`${client.emotes.succes} | Un-muted **${u.user.tag}** [\`#${db.moderations.length}\`]`)
  if (!db) return;
  if (db.channel) {
  const embed = new Discord.MessageEmbed()
    .setColor(client.color)
    .setTimestamp()
    .setAuthor(`Unmute | Case #${db.moderations.length}`, message.guild.iconURL())
    .addField('User', `${u.user.tag}`, true)
    .addField('Moderator', `${message.author}`, true)
      .addField('Reason', reason, true)
  .setFooter(`User ID: ${u.user.id}`)
  message.guild.channels.cache.get(db.log.channel).send(embed)
};
   }
  })
  },
}