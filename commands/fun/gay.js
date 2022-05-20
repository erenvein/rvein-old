/*const f = require("node-fetch")
module.exports = {
  name: "gay",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: ["gae"],
  usage: "gay [user]",
  guild: false,
  description: "Avatars going to be gay 😳",
  run: async (client, message, args, mentionuser) => {
    let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" ")) || message.author
    let res = `https://api.alexflipnote.dev/filter/gay?image=${user.avatarURL({ format: "png", size: 1024 })}`
    const file = new (require("discord.js")).MessageAttachment(res, 'gay.png')
    message.channel.send(file)    
    },
};*/
