const huma = require("humanize-duration")
const Discord = require('discord.js')
//const moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {
client.on("channelCreate", async channel => {
  if (!channel.guild) return;
  modlog.findOne({
    guild: channel.guild.id
  }, async (err, db) => {
    if (err) return;
    if (!db) return;
    if (!db.log) return;
    if (!db.log.channel) return;
    let channels = channel.guild.channels.cache.get(db.log.channel)
   if (!channels) return;
    const entry = await channel.guild.fetchAuditLogs({ type: "CHANNEL_CREATE" }).then(audit => audit.entries.first());
    const m = channel.guild.member(entry.executor)
    const em = new Discord.MessageEmbed()
    .setAuthor(`${channel.type.replace("n", "N").replace("t", "T").replace("v", "V")} Channel "${channel.name}" created by ${m.user.tag}`)
    .setColor(client.logcolor)
    .setDescription(`**Name** ${channel.name}\n**Type** ${channel.type}\n**Category** ${channel.parent || "None"}\n**Position** ${channel.rawPosition}`)
    .setTimestamp()
    .setFooter(`ID: ${channel.id}`)
    if (!channels.guild.me.permissions.has("MANAGE_WEBHOOKS"))
          return channel.send(em);
        channels.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          channels.createWebhook(`${client.user.username} Logging`, { 
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
  };
