const d = require('discord.js')
module.exports = {
  name: "modules",
  category: "info",
  botperm: "EMBED_LINKS",
  userperm: "",
  cooldown: { user: 5 },
  aliases: [],
  guild: false,
  description: "Shows Bot Response delay and Websocket latency",
  run: async (client, message, args) => {
    let enabled = "<:enableonx:740934189108428890><:enableont:740934377470558261>"
    let disabled = "<:disableonx:740934555036287097><:disableont:740934971375616020>"
    const model = require("../../models/Guild")
    const guild = await model.findOne({ guild: message.guild.id })
   
    let embed = new d.MessageEmbed()
    .setColor(client.color)
    .setDescription(`**Autorole:**\n → ${guild.autoroles.human ? enabled : disabled}\n**Welcomes:**\n→ Message: ${guild.welcome.msg ? guild.welcome.msg : "Not set yet"}\n→ Channel: ${guild.welcome.channel ? message.guild.channels.cache.get(guild.welcome.channel) : "Not set yet"}`)
    message.channel.send(embed)
  },
};