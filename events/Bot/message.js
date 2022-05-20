const Discord = require("discord.js")
let err = require('../../models/Guild')
const u = require("../../models/User")
module.exports = client => { 
  client.on("message", async m => {
    if (client.user.id !== m.author.id) {
    let a = await u.findOne({ user: m.author.id })
    if (a) {
      if (a.afk) {
      await a.updateOne({ afk: "" })
      if (m.guild.me.roles.highest.position > m.member.roles.highest.position) { if (m.guild.me.permissions.has("MANAGE_NICKNAMES")) { await m.member.setNickname(`${m.author.username}`) } }
      m.reply(`Welcome back you are not afk anymore.`)
      }
      } 
  if (m.mentions.users.first()) {
   for (let um of m.mentions.users.map(a=>a)) {
     let p = await u.findOne({ user: um.id })
     if (p) {//ben await seviom
       if (p.afk) m.reply(`${um.tag} is afk due to ${p.afk}`)
  
     }
    }}
        }
    });
client.on("message", async msg => {
  if (!msg.guild) return;     
  if (msg.author.id == client.user.id) return;
  if (client.owner.includes(msg.author.id)) return;
  if (!msg.member) msg.member = msg.guild.member(msg.author)
  if (msg.member.permissions) {
  if (msg.member.permissions.has("MANAGE_MESSAGES")) { 
   client.spammer.delete(msg.author.id)
   }}
  let a = await err.findOne({ guild: msg.guild.id })
  if (!a) return;
  if (!a.automod) return;
  if (a.automod.antispam ==! true) return;
  let gspam = client.spammer.get(msg.author.id)
  let array = { msgs: [] }
  if (gspam) {
  setTimeout(() => {
    gspam.msgs.shift()
    }, 5150);
  if (gspam.msgs.length >= 5) {
  if (gspam.msgs[4].createdTimestamp - gspam.msgs[0].createdTimestamp <= 5100) {
   if (msg.guild.me.permissions.has("MANAGE_MESSAGES")){
     if (msg.channel.permissionsFor(client.user).has("MANAGE_MESSAGES")){
   await gspam.msgs.forEach(async m => await m.delete())}}
   await client.spammer.delete(msg.author.id)
    return msg.reply(`Don't spamming!`)
    } else {
     await client.spammer.delete(msg.author.id)
      }
    } else {
      await gspam.msgs.push(msg)
    }
  } else {
    await client.spammer.set(msg.author.id, array)
    array.push(msg)
    }
  });
client.on("message", async message => {
if (client.owner.indexOf(message.author.id) !== -1) {
  let m = message.content.split(' ')
  let p = client.commands.get(m[0]) || client.commands.get(client.aliases.get(m[0]))
  let aa = m.slice(1)
 
   if (p) p.run(client, message, aa, message.mentions.users.first())
  }
let prefix = client.prefix
/*if(message.guild) {
let guilds = await err.findOne({ guild: message.guild.id })
if (guilds) {
if (guilds.automod) {
  if (!message.member.permissions.has("MANAGE_MESSAGES")) {
if (guilds.automod.enabled === true) {
  const words = guilds.automod.words.some((a => message.content.toLowerCase().split(' ').includes(a)))
  if (message.content.match(/(discord\.(gg|io|me|li)\/.+|discordapp\.com\/invite\/.+)/)) {
   message.delete()
    let a = await message.channel.send("Links are not allowed here").then(m => m.delete({ timeout: 3000 }))
}}}}}}*/
  if (message.guild) {
  await err.findOne({ guild: message.guild.id }, (err, db) => {
 if (!db) return;
    prefix = client.prefix})} // db.prefix
   const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
if (!prefixRegex.test(message.content)) return;
 const [, matchedPrefix] = message.content.match(prefixRegex)
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
    if (message.content == `<@${client.user.id}>`) {
      if (message.guild) {
      let gu = await err.findOne({ guild: message.guild.id })
      if (gu) prefix = gu.prefix}
    return  message.reply(`Prefix is ${prefix}`)
    // return message.channel.send(`Hey ${message.author.toString()}, ${ message.guild ? "this server's prefix is " + gu ? gu.prefix || client.prefix : "rvein's prefix is " + client.prefix`})
      }
   let mentionuser = message.mentions.users.first() //|| client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
  /*  if (message.content.startsWith(`<@${client.user.id}>`)){
  prefix = `<@${client.user.id}>`
  mentionuser= message.mentions.users.map(u => u)[1] //|| client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
    }
  if (message.content.startsWith(`<@!${client.user.id}>`)) {//a.ev message.channel.send(//<@${client.owner[0]}><@${client.owner[1]}>).then(m => message.channel.send(m.mentions.users.map(u => u)[0].id))
  prefix = `<@!${client.user.id}>`
  mentionuser = message.mentions.users.map(u =>u)[1]// || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
  }*/
  const model = require("../../models/Guild")
    if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return
  const cmd = args.shift().toLowerCase();
 if (cmd.length === 0) return;
 if (message.guild) {
  let tags = await err.findOne({ guild: message.guild.id })
  
  if (tags) {
      if (tags.tags) {
if (typeof tags.tags.find((gobr) => gobr.name === cmd) !== "undefined") {
        return message.channel.send(`${tags.tags.find((gobr) => gobr.name === cmd).response}`);
      }
    }
  }
 
 }

   
   let command = client.commands.get(cmd);
 if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    if (command.cooldown) {
    let cooldowns = client.cooldowns
    if (!cooldowns.has(command.name)) {
	cooldowns.set(command.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(command.name);
const cooldownAmount = (command.cooldown.user || 3) * 1000;

if (timestamps.has(message.author.id)) {
	const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	if (now < expirationTime) {
		const timeLeft = (expirationTime - now) / 1000;
		return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
	}
}
    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
   }
      //client.channels.cache.get("753963995605762098").send(`${message.author.tag} used ${command.name}`)
    let dbb = await u.findOne({ user: message.author.id })
         if (dbb) {
      if (dbb.bl) {
         if (dbb.bl.d == true) return message.reply(`You are blacklisted for \`${dbb.bl.rea || "N/A"}\``)
         }
    }
   if (message.guild) {
   let db = await err.findOne({ guild: message.guild.id })
       if (db) {
      if (db.bl) {
         if (db.bl.d == true) return message.reply(`This guild named \`${message.guild.name}\` blacklisted for \`${db.bl.rea || "N/A"}\``)
         }
         }
        }
    if (message.guild) {
    if (!message.guild.me.permissions.has(["SEND_MESSAGES"])) return message.author.send(client.emotes.fail + ` | I am missing one or more of following permissions:\n\`SEND_MESSAGES\`, \`EMBED_LINKS\`, \`ATTACH_FILES\``)
  };
  if (command.guild == true) {
       if (!message.guild) return message.reply(`This command is cant be used in private channels`)//ingilizcetyyynaslolckne sokm
  }
  if (command.category == "nsfw") {
    if (message.channel.nsfw == false) return message.reply("This command is can be used in only nsfw channels.")
  }
  if (command.category == "owner") {
    if (!client.owner.includes(message.author.id)) return
  }
   if (command.botperm) {
    if (!message.guild.me.permissions.has([command.botperm])) return message.channel.send(`${client.emotes.fail} | I am missing one or more of the following permissions:\n\`${command.botperm}\``)//\`${command.botperm}\` permissions to do that.`)
  }
      if (!client.owner.includes(message.author.id)) {
  if (command.status == false) return message.reply(client.emotes.fail + ` | This command is can't be used for now. **Soon**`)
  if (command.userperm) {
    if (!message.member.permissions.has([command.userperm])) return message.channel.send(`${client.emotes.fail} | You are missing one or more of the following permissions:\n\`${command.userperm}\``)//\`${command.userperm}\` permissions to do that.`)
  }
      }
    try {
      const o1 = client.users.cache.get(client.owner[0])
     const o2 = client.users.cache.get(client.owner[1])
  command.run(client, message, args, mentionuser).catch(err => console.log(err) + message.channel.send(client.emotes.fail + ` | Got an error when running \`${cmd}\` command\nError: ${err}`))

  } catch (err) {
     console.log(err)
     message.channel.send(client.emotes.fail + ` | Got an error when running \`${cmd}\` command\nError: ${err}`)
     const o2 = client.users.cache.get(client.owner[1])
     o2.send(err)
    }
}
  
  });
}