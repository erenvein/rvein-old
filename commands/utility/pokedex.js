//const fetch = require('node-fetch')
const d = require('discord.js')

module.exports = {
  name: "pokedex",
  category: "utility",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "pokedex [pokemon]",
  guild: false,
  description: "Sends info about specified pokemon",
  run: async (client, message, args) => {
  let pokemon = args.join(' ')
  if (!pokemon) return message.channel.send(`${client.emotes.fail} You didnt provide me a pokemon`)
  const r = await fetch(`https://some-random-api.ml/pokedex?pokemon=${pokemon}`)
  let res = await r.json()
    let name = `${res.name} #${res.id}`
    const embed = new d.MessageEmbed()
    .setAuthor(name, res.sprites.animated)
    .setDescription(`${res.description}\n**HP**: ${res.stats.hp}\n**Attack**: ${res.stats.attack}\n**Defense**: ${res.stats.defense}\n\n**Generation**: ${res.generation}`)
    message.channel.send(embed)
                
                },
};