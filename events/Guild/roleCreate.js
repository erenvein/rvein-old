const huma = require("humanize-duration")
const Discord = require('discord.js')
//const moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {
client.on("roleCreate", message => {
  if (!message.guild) return;
  modlog.findOne({
    guild: message.guild.id
  }, async (err, db) => {
    if (err) return;
    if (!db) return;
    if (!db.log) return;
    if (!db.log.channel) return;
    let channel = message.guild.channels.cache.get(db.log.channel)
     if (!channel) return;
    const entry = await channel.guild.fetchAuditLogs({ type: "ROLE_CREATE" }).then(audit => audit.entries.first());
   let m = "m"
    if (entry.target.id == message.id) m = channel.guild.member(entry.executor)
    let role = message
    const em = new Discord.MessageEmbed()
    .setAuthor(`New Role "${role.name}" created${m == "m" ? "" : ` by ${m.user.tag}`}`)
            .setDescription(`**Name** ${role.name}\n**Color** ${role.hexColor}\n**Mentionable** ${role.mentionable}\n**Displayed separately** ${role.hoist}`)
            .setColor(client.color)
            .setTimestamp(role.createdTimestamp)
            .setFooter(`ID: ${role.id}`);
    if (!channel.guild.me.permissions.has("MANAGE_WEBHOOKS")) return channel.send(em)
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
})
}
