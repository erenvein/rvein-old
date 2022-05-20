const model = require("../../models/Guild");
const d = require("discord.js");
module.exports = {
name: "approve",
category: "mod",
botperm: [],
userperm: ["MANAGE_CHANNELS"],
cooldown: {},
aliases: [],
guild: true,
usage: "approve <id> [reason]",
description: "Approves specified suggestion.",
run: async (client, message, args) => {
 if (!args[0]) return;
let g = await model.findOne({ guild: message.guild.id })
 if (!g) return;
 if (!g.suggestion) return;
 if (!g.suggestion.channel) return;
 if (!g.s) return;
// if (!g.suggestion.s[args[0]]) return;
 let re = args.slice(1).join(" ") || "N/A"
 //let a = client.users.cache.get(g.suggestions.s[0].author)
 let casen = g.s.find(a => a.ss.case === args[0])
 let a = client.users.cache.get(casen.author)
                     if (!casen) return;  
 let e = new d.MessageEmbed()
 .setTitle(`Suggestion #${args[0]} approved`)
.setDescription(casen.content)
.addField(`Reason by ${message.author.tag}`, re)
.setColor(client.color)
 if (a) e.setAuthor(`${a.tag}`, a.avatarURL({ dynamic: true}) || a.defaultAvatarURL)

let s = client.channels.cache.get(g.suggestion.channel)
if (s) s.send(e)
 },
};