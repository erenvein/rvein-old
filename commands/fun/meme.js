/*const f = require('node-fetch');
const d = require('discord.js')

module.exports = {
  name: "meme",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: [],
  guild: false,
  description: "Sends funny memes",
  run: async (client, message, args) => {
    const r = await f('https://some-random-api.ml/meme');
    let e = await r.json()
      const em = new d.MessageEmbed()
      .setTitle(e.caption)
      .setImage(e.image)
      .setColor(client.color)
      message.channel.send(em)
      
  },
};*/