/*const f = require("node-fetch")
module.exports = {
  name: "invert",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: [],
  usage: "invert [user]",
  guild: false,
  description: "Avatars going to be inverted",
  run: async (client, message, args, mentionuser) => {
    let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" ")) || message.author
    let res = `https://api.alexflipnote.dev/filter/invert?image=${user.avatarURL({ format: "png", size: 1024 })}`
    const file = new (require("discord.js")).MessageAttachment(res, 'ga.png')
    message.channel.send(file)    
    },
};*/