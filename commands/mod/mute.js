const Discord = require("discord.js");
const emo = require("../../models/Guild");
module.exports = {
  name: "mute",
  category: "mod",
  userperm: "MANAGE_ROLES",
  botperm: "MANAGE_CHANNELS",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  description: "Mutes a member with optional reason in server",
  run: async (client, message, args, mentionuser) => {
 if (!args[0]) return message.reply(client.errors.args)
 let u = message.guild.member(mentionuser) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username == args[0]) || message.guild.members.cache.find(m => m.user.tag == args[0]) || message.guild.members.cache.find(m => m.user.tag.includes(args[0]))
 if (!u) return message.reply(client.errors.args)
 let reason = args.slice(1).join(" ") || "N/A"
 if (u.id == message.guild.owner.id) return message.reply(client.errors.memberRolePosition)
 if (message.author.id ==! message.guild.owner.id)
 if (u.roles.highest.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
 if (u.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
   let role = message.guild.roles.cache.find(r => r.name.toLowerCase() == `muted`)
if (role.position >= message.guild.me.roles.highest.position) return message.reply(`A muted role found but.. i can not reach it.`)
    if (!role) {
  role = await message.guild.roles.create({
      data: {
       name: `Muted`,
       color: "#4c6876",
       permissions:[],
       position: message.member.roles.highest.position - 1
      },
      reason: "New Muted Role."
     });
  }
     await message.guild.channels.cache.forEach(async channel => {
          await channel.updateOverwrite(role, {
          SEND_MESSAGES: false,
          SEND_TTS_MESSAGES: false,
          EMBED_LINKS: false,
          ATTACH_FILES: false,
          ADD_REACTIONS: false,
          SPEAK: false,
          MANAGE_MESSAGES: false,
          MANAGE_CHANNELS: false,
          MANAGE_PERMISSIONS: false
         }) //mayb custom mayb mute role role: String
         })
  if (role.position <= message.member.roles.highest.position - 1) await role.setPosition(message.member.roles.highest.position - 1)
    if (u.roles.cache.find(r => r.id == role)) {
      await role.setPosition(message.member.roles.highest.position - 1)
      return message.reply("That member already muted.")
     }
      await u.roles.add(role).then(async() => {
  message.reply(`You muted \`${u.user.tag}\` due to ${reason}`)
    u.send(`You got muted due to ${reason} by ${message.author.tag} in ${message.guild.name}`)
   })
          const model = require("../../models/Guild")
      const guild = await model.findOne({ guild: message.guild.id })
      await guild.updateOne({
					$push: {
						moderations: {
							kick: {
								user: u.id,
								mod: message.author.id,
								reason: reason,
								case_id: guild.moderations.length
							}
						}
					}
				})
        await emo.findOne({ guild: message.guild.id }, (err, db) => {
  if (err) console.log(err)
  if (!db) {
  if (!db.log) return;
  const embed = new Discord.MessageEmbed()
  .setColor(client.color)
  .setTimestamp()
  .setAuthor(`Mute | Case #` + guild.moderations.length, message.guild.iconURL())
  .setDescription(`**User** ${u.user.tag}\n**Reason** ${reason}\n**Responsible Moderator** ${message.author.tag}`)
  .setFooter(`USER ID: ${u.id}`)
  let s = message.guild.channels.cache.get(db.log.channel)
  if (s) s.send(embed)
    }
     });
          
      
},
};