const huma = require("humanize-duration")
const Discord = require('discord.js')
//const moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {
client.on("messageDelete", message => {
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
    if (message.author.bot) return;
   const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(audit => audit.entries.first());
    const m = channel.guild.member(entry.executor)
   let a = "p"
    if (entry.target.id == message.author.id) {
      a = m.user.tag
          };
    const em = new Discord.MessageEmbed()
    .setColor(client.logcolor)
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }) || message.author.defaultAvatarURL)
    .setDescription(`${message || "No content"}`)
    .setTitle(`Message deleted in #${message.channel.name} ${a == "p" ? `` : `by ${a}`}`)
    .setFooter(`ID: ${message.id}`)
    .setTimestamp()
    if (message.attachments) {
      if (message.attachments.first()) {
        em.addField(`Attachments`, message.attachments.map(a => `[${a.name}](${a.url})`).join("\n"))
        }
      }
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
