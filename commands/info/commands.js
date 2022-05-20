const d = require("discord.js");
//const p = require("discord.js-pagination");
//const guildmodel = require("../../models/Guild.js")
module.exports = {
  name: "commands",
  category: "info",
  userperm: "",
  botperm: "",
  aliases: [],
  guild: false,
  usage: "help [command]",
  description: "Shows commands, useful links, or command help",  
  run: async (client, message, args) => { 
  // let prefix = client.prefix
    /*if (message.guild) {
    let guild = await guildmodel.findOne({ guild: message.guild.id })
    prefix = guild.prefix || client.prefix
}
    if (prefix == null) prefix = client.prefix;*/
const embed = new d.MessageEmbed()
   .setAuthor(`${client.user.username}`, client.user.avatarURL())
   .setColor(client.color)
.addField(`Administration [${client.commands.filter(cmd => cmd.category === 'admin').size}]`, `${client.commands.filter(cmd => cmd.category === 'admin').map(cmd => `\`${cmd.name}\``).join(", ")}`)
   .addField(`Moderation [${client.commands.filter(cmd => cmd.category === 'mod').size}]`, `${client.commands.filter(cmd => cmd.category === 'mod').map(cmd => `\`${cmd.name}\``).join(", ")}`)
   .addField(`Utility [${client.commands.filter(cmd => cmd.category === 'utility').size}]`, `${client.commands.filter(cmd => cmd.category === 'utility').map(cmd => `\`${cmd.name}\``).join(", ")}`)
.addField(`Information [${client.commands.filter(cmd => cmd.category === 'info').size}]`, `${client.commands.filter(cmd => cmd.category === 'info').map(cmd => `\`${cmd.name}\``).join(", ")}`) 
.addField(`Music [${client.commands.filter(cmd => cmd.category === 'music').size}]`, `${client.commands.filter(cmd => cmd.category === 'music').map(cmd => `\`${cmd.name}\``).join(", ")}`)
.addField(`Fun [${client.commands.filter(cmd => cmd.category === 'fun').size}]`, `${client.commands.filter(cmd => cmd.category === 'fun').map(cmd => `\`${cmd.name}\``).join(", ")}`)
.setThumbnail(client.user.avatarURL())
        .setTimestamp()
        .addField(`Urls`, `[Invite Bot](http://bit.ly/invrvein) | [Support Server](https://discord.gg/QzzymEw) | [Vote Rvein](https://top.gg/bot/683366408092254275/vote)`)
       // .setFooter(`To command info ${prefix}help <cmd.name>`, message.author.avatarURL)
     message.channel.send(embed);

   },
  };