const Discord = require("discord.js")
const huma = require("humanize-duration")
//const moment = require("moment")
const welcome = require("../../models/Guild")
module.exports = client => {
  client.on("guildMemberRemove", async m => {
      let db = await welcome.findOne({ guild: m.guild.id })
      if (db) {
      if (db.log) {
      if (db.log.channel) {
      let channel = m.guild.channels.cache.get(db.log.channel)
      if (channel) {
      let e = new Discord.MessageEmbed()
      .setAuthor(`Member "${m.user.tag}" left`, m.user.avatarURL({dynamic: true}) || m.user.defaultAvatarURL)
      .setColor(client.color)
      .setDescription(`**Member** ${m.user.tag}\n**Created** ${huma(Date.now() - m.user.createdTimestamp)}`)
      .setThumbnail(m.user.avatarURL({dynamic:true}) || m.user.defaultAvatarURL)
      .setFooter(`ID: ${m.id}`)
      .setTimestamp()
      if (!channel.guild.me.permissions.has("MANAGE_WEBHOOKS"))
          return channel.send(e);
        channel.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          channel.createWebhook(`${client.user.username} | Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new Discord.WebhookClient(webhook.id, webhook.token);      
          webhookClient.send({
            username: `${client.user.username} | Logging`,
            avatarURL: client.user.avatarURL(),
            embeds: [e],
          })
    })
          }
        })
        }}}}
   });
  };