/*const f = require("node-fetch")
module.exports = {
  name: "sepia",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: [],
  usage: "sepia [user]",
  guild: false,
  description: "Avatars going to be sepia",
  run: async (client, message, args, mentionuser) => {
    let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" ")) || message.author
    let res = `https://api.alexflipnote.dev/filter/sepia?image=${user.avatarURL({ format: "png", size: 1024 })}`
    const file = new (require("discord.js")).MessageAttachment(res, 'sepia.png')
    message.channel.send(file)    
    },
};
*/