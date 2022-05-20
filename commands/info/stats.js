const D = require("discord.js")
const fs = require("fs")
const mongoose = require('mongoose')
const os = require('os');
//const fetch = require("node-fetch")
//const pr = require('pretty-bytes');

module.exports = {
  name: "stats",
  category: "info",
  userperm: "",
  botperm: "EMBED_LINKS",
  aliases: [],
  guild: false,
  status: false,
  description: 
 "Gets Bot stats",
  run: async (client, message, args) => {
let usg = process.memoryUsage().heapUsed;
  let e = new D.MessageEmbed()
  .setAuthor(`${client.user.username}`, client.user.avatarURL() || client.user.defaultAvatarURL)//message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL, `${client.user.username} BOT Info`)
  .setColor(client.color)
  //.setThumbnail(client.user.avatarURL())
   // .setDescription(`\`Guilds\` ${client.guilds.cache.size}\n\`Users\` ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)
  
 // .addField("Guilds | Users", `${client.guilds.cache.size} | ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
 // .addField("Uptime", require("humanize-duration")(client.uptime), true)
//  .addField("RAM", pr(usg) , true)
 // .addField("Free Mem", `${process.memoryUsage().heapTotal / 1024 / 1024}}`, true)
  .addField("Ping", client.ws.ping+" ms", true)
  .setFooter(`Load Avg - ${os.loadavg().map((annen) => annen.toFixed(2)).join(", ")}`)
  message.channel.send(e)
  },
};