const model = require("../../models/Guild")
const D = require('discord.js')
module.exports = {
  name: "blacklist",
  category: "owner",
  userperm: "",
  botperm: "",
  aliases: [],
  usage: "blacklist <guildid>",
  guild: true,
  sub: "user, ruser, rguild, guild",
  description: "",
  run: async (client, message, args, mentionuser) => {
  let guild = client.guilds.cache.get(args[1])
  let user = mentionuser || client.users.cache.get(args[1])
  let reason = args.slice(2).join(' ')
  if (args[0] == "rguild") {
  const f = await model.findOne({
     guild: guild.id
       })
     if (!f) return message.reply("this guild already not blacklisted.")
  if (f.bl.d == false) return message.reply("this guild already not blacklisted.")
      await f.updateOne({ "bl.d": false })
      message.channel.send(client.emotes.succes + " | `" + guild.name+ "` is un-blacklisted.")
  }
  if (args[0] == "guild") {
     const modelu = require("../../models/Guild")
     const f = await modelu.findOne({ guild: guild.id})
    if (f) {
     if  (f.bl) {
       if (f.bl.d == true) return message.reply("That guild already blacklisted for `" + f.bl.rea +"`")
     await f.updateOne({ "bl.d": true, "bl.rea": args.slice(2).join(" ") }).then(() => message.reply(client.emotes.succes + ` | \`${client.users.cache.get(args[1]).tag}\` is blacklisted for \`${args.slice(2).join(" ")}\``))
     }
      } else {
          await new modelu({ guild: guild.id, "bl.d": true, "bl.rea": args.slice(2).join(" ")})
return  message.channel.send(client.emotes.succes + " | `" +guild.name+" is blacklisted for `" + reason + "`")
  }
    }
         const modelu = require("../../models/User")
    if (args[0] == "user") {
     const modelu = require("../../models/User")
     const f = await modelu.findOne({ user: user.id })
    if (f) {
     if  (f.bl) {
       if (f.bl.d == true) return message.reply("That user is already not blacklisted for `" + f.bl.rea +"`")
     await f.updateOne({ "bl.d": true, "bl.rea": reason }).then(() => message.reply(client.emotes.succes + ` | \`${client.users.cache.get(args[1]).tag}\` is blacklisted for \`${reason}\``))
     }
      } else {
          await new modelu({ guild: guild.id, "bl.d": true, "bl.rea": args.slice(2).join(" ")})
return  message.channel.send(client.emotes.succes + " | `" +guild.name+" is blacklisted for `" + reason + "`")
  }        
    }
      if (args[0] == "ruser") {
     const f = await modelu.findOne({
     user: user.id
       })
     if (!f) return message.reply("this user already not blacklisted.")
  if (f.bl.d == false) return message.reply("this user already not blacklisted.")
      await f.updateOne({ "bl.d": false })
      message.channel.send(client.emotes.succes + " | `" + user.tag + "` is un-blacklisted.")
  }
    if (!args[1]) return message.channel.send(client.emotes.fail + " | Missing argument")
  }
}