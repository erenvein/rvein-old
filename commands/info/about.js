const D = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
module.exports = {
  name: "about",
  category: "info",
  userperm: "",
  botperm: "EMBED_LINKS",
  aliases: [],
  guild: false,
  description: "Sends info about Bot",
  run: async (client, message, args) => {
  //  let fetch = require("node-fetch")
  //  let ress = `https://top.gg/api/widget/683366408092254275.png?topcolor=5D00FF&middlecolor=4f219E&datacolor=260263`
   // let res =  new D.MessageAttachment(`https://top.gg/api/widget/${client.user.id}.png?topcolor=5D00FF&middlecolor=4f219E&datacolor=260263`, "topgg.png")
  let e = new D.MessageEmbed()
  .setAuthor(`${client.user.username}`, client.user.avatarURL())//message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL, `${client.user.username} BOT Info`)
  .setColor(client.color)
  .setThumbnail(client.user.avatarURL())
  .addField("Creators", `${client.users.cache.get(client.owner[0]).tag}\n${client.users.cache.get(client.owner[1]).tag}`)
//  .addField(`Made with`, `[node.js](https://nodejs.org/) v${process.versions.node} [discord.js](https://discord.js.org/) v${D.version}`)//dha gzl foo mal ole olsn istym tera no discord.jsyi
 
  .addField("Stats", `${client.guilds.cache.size} Servers\n${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Users`)
  .addField(`Tags`, `Polls, Utility, Moderation, Fun, Meme, Pokemon, Welcomes, Autoroles & Autobotroles, Logging, Suggestions, Information`)
 // .setImage(ress)
  .addField(`Useful urls`, `[Invite](http://gg.gg/aaro-n) | [Support Server](https://discord.gg/zDVbjcK)`)                                  
  
  .setFooter(`Made with v${D.version} discord.js`)
  message.channel.send(e)
  },
};