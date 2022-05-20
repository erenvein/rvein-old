//const moment = require("moment")
const huma = require("humanize-duration")
//const { CanvasSenpai } = require("canvas-senpai")
//const canva = new CanvasSenpai();
const Discord = require("discord.js")
const autobotrole = require("../../models/Guild")
const autorole = require("../../models/Guild")
module.exports = async client => {
client.on("guildMemberAdd", member => {
  autobotrole.findOne({
    guild: member.guild.id
  }, async (err, db) => {
    if (err) return;
    if (!db) return;
    if (!db.autoroles) return;
    if (!db.autoroles.bot && !db.autoroles.human && !db.autoroles.all) return;
    let botrole = member.guild.roles.cache.get(db.autoroles.bot)
    let humanrole = member.guild.roles.cache.get(db.autoroles.human)
    let arole = member.guild.roles.cache.get(db.autoroles.all)
    if (arole) await member.roles.add(arole)
    if (botrole && member.bot) await member.roles.add(botrole)
    if (humanrole && !member.bot) await member.roles.add(humanrole)
    });
  });
  client.on("guildMemberAdd", async member => {
   const model = require("../../models/Guild")
    const guild = await model.findOne({ guild: member.guild.id })
    if (!guild) return;
    if (!guild.welcome) return;
    if (!guild.welcome.channel) return;
      const channel = client.channels.cache.get(guild.welcome.channel)
     if (!channel) return;
      let final = null
    if (guild.welcome.msg) final = guild.welcome.msg.replace("{member}", "<@" + member.id + ">").replace("{member.username}", member.user.username).replace("{member.tag}", member.user.tag).replace("{member.id}", member.user.id).replace("{server}", member.guild.name)
    channel.send(final || member+" welcome to our server!")
    })              
    client.on("guildMemberAdd", async m => {
      let db = await autorole.findOne({ guild: m.guild.id })
      if (db) {
      if (db.log) {
      if (db.log.channel) {
      let channel = m.guild.channels.cache.get(db.log.channel)
      if (channel) {
      let e = new Discord.MessageEmbed()
      .setAuthor(`Member "${m.user.tag}" joined`, m.user.avatarURL({dynamic: true}) || m.user.defaultAvatarURL)
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
          channel.createWebhook(`${client.user.username} Logging`, { 
            avatar: client.user.avatarURL(), 
            reason: "Needed it"}).then(webhook => {
            const webhookClient = new Discord.WebhookClient(webhook.id, webhook.token);      
          webhookClient.send({
            username: `${client.user.username} Logging`,
            avatarURL: client.user.avatarURL(),
            embeds: [e],
          })
         })
        } else  {
          s.send({   username: `${client.user.username} Logging`,
          avatarURL: client.user.avatarURL(),
          embeds: [e],
        })
        }
        })
        }}}}
      });
  };




























/*
const huma = require("humanize-duration")
const Discord = require('discord.js')
//onst moment = require('moment')
const modlog = require('../../models/Guild')
module.exports = client => {
client.on("guildBanAdd", async (member, guild) => {
  let a = await modlog.findOne({
    guild: guild.id})
    if (!a) return;
  if (!a.log) return;
    if (!a.log.channel) return;
    let channel = member.guild.channels.cache.get(a.log.channel)
    if (!channel) return;
    const entry = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(audit => audit.entries.first());
 let mo = "N/A"
  if (entry.target.id == member.id) mo = entry.executor.tag
  const model = require("../../models/Guild")
      const Guild = await model.findOne({ guild: member.guild.id })
      await Guild.updateOne({
					$push: {
						moderations: {
							kick: {
								user: member.id,
								case_id: Guild.moderations.length,
                mod: mo,
                reason: entry.reason || "N/A"
							}
						}
					}
				})
         const em = new Discord.MessageEmbed()//let embed bok better
    .setColor(client.color)
    .setTitle("Ban | Case #" + Guild.moderations.length)//"478587347")
    .addField("User", member.user.username, true)
   .addField("Moderator", mo || "N/A", true)
  .addField("Reason", entry.reason || "N/A", true)
    .setAuthor(member.user.username, client.users.cache.get(member.id).avatarURL())
     // channel.send(embed)
         if (!guild.me.permissions.has("MANAGE_WEBHOOKS")) return channel.send(em);
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
            embeds: [em],
          })
         })
        } else  {
          s.send({   username: `${client.user.username} | Logging`,
          avatarURL: client.user.avatarURL(),
          embeds: [em],
        })
        }
        })
  }) 
}

*/