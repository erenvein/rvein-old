/*
      let avatar = new d.MessageEmbed()
    .setAuthor(`${user.username}'s avatar`)
    .setColor(client.color)
    .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }))
    .addField("Avatar as", `[png](${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 2048, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 2048, dynamic: true, format: "webp" })})`)
  message.channel.send(avatar)
      }
  },
}; lan bura deil
*/
let d = require("discord.js")
module.exports = {
  name: "avatar",
  category: "utility",
  userperm: "",
  botperms: "",
  usage: "avatar [user]",
  aliases: ["pfp", "pp"],
  guild: false,
  description: "Gives a member's avatar in different formats",
  run: async (client, message, args, mentionuser) => {
    let user = message.author
    if (args[0]) {
      user = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.tag == args.join(" ")) || client.users.cache.find(u => u.username == args.slice(0).join(" ")) || message.author
    } 
    if (!user.avatarURL()) {
      let avatar = new d.MessageEmbed()
      .setAuthor(`${user.username}'s avatar`, user.defaultAvatarURL)
      .setColor(client.color)
      .setImage(user.defaultAvatarURL)
      message.channel.send(avatar)
    } else {
    if (user.avatarURL({ dynamic: true }).endsWith(".gif")) {
          let avatar = new d.MessageEmbed()
    .setAuthor(`${user.tag}'s avatar`, user.avatarURL({ dynamic: true}))
    .setColor(client.color)
    .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "gif" }))
    .addField("Avatar as", `**1024p** [gif](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) | [png](${user.avatarURL({ size: 1024, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, format: "webp" })})\n**2048p** [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) | [png](${user.avatarURL({ size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048})}) | [webp](${user.avatarURL({size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)


  message.channel.send(avatar)
      
    } else {
      let avatar = new d.MessageEmbed()
    .setAuthor(`${user.tag}'s avatar`, user.avatarURL({ dynamic: true}))
    .setColor(client.color)
    .setImage(user.avatarURL({ size: 2048, dynamic: true, format: "png" }))
   .addField("Avatar as", `**1024p**`+ /*[](${user.avatarURL({ size: 1024, dynamic: true, format: "gif"})}) |*/ ` [png](${user.avatarURL({ size: 1024, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 1024, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 1024, dynamic: true, format: "webp" })})\n**2048p**`+/* [gif](${user.avatarURL({dynamic:true, format: "gif", size: 2048})}) |*/` [png](${user.avatarURL({dynamic: true, size: 2048, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 2048, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 2048, format: "webp"})})`)//**4096p** [gif](${user.avatarURL({dynamic: true, size: 4096, format: "gif"})}) | [png](${user.avatarURL({dynamic: true, size: 4096, format: "png"})}) | [jpg](${user.avatarURL({format: "jpg", size: 4096, dynamic: true})}) | [webp](${user.avatarURL({dynamic: true, size: 4096, format: "webp"})})`)

      //.addField("Avatar as", `[png](${user.avatarURL({ size: 2048, dynamic: true, format: "png" })}) | [jpg](${user.avatarURL({ size: 2048, dynamic: true, format: "jpg" })}) | [webp](${user.avatarURL({ size: 2048, dynamic: true, format: "webp" })})`)
  message.channel.send(avatar)
      }
      }
  },
};
