const d = require("discord.js")
module.exports = async client => {
  let m = require("../../models/Guild")
  client.on("channelUpdate", async(oldChannel, newChannel) => {
        let guild = await m.findOne({ guild: newChannel.guild.id })
       if (!guild) return;
      if (!guild.log) return;
           if (oldChannel.topic !== newChannel.topic) {
      let c = newChannel.guild.channels.cache.get(guild.log.channel)
      let type = oldChannel.topic;
      let type1 = newChannel.topic;
      if (type == null) type = "None";
      if (type1 == null) type1 = "None";
      const em = new d.MessageEmbed()
.setColor(client.logcolor)//logcolor vra deişcm
.setAuthor(`#${newChannel.name} topic updated`, newChannel.guild.iconURL())
.addField("Before", `${type}`)
.addField("After", `${type1}`)
.setThumbnail(newChannel.guild.iconURL())
.setFooter(`ID: ${newChannel.id}`)
.setTimestamp()
      if (!c.guild.me.permissions.has("MANAGE_WEBHOOKS"))
          return c.send(em);
        c.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          c.createWebhook(`${client.user.username} Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new d.WebhookClient(webhook.id, webhook.token);      
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
    }
          if (oldChannel.name !== newChannel.name) {
      let c = newChannel.guild.channels.cache.get(guild.log.channel)
      const em = new d.MessageEmbed()
.setColor(client.logcolor)//logcolor vra deişcm
.setAuthor(`#${newChannel.name} name updated`, newChannel.guild.iconURL())
.addField("Before", `${oldChannel.name}`)
.addField("After", `${newChannel.name}`)
.setThumbnail(newChannel.guild.iconURL())
.setFooter(`ID: ${newChannel.id}`)
.setTimestamp()
      if (!c.guild.me.permissions.has("MANAGE_WEBHOOKS"))
          return c.send(em);
        c.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          c.createWebhook(`${client.user.username} Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new d.WebhookClient(webhook.id, webhook.token);      
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
    }
          if (oldChannel.rateLimitPerUser !== newChannel.rateLimitPerUser) {
      let c = newChannel.guild.channels.cache.get(guild.log.channel)
      const em = new d.MessageEmbed()
.setColor(client.logcolor)//logcolor vra deişcm
.setAuthor(`#${newChannel.name} slowmode updated`, newChannel.guild.iconURL())
.addField("Before", `${oldChannel.rateLimitPerUser}`)
.addField("After", `${newChannel.rateLimitPerUser}`)
.setThumbnail(newChannel.guild.iconURL())
.setFooter(`ID: ${newChannel.id}`)
.setTimestamp()
      if (!c.guild.me.permissions.has("MANAGE_WEBHOOKS"))
          return c.send(em);
        c.fetchWebhooks().then(webhooks => {
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          c.createWebhook(`${client.user.username} Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new d.WebhookClient(webhook.id, webhook.token);      
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
    }
  })
}