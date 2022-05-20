const huma = require("humanize-duration")
const Discord = require('discord.js')
//const moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {//aa unuttm orayı
client.on("messageUpdate", async (oldMessage, newMessage) => {
  let message = newMessage
let prefix = client.prefix
  if (message.guild) {
    await modlog.findOne({ guild: message.guild.id }, (db, err) => {
      if (!db) return;
      prefix = db.prefix || client.prefix
      });//| client.prefix
 }
    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const prefixRegex = new RegExp(`^(<@!?643881402227621898>|${escapeRegex(prefix)})\\s*`);
	if (!prefixRegex.test(message.content)) return;
  const [, matchedPrefix] = message.content.match(prefixRegex)
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)
  //const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (message.content == "<@643881402227621898>") return message.channel.send(`Hey ${message.author.toString()}`)
 //let prefix = "a."
   let mentionuser = message.mentions.users.first() //|| client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
  if (message.content.startsWith("<@643881402227621898>")){
  prefix = "<@643881402227621898>"
  mentionuser= message.mentions.users.map(u => u)[1] //|| client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
    }
  if (message.content.startsWith("<@!643881402227621898>")) {//a.ev message.channel.send(//<@${client.owner[0]}><@${client.owner[1]}>).then(m => message.channel.send(m.mentions.users.map(u => u)[0].id))
  prefix = "<@!643881402227621898>"
  mentionuser = message.mentions.users.map(u =>u)[1]// || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username == args.join(" ")) || client.users.cache.find(u => u.tag == args.join(" "))
  }
    //	const [, matchedPrefix] = message.content.match(prefixRegex);
	//gs = message.content.slice(matchedPrefix.length).trim().split(/ +/);
if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return
  const cmd = args.shift().toLowerCase();
 if (cmd.length === 0) return;
 let command = client.commands.get(cmd);
 if (!command) command = client.commands.get(client.aliases.get(cmd));
if (command) {
  if (command.guild == true) {
       if (!message.guild) return message.reply(`This command is cant be used in private channels`)//ingilizcetyyynaslolckne sokm
  }
  if (command.category == "nsfw") {
    if (message.channel.nsfw == false) return message.reply("This command is can be used in only nsfw channels.")
  }
  if (command.category == "owner") {
    if (!client.owner.includes(message.author.id)) return
  }
   if (command.botperm) {
    if (!message.guild.me.permissions.has([command.botperm])) return message.channel.send(`${client.emotes.fail} | I am missing one or more of the following permissions:\n\`${command.botperm.length >= 2 ? command.botperm.join(", ") : command.botperm}\``)//\`${command.botperm}\` permissions to do that.`)
  }
      if (!client.owner.includes(message.author.id)) {
  if (command.status == false) return message.reply(client.emotes.fail + ` | This command is can't be used for now.`)
  if (command.userperm) {
    if (!message.member.permissions.has([command.userperm])) return message.channel.send(`${client.emotes.fail} | You are missing one or more of the following permissions:\n\`${command.userperm.length >= 2 ? command.userperm.join(", ") : command.userperm}\``)//\`${command.userperm}\` permissions to do that.`)
  }
      }
  command.run(client, message, args, mentionuser)
}
  });
  
client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (!newMessage.guild) return;
  modlog.findOne({
    guild: newMessage.guild.id
  }, (err, db) => {
    if (err) return;
    if (!db) return;
    if (!db.log) return;
    if (!db.log.channel) return;
    let channel = newMessage.guild.channels.cache.get(db.log.channel)
   if (!channel) return;
    if (newMessage.author.bot) return;
    if (newMessage.content == oldMessage.content) return;
    const em = new Discord.MessageEmbed()//direkt message alsak
    .setColor(client.logcolor)
    .setAuthor(newMessage.author.tag, newMessage.author.avatarURL({dynamic: true}) || newMessage.author.defaultAvatarURL)
    .setTitle(`Message edited in #${newMessage.channel.name}`)
    .setDescription(`**Before** ${oldMessage.content}\n**After** ${newMessage.content}`)
    .setFooter(`ID: ` + newMessage.id)
    .setTimestamp()
    channel.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          channel.createWebhook(`${client.user.username} Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new Discord.WebhookClient(webhook.id, webhook.token);      
          webhookClient.send({
            username: `${client.user.username} Logging`,
            avatarURL: client.user.avatarURL(),
            embeds: [em],
          })
         })
        } else  {
          s.send({   username: `${client.user.username} Logging`,
          avatarURL: client.user.avatarURL(),
          embeds: [em],
        })
        }
        })

  }) 
})
 
}
