const huma = require("humanize-duration")
const Discord = require('discord.js')
//const moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {
client.on("roleDelete", async message => {
  if (!message.guild) return;
let db = await modlog.findOne({
    guild: message.guild.id
  })
    if (!db) return;
    if (!db.log) return;
    if (!db.log.channel) return;
    let channel = message.guild.channels.cache.get(db.log.channel)
   if (!channel) return;
    //if (message.author.bot) return;
   // if (!message.attachments) {
    let role = message
    const em = new Discord.MessageEmbed()
    .setAuthor(`Role "${role.name}" deleted`)
            .setDescription(`**Name** ${role.name}\n**Color** ${role.hexColor}\n**Mentionable** ${role.mentionable}\n**Displayed separately** ${role.hoist}\n**Position** ${role.rawPosition}\n**Created at** ${huma(Date.now() - role.createdTimestamp)} ago\n**Number of people who have a role** ${role.members.size}`)
            .setColor(client.color)
            .setTimestamp(role.createdTimestamp)
            .setFooter(`ID: ${role.id}`)
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
     // }
  }) 

}
