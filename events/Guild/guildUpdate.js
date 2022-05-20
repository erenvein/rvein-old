const d = require("discord.js");
const model = require("../../models/Guild")
module.exports = client => {
client.on("guildUpdate", async (oldGuild, newGuild) => {
const db = await model.findOne({ guild: newGuild.id })
if (!db) return;
if (!db.log) return;
if (!db.log.channel) return;
let channel = client.channels.cache.get(db.log.channel)
if (!channel) return;
let ss = "n"
let o = "n"
let u = "n"
if (oldGuild.name !== newGuild.name) {
ss = "name"
o = oldGuild.name || "none"
u = newGuild.name || "none"
} else if (oldGuild.region !== newGuild.region) {
ss = "region"
o = oldGuild.region || "none"
u = newGuild.region || "none"
} else if (oldGuild.description !== newGuild.description) {
ss = "description"
o = oldGuild.description || "none"
u = newGuild.description || "none"
} else if (oldGuild.afkChannel !== newGuild.afkChannel) {
ss = "afk channel"
o = oldGuild.afkChannel || "none"
u = newGuild.afkChannel || "none "
} else if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
ss = "afk timeout"
o = oldGuild.afkTimeout || "none"
u = newGuild.afkTimeout || "none"
} else if (oldGuild.rulesChannel !== newGuild.rulesChannel) {
ss = "rules channel"
o = oldGuild.rulesChannel || "none"
u = newGuild.rulesChannel || "none"
} else if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
ss = "verification level"
o = oldGuild.verificationLevel || "none"
u = newGuild.verificationLevel || "none"
} else if (oldGuild.verified !== newGuild.verified) {
ss = "verify"
o = oldGuild.verified || "none"
u = newGuild.verified || "none"
} else if (oldGuild.owner !== newGuild.owner) {
ss = "verify"
o = oldGuild.owner.tag || "none"
u = newGuild.owner.tag || "none"
} else if (oldGuild.icon !== newGuild.icon) {
ss = "icon"
} else return;
if (ss == "n") return;
const erne = new d.MessageEmbed()
.setColor(client.logcolor)//logcolor vra deişcm
.setAuthor(`Server ${ss} updated`, newGuild.iconURL())
if (ss !== "icon") erne.setDescription(`Before\n**${ss}**: ${o}\nAfter\n**${ss}**: ${u}`)
if (ss !== "icon") erne.setThumbnail(newGuild.iconURL())
erne.setFooter(`ID: ${newGuild.id}`)
erne.setTimestamp()
if (ss == "icon") erne.setImage(newGuild.iconURL({ size: 1024 }))
 if (!newGuild.me.permissions.has("MANAGE_WEBHOOKS")) return channel.send(erne)
 let webhooks = await channel.fetchWebhooks()
        let s = webhooks.find(webhook => webhook.owner.id == client.user.id)
        if (!s) {
          let webhook = await channel.createWebhook(`${client.user.username} Logging`, { avatar: client.user.avatarURL(), reason: "Needed it" })
            const webhookClient = new d.WebhookClient(webhook.id, webhook.token);      
               webhookClient.send({ username: `${client.user.username} Logging`, avatarURL: client.user.avatarURL(), embeds: [erne] })     
        } else s.send({ username: `${client.user.username} Logging`, avatarURL: client.user.avatarURL(), embeds: [erne] })
  })
  };