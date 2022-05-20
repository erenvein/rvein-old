const model = require("../../models/Guild");
const d = require("discord.js")//sjdiscordjdiscordsjdis
module.exports = {
  name: "reactrole",
  category: "admin",
  userperm: "MANAGE_ROLES",
  botperm: "",
  status: false,
  aliases: ["rr"],
  usage: "rr create <channel> <msgid> <emoji> <role>",
  guild: true,
  description: "",
  run: async (client, message, args) => {
  if (!args[0]) return message.reply("missing arguments (use help rr to get usage)")
  if (args[0] == "create") {
  if (!args[1]) return message.reply("missing arguments (use help rr to get usage)")
  if (!args[2]) return message.reply("missing arguments (use help rr to get usage)")
  if (!args[3]) return message.reply("missing arguments (use help rr to get usage)")
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name == args[1])
  if (!channel) return message.reply("I could not find a channel to create rr (use help rr to get usage)")
   if (channel.type ==! "text") return message.reply()
    channel.messages.fetch().then(async messages => {
    let msg = messages.find(m => m.id == parseInt(args[2]))
  if (!msg) return message.reply("I could not find a message to create rr (use help rr to get usage)")
    let emoji = d.Util.parseEmoji(args[3]) || client.emojis.cache.get(args[3]) || client.emojis.cache.find(e => e.name == args[3])
  if (!emoji) return message.reply("I could not find emoji to create rr (use help rr to get usage)")
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name == args.slice(4).join(" ")) || message.guild.roles.cache.get(args[3])
  if (!role) return message.reply("I could not find a role to create rr (use help rr to get usage)")
    let mongo = await model.findOne({ guild: message.guild.id })
    if (!mongo) {
     let saved = new model({
       $push: { rr: { msg: msg.id, role: role.id, emoji: emoji.id | emoji.name, channel: channel.id } } 

       })
     saved.save()
    } else {
      if (mongo.rr) {
        if (mongo.rr.msg) return message.reply(client.emotes.fail + ` | You can't add reaction roles more than 20. That guild reached max.`)
        }
      await mongo.updateOne({
       $push: { rr: { msg: msg.id, role: role.id, emoji: emoji.id | emoji.name, channel: channel.id } } 
     })
      }
      message.reply("Got it.")
     msg.react(emoji.id || emoji.name)
   });
  };
  },
  };//mongodb çokzel ki noobuz noob olmasak neler yapcz*/