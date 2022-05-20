const model = require("../../models/User");
module.exports = {
name: "afk",
category: "utility",
botperm: [],
userperm: [],
cooldown: {},
aliases: [],
guild: false,
usage: "afk [reason]",
description: "",
run: async (client, message, args) => {
let u = await model.findOne({ user: message.author.id })
if (u) {
  await u.updateOne({ afk: args.join(" ") || "Unspecified" })
 message.reply(`You are afk due to \`${args.join(" ") || "Unspecified"}\` now.`)
 if (!u.afk) { if (message.guild.me.roles.highest.position > message.member.roles.highest.position) { if (message.guild.me.permissions.has("MANAGE_NICKNAMES")) await message.member.setNickname(`[AFK] ${message.member.nickname || message.author.username}`) } }
} else {
   let d = new model({
    user: message.author.id,
    afk: args.join(" ") || "Unspecified"
     })
    await d.save()
    message.reply(`You are afk due to \`${args.join(" ") || "Unspecified"}\` now.`)
  if (message.guild.me.roles.highest.position > message.member.roles.highest.position) { if (message.guild.me.permissions.has("MANAGE_NICKNAMES")) await message.member.setNickname(`[AFK] ${message.member.nickname || message.author.username}`) }
  };
 },
};