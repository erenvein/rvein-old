const Discord = require("discord.js");
const ms = require("ms");
const model = require("../../models/Guild");
const humanizeDuration = require("humanize-duration");
module.exports = {
  name: "tempmute",
  category: "mod",
  userperm: "MANAGE_ROLES",
  botperm: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  aliases: ["timedmute"],
  guild: true,
  description: "",
  run: async (client, message, args) => {
  let guild = await model.findOne({ guild: message.guild.id })
  if (!args[0]) return message.reply("Member is required. Usage: guild." + guild.prefix || client.prefix + "tempmute <member> <time> <reason>")
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(m => m.username == args.join(" ")) || client.users.cache.find(m => m.tag == args.join(" ")) || client.users.cache.find(m => m.username.includes(args.join(" "))) || client.users.cache.find(m => m.tag.includes(args.join(" "))) || message.author
let member = message.guild.member(user.id)
  if (!member) return message.reply("I couldnt find that user")
  let time = ms(args[1])
  if (!time) return message.reply("You must give gth) to use tempmute")
       if (!message.guild.me.permissions.has("MANAGE_ROLES")) return message.channel.send("I don't have enough permissions to do that.");
       if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("You don't have enough permissions to do that.")
    if (message.author.id ==! message.guild.owner.id) { 
  if (message.member.roles.highest.position <= member.roles.highest.position) return message.reply(`You are not high enough in the role hierarchy to do that.`)
  };
  if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(`I am not high enough in the role hierarchy to do that.`)
  let reason = args.slice(2).join(" ") || "N/A"
  let muterole = message.guild.roles.cache.find(r => r.name.toLowerCase() === `muted`)
  if (member.roles.cache.find(r => r.name.toLowerCase() == "muted")) return message.reply('Member is already muted.')
  if(!muterole){
    let s = message.member.roles.highest.position <= message.guild.me.roles.highest.position ? message.memberoles.highroles.est.position - 1 : message.guild.me.roles.highest.position - 1
      muterole = await message.guild.roles.create({
       data: {
        name: `Muted`,
        color: "#4c6876",
        permissions:[],
        position: s
       },
       reason: "New Muted Role."
      });
  };
      message.guild.channels.cache.forEach(async channel => {
        await channel.createOverwite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SEND_TTS_MESSAGES: false,
          ATTACH_FILES: false,
          SPEAK: false
        });
      });
  await member.roles.add(muterole).then(async() => {
  message.channel.send(`${client.emotes.succes} | Muted **${member.user.tag}** for ${humanizeDuration(time)} [\`#${guild.moderations.length}\`]`)
    //member.send(`You got muted for ${humanizeDuration(time)} due to ${reason} by ${message.author.tag}`)
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
     //message.channel.send(`${client.emotes.succes} | Banned ${member} [#\`${guild.moderations.length}\`]`)
    if (!guild.log) return;
        const embed = new Discord.MessageEmbed()
    .setColor(client.color)
    .setTimestamp()
    .setAuthor(`Tempmute | Case #` + guild.moderations.length, message.guild.iconURL())
    .setDescription(`**User** ${member.user.tag}\n**Duration** ${humanizeDuration(time)}\n**Reason** ${reason}\n**Responsible Moderator** ${message.author.tag}`)
    .setFooter(`User ID: ${member.user.id}`)
  let s = message.guild.channels.cache.get(guild.log.channel)
   if (s) s.send(embed)
      };  
  });
    setTimeout(function() {
 member.roles.remove(muterole).then(() => {
    // member.send(`You have been unmuted from ${message.guild.name}`)
      if (guild) {
        if (!guild.log) return;
        if (!guild.log.channel) return;
        const logg = new Discord.MessageEmbed()
        .setColor(client.color)
        .setTimestamp()
        .setAuthor(`${member.user.tag} | unmute`)
        .setDescription(`**User** ${member.user.tag}\n**Reason** Automatic unmute from mute made ${humanizeDuration(time)} ago by ${message.author.tag}\n**Responsible Moderator** ${message.author.tag}`)
        .setFooter(`User ID: ${member.user.id}`)
   let s = message.guild.channels.cache.get(guild.log.channel)
          if (s) s.send(logg)
      }
    });
  }, time);

},
};