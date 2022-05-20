/*const f = require("node-fetch")
module.exports = {
  name: "pixelate",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: ["pixel"],
  usage: "pixelate [user]",
  guild: false,
  description: "Avatars going to be 144p",
  run: async (client, message, args, mentionuser) => {
    let user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" ")) || message.author
    let res = `https://api.alexflipnote.dev/filter/pixelate?image=${user.avatarURL({ format: "png", size: 1024 })}`
    const file = new (require("discord.js")).MessageAttachment(res, 'pixelate.png')
    message.channel.send(file)    
    },
};
*/