const g = require("../../models/Guild")
module.exports = {
name: "case",
category: "",
botperm: [],
userperm: ["MANAGE_MESSAGES"],
cooldown: { user: 5 },
aliases: ["caseinfo", "case-info", "case_info"],
guild: true,
usage: "",
description: "",
run: async (client, message, args) => {
  if (!args[0]) return message.reply(`You need type a number to get info about a case.`)
  if (isNaN(args[0])) return message.reply(`You need type a number to get info about a case.`)
    let guild = await g.findOne({ guild: message.guild.id })
  let case_to = guild.moderations.filter(a => a.kick.case_id == args[0])
  message.channel.send(case_to.user+"\n"+case_to.mod || "not found")
 },
};