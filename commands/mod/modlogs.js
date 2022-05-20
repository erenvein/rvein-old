

module.exports = {
    name: "modlogs",
    category: "mod",
    userperm: "",
    botperm: "",
    aliases: [],
    usage: "nickname <@user> <nickname>",
    guild: true,
    sub: ["nickname <reset> <@user>/nickname <@user> <nickname>"],
    description: "Sets/Resets nickname of specified member",
  run: async (client, message, args) => {
    const caseid = args[0]
    const gmodel = require("../../models/Guild")
    const guild = await gmodel.findOne({ guild: message.guild.id })
    const d = require("discord.js")
    const e = new d.MessageEmbed()
    .setColor(client.color)
    .setDescription(guild.moderations.map(e => `Case | ${e.kick.case_id}\nUser: ${client.users.cache.get(e.kick.user).tag}\nMod: ${e.kick.mod}\nReason: ${e.kick.reason || "N/A"}`).join("\n\n"))
   message.channel.send(e)
    // await gmodel.deleteOne({ guild: message.guild.id })
  }
  }