/*const dbl = require("dblapi.js");
module.exports = {
  name: "volume",
  category: "music",
  userperm: [],
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  description: "Sets volume of current playing song",
  run: async (client, message, args) => {
    const DBL = new dbl(process.env.DBL, client)
    if (!message.member.voice.channel) return message.reply(client.emotes.fail + ` | You have to join a voice channel to set volume of a music.`)
    let vc = message.member.voice.channel
    if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I don't play any music in this server.`) 
    if (vc ==! message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | You don't listen what i am playing now.`)
    if (!args || isNaN(args[0])) return message.reply(client.emotes.fail + ` | Type a number to set volume of music.`)
    if (!DBL.hasVoted(message.author.id)) {
    if (args[0] > 20) return message.reply(client.emotes.fail + ` | The default volume limit is 20 but if you vote rvein on top.gg you can set volume'til 30.\nthere is url of you can vote to rvein https://bit.ly/votervein`)
  } else {
    if (args[0] > 30) return message.reply(client.emotes.fail + ` | You can't set volume more than 30`)
  }
      if (!message.guild.me.voice.connection) return message.reply(client.emotes.fail + ` | I don't play any music in this server.`) 
    if (!message.guild.me.voice.connection.dispatcher) return message.reply(client.emotes.fail + ` | I don't play any music in this server.`) 
    await message.guild.me.voice.connection.dispatcher.setVolumeLogarithmic(args[0] / 10)
    message.reply(client.emotes.succes + ` | Successfully volume set to ${args[0]}.`)
  },
};
*/