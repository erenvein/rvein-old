/*const fetch = require('node-fetch')
const d = require('discord.js')
const DBL = require("dblapi.js");
const os = require("os")

module.exports = {
  name: "httpcat",
  category: "utility",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "pokedex <pokemon>",
  guild: false,
  description: "Sends httpcats",
  run: async (client, message, args) => {
  let cat = args.join(' ')
  if (!cat) return message.channel.send(`${client.emotes.fail} You didnt provide me a status`)
  const r = `https://http.cat/${cat}`
  const dobedo = new d.MessageAttachment(r, 'cat.png')
    message.channel.send(dobedo)
                },
};*/