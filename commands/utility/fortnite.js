//  const fetch = require('node-fetch')
const d = require('discord.js')
var discord = require('discord.js');
module.exports = {
  name: "fortnite",
  category: "utility",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "fortnite <player>",
  guild: false,
  description: "Sends info about specified fortnite gamer",
  run: async (client, message, args) => {
  let text = args.join(' ')
  if (!text) return message.channel.send(`${client.emotes.fail} You didnt provide me a player`)
  const fnt = require('fortnitetracker-7days-stats');
 
fnt.getStats(text, "pc", (err, result) => {
    if(err){  
        message.channel.send("This player doesnt exists or api error")  // player not found
    }else{
      const embed = new discord.MessageEmbed()
      .setAuthor(result.accountName, result.skinUrl)
      .addField("__**❯ Main information**__", `**Wins:** ${result.wins}\n**Kills:** ${result.kills}\n**Platform:** ${result.platform}\n**Matches:** ${result.matches}`)

      .setColor(client.color)
        message.channel.send(embed);
    }
});   
                },
};