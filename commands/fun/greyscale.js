const D = require("discord.js")
module.exports = {
  name: "greyscale",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: [],
  usage: "greyscale [user]",
  guild: false,
  description: "Greyscale effect on avatars",
  run: async (client, message, args, mentionuser) => {
 let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" ")) || message.author
   
  let res = `https://api.alexflipnote.dev/filter/b&w?image=${user.avatarURL({ format: "png", size: 1024 })}`
   let file = new D.MessageAttachment(res, "greyscale.png")
   message.channel.send(file)
  
    },
};