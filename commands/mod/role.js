const D = require("discord.js");
module.exports = {
  name: "role",
  category: "mod",
  userperm: "MANAGE_ROLES",
  botperm: "MANAGE_ROLES",
  aliases: [],
  cooldown: { guild: 15000},
  sub: ["role <member> <role>", "role add <user> <role>", "role remove <user> <role>", "role info <role>", "role create <name> [color] [mentionable=False] [hoist=False] [position=0] [reason]", "role delete <role>", "role color <role> <color|reset>", "role name <role> <name>", "role hoist <role> <true|false>", "role mentionable <role> <true|false>", "role position <role> <position>"],
  usage: "role",
  //status: false,
  guild: true,
  description: "Adds/removes role from/to a user",
  run: async (client, message, args, mentionuser) => {
  if (!args[0]) return message.reply(client.errors.args)
    let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find( u=> u.tag == args[0]) || client.users.cache.find(u => u.username == args[0])
  let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[1]) || /*client.users.cache.find( u=> u.tag == args[21]) || */ message.guild.roles.cache.find(r => r.name == args.slice(1).join(" ")) || message.guild.roles.cache.find(r => r.name.includes(args.slice(1).join(" ")))
  /*if (args[0] == "bots") {
  if (!role) return message.reply("missing arguments. You need type a role after a.role bots")
  if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
    let d = message.guild.members.cache.filter(m => m.user.bot).filter(m => !m.roles.cache.find(r => r.name == role.name)).size
  if (d == 0) return message.reply(client.emotes.fail + " | Could not added `" + role.name + "` to any bot due to all bots already have this role")
  for (let m of message.guild.members.cache.filter(m => m.user.bot).filter(m => !m.roles.cache.find(r => r.name == role.name))) {
    setTimeout(async() => {
    await m.roles.add(role)
    }, 1000)
    }
     message.reply("Added `" + role.name+ "` to " + d + " bots ")
     } else if (args[0] == "rbots" || args[0] == "removebots") {
     if (!role) return message.reply("missing arguments. You need type a role after a.role rbots")
       if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)

       let d = message.guild.members.cache.filter(m => m.user.bot).filter(m => m.roles.cache.find(r => r.name == role.name)).size
   if (d == 0) return message.reply(client.emotes.fail + " | Could not removed `" + role.name + "` from any bot due to all bots already don't have this role")
  for (let m of message.guild.members.cache.filter(m => m.user.bot).filter(m => m.roles.cache.find(r => r.name == role.name))) {
 await m.roles.remove(role).then(() => {
   setTimeout(() => {
 }, 1500)

    })
    }
     message.reply("Removed `" + role.name+ "` from " + d + " bots ")
     } else if (args[0] == "humans") {
    // let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[1]) || /*client.users.cache.find( u=> u.tag == args[21]) ||  message.guild.roles.cache.find(r => r.name == args[1])
   if (!role) return message.reply("missing arguments. You need type a role after a.role humans")
  if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
   if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
  let d = message.guild.members.cache.filter(m => !m.user.bot).filter(m => !m.roles.cache.find(r => r.name == role.name)).size
  if (d == 0) return message.reply(client.emotes.fail + " | Could not added `" + role.name + "` to any human due to all humans already have this role")
  await message.guild.members.cache.filter(m => !m.user.bot).filter(m => !m.roles.cache.find(r => r.name == role.name)).forEach(m => {
    setInterval(async() => {
 await m.roles.add(role)
              }, 1000)
    })
     message.reply("Added `" + role.name+ "` to " + d + " humans")
     } else if (args[0] == "rhumans" || args[0] == "removehumans") {
     if (!role) return message.reply("missing arguments. You need type a role after a.role rhumans")
       if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
       let d = message.guild.members.cache.filter(m => !m.user.bot).filter(m => m.roles.cache.find(r => r.name == role.name)).size
   if (d == 0) return message.reply(client.emotes.fail + " | Could not removed `" + role.name + "` from any human due to all humans already don't have this role")
  await message.guild.members.cache.filter(m => !m.user.bot).filter(m => m.roles.cache.find(r => r.name == role.name)).forEach(m => {
    setInterval(async() => {
 await m.roles.remove(role)
              }, 1000)
    })
     message.reply("Removed `" + role.name+ "` from " + d + " humans ")
     } else if (args[0] == "all") {
   /*let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[1]) || client.users.cache.find( u=> u.tag == args[21]) || message.guild.roles.cache.find(r => r.name == args[1])
 if (!role) return message.reply("missing arguments. You need type a role after a.role all")
  if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
   if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
  let d = message.guild.members.cache.filter(m => !m.roles.cache.find(r => r.name == role.name)).size
  if (d == 0) return message.reply(client.emotes.fail + " | Could not added `" + role.name + "` to any member due to all members already have this role")
  await message.guild.members.cache.filter(m => m.roles.highest.position < message.guild.me.roles.highest.position).filter(m => !m.roles.cache.find(r => r.name == role.name)).forEach(m => {
    setInterval(async() => {
 await m.roles.add(role)
              }, 1000)
    })
    
      message.reply("Added `" + role.name+ "` to " + d + " members")
     } else if (args[0] == "rall" || args[0] == "removeall") {
     if (!role) return message.reply("missing arguments. You need type a role after a.role rall")
      if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
  let d = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name == role.name)).size
   if (d == 0) return message.reply(client.emotes.fail + " | Could not added `" + role.name + "` to any member due to all members already have this role")
  await message.guild.members.cache.filter(m => m.roles.cache.find(r => r.id == role.id)).forEach(m => {
    setInterval(async() =>{
        m.roles.remove(role)
              }, 1000);
    })//.then(() => {
     message.reply(client.emotes.succes + " | Removed `" + role.name+ "` from " + d + " members")
    
  }*/
       if (args[0] == "add") {
         let user = mentionuser || client.users.cache.get(args[1]) || client.users.cache.find( u=> u.tag == args[1]) || client.users.cache.find(u => u.username == args[1])
  let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[2]) || /*client.users.cache.find( u=> u.tag == args[21]) || */ message.guild.roles.cache.find(r => r.name == args.slice(2).join(" ")) || message.guild.roles.cache.find(r => r.name.includes(args.slice(2).join(" ")))
         if (!role) return message.reply("missing role.")
        if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
         let member = message.guild.member(user)
        if(member.roles.cache.find(r => r.id == role.id)) return message.reply("That user already has this role.")
        await member.roles.add(role).then(() => {
          message.reply(client.emotes.succes + " | Added `" + role.name + "` to `" + user.tag + "`")
          })
         } else if (args[0] == "remove") {
           let user = mentionuser || client.users.cache.get(args[1]) || client.users.cache.find( u=> u.tag == args[1]) || client.users.cache.find(u => u.username == args[1])
  let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[2]) || /*client.users.cache.find( u=> u.tag == args[21]) || */ message.guild.roles.cache.find(r => r.name == args.slice(2).join(" ")) || message.guild.roles.cache.find(r => r.name.includes(args.slice(2).join(" ")))
         if (!role) return message.reply("missing role.")
       if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
 if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)/*es All devices are using Android operating system.*/
           let member = message.guild.member(user)
        if(!member.roles.cache.find(r => r.id == role.id)) return message.reply("That user already has not this role.")
        await member.roles.remove(role).then(() => {
          message.reply(client.emotes.succes + " | Removed `" + role.name + "` to `" + user.tag + "`")
          })
         } else if (args[0] == "color") {
           let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[1]) || /*client.users.cache.find( u=> u.tag == args[21]) || */ message.guild.roles.cache.find(r => r.name == args[0]) || message.guild.roles.cache.find(r => r.name.includes(args[1]))
         if (!role) return message.reply(client.errors.args)
         if (!args[2]) return message.reply(client.emotes.fail + ` | detected no color? if you wanr reset it. type reset insteas of color`)
           if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
           if (args[2] == "reset") {
             await role.setColor(args[2]).then(newRole => {
             message.reply(client.emotes.succes + ` | \`${role.name}\`'s color changed to ${newRole.hexColor}`)
             });
             }
           await role.setColor(args[2]).then(newRole => {
             message.reply(client.emotes.succes + ` | \`${role.name}\`'s color changed to ${newRole.hexColor}`)
             });
           
           } else if (args[0] == "info") {
             const dembe = new D.MessageEmbed()
             .setColor(client.color)
             .setAuthor(`Role "${role.name}" info`, message.author.avatarURL({dynamic: true}) || message.author.defaultAvatarURL)
             .setDescription(`Name \`${role.name}\`\nDisplayed Separately \`${role.hoist}\`\nMentionable \`${role.mentionable}\`\nColor \`${role.hexColor}\`\nMembers \`${role.members.size}\`\nPosition \`${role.rawPosition}/${message.guild.roles.cache.size}\`\nCreated at \`${require("humanize-duration")(Date.now() -role.createdAt)} ago\``)
             .setFooter("ID: " + role.id)
             message.channel.send(dembe)
             
             } else if (args[0] == "delete") {
               if (!role) return message.reply("missing role")
               if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
    
               let rea = args.slice(2).join(" ") 
               if (!rea) rea = "N/A"
               await role.delete({ reason: `Deleted role "${role.name}" due to ${rea} by ${message.author.tag}`}).then(() => {
                message.reply(client.emotes.succes + ` | Deleted role \`${role.name}\` due to \`${rea}\``)
                 })
            } else if (args[0] == "create") {
              let rname = args[1]
              if (!rname) return message.reply(client.errors.args)
              let rcolor = args[2]
              let rm = "false"
              let rh = "false"
              let rp = args[5]
              if (args[3] == true) rm = true
              if (args[4] == true) rm = true
             if (rp >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
            if (rp >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
              await message.guild.roles.create({ 
                data: { 
                  name: rname, 
                  color: rcolor || "#ffffff",
                  mentionable: rm || false,
                  hoist: rh || false,
                  position: rp || 0
                  }, 
                reason: args.slice(5).join(" ") || "N/A"
              }).then(ole => {

                const dembe = new D.MessageEmbed()
             .setColor(client.color)
             .setAuthor(`Created Role "${role.name}"`, message.author.avatarURL({dynamic: true}) || message.author.defaultAvatarURL)
             .setDescription(`Name \`${role.name}\`\nDisplayed Separately \`${role.hoist}\`\nMentionable \`${role.mentionable}\`\nColor \`${role.hexColor}\``/*\nMembers \`${role.members.size}\`\n*/+ `\nPosition \`${role.rawPosition}/${message.guild.roles.cache.size}\``)//\nCreated at \`${require("humanize-duration")(Date.now() -role.createdAt)} ago\``)
             .setFooter("ID: " + role.id)
             message.channel.send(dembe)
              });
              } else if (args[0] == "name") {
                if (!role) return message.reply(client.errors.args)
                if (!args[2]) return message.reply(client.errors.args)//"ops detected it type reset instead color.")
                if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
                await role.setName(args[2]).then(newRole => {
                  message.reply(client.emotes.succes + ` | \`${role.name}\`'s name changed to \`${newRole.name}\``)
                  });
                } else if (args[0] == "hoist") {
                if (!role) return message.reply(client.errors.args)
                if (!args[2]) return message.reply(client.errors.args)//"ops detected it type reset instead color.")
                if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  } 
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
           let s = ["true", "false"]
                if (!s.includes(args[2])) return message.reply(client.emotes.fail + " | the mentionable must be false or true.")
                  if (role.hoist == args[2]) return message.reply(client.emotes.fail + ` | the role's hoist is already ${args[2]}`)
                  await role.setHoist(args[2]).then(newRole => {
                  message.reply(client.emotes.succes + ` | \`${role.name}\`'s hoist changed to \`${newRole.hoist}\``)
                  });
                } else if (args[0] == "mentionable") {
                if (!role) return message.reply(client.errors.args)
                if (!args[2]) return message.reply(client.errors.args)//"ops detected it type reset instead color.")
                if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  } 
        if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
            let s = ["true", "false"]
                if (!s.includes(args[2])) return message.reply(client.emotes.fail + " | the mentionable must be false or true.")
                if (role.mentionable == args[2]) return message.reply(client.emotes.fail + ` | the role's mentionable is already ${args[2]}`)
                  await role.setMentionable(args[2]).then(newRole => {
                  message.reply(client.emotes.succes + ` | \`${role.name}\`'s mentionable changed to \`${newRole.mentionable}\``)
                  });
                } else if (args[0] == "position") {
               let s = args[2]
                if (!role) return message.reply(client.errors.args)
               
                if (!args[2]) return message.reply(client.errors.args)//"ops detected it type reset instead color.")
                if (message.author.id ==! message.guild.owner.id) {
       if (role.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  } 
      if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
      if (message.author.id ==! message.guild.owner.id) {
        if (s >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  } 
        if (s >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
       await role.setPosition(s).then(newRole => {
         message.reply(client.emotes.succes + ` | \`${newRole.name}\`'s position changed to \`${newRole.position}\``)
         });
  }
              
  if (user) {
  let member = message.guild.member(user)
    if (!role) return;
    if (member.roles.highest.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
    if (role.position >= message.member.roles.highest.position) return  message.reply(client.errors.memberRolePosition) //memesmemessamemesmemamemesmeme
    if (member.roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)/*Yes All devices are using Android operating system.*/
    
   if (role.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
   if (user.id == message.guild.owner.id) return message.reply(client.errors.botRolePosition)
                                                              //")
    if (member.roles.cache.find(r => r.id == role.id)) {
    member.roles.remove(role).then(() => {
      message.reply("Removed `" + role.name + "` to `" + user.tag + "`")
      });
      } else {
        member.roles.add(role).then(() => {
      message.reply("Added `" + role.name + "` to `" + user.tag + "`")
        });
        }
  }
  },
};
