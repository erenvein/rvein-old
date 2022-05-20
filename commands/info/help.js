const d = require("discord.js");
//const p = require("discord.js-pagination");
const guildmodel = require("../../models/Guild.js")
module.exports = {
  name: "help",
  category: "info",
  userperm: "",
  botperm: "",
  aliases: [],
  guild: false,
  usage: "help [command]",
  description: "Shows commands, useful links, or command help",  
  run: async (client, message, args) => { 
   let prefix = client.prefix
   if (message.guild) {
   let guild = await guildmodel.findOne({ guild: message.guild.id })
   prefix = guild ? guild.prefix || client.prefix : client.prefix
   }
    /*await message.channel.send(`1 - mal arda`)
    try {
    let test = await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 10000 })
    if (test.first().content == "1") {

      message.channel.send("mal arda")}
  } catch (e) {
  
  }*/
 let e = new d.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL() || client.user.defaultAvatarURL())
    .addField("Commands", "You can see all commands to write `" + prefix + "commands`")
    .addField("Prefix", `Current prefix of ${message.guild ? `${message.guild.name}` : `${client.user.username}`} is \`${prefix}\`\nTo execute commands, first write the prefix and then the command, example: \`${prefix}invite\``)
    .addField("Useful Links", `**Invite Rvein** https://bit.ly/invrvein\n**Support server** https://bit.ly/rveinserver\n**Vote Rvein** https://bit.ly/votervein`)
    .setColor(client.color)
     message.author.send(e).catch(me => message.channel.send(e))
     if (message.guild) message.reply(`Check your DM's`)
   },
  };