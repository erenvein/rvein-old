const d = require('discord.js')
module.exports = {
  name: "ping",
  category: "info",
  botperm: "EMBED_LINKS",
  userperm: "",
  cooldown: {},
  aliases: ["ws", "latency", "ms"],
  guild: false,
  description: "Shows Bot Response delay and Websocket latency",
  run: async (client, message, args) => {
    await message.channel.send("** **").then(sent => {
 
   sent.edit(`Api latency is ${client.ws.ping}ms, RTT: ${Date.now() - sent.createdAt}ms`)
             })
  },
};