const d = require("discord.js");
const model = require("../../models/Guild");
module.exports = client => {
client.on("messageDeleteBulk", async messages => {
const m = messages.map(m => m)[0]
await model.findOne({ guild: m.guild.id }, async (err, db) => {
if (err) console.log(err);
if (!db) return;
if (!db.log) return;
if (!db.log.channel) return;
let channel = m.guild.channels.cache.get(db.log.channel);  
if (!channel) return;
const entry = await channel.guild.fetchAuditLogs({ type: "MESSAGE_BULK_DELETE" }).then(audit => audit.entries.first());
const mm = channel.guild.member(entry.executor)
const embed = new d.MessageEmbed()
.setColor(client.logcolor)
//.setDescription(entry)
.setAuthor(`${messages.size} messages were deleted in #${m.channel.name}`)
if (messages.filter(m => m.content).map(m => `[${m.author.tag}]: ${m.content}`).join("\n").length <= 1000) embed.setDescription(`${messages.filter(m => m.content).map(m => `[${m.author.tag}]: ${m.content}`).join("\n")}`)
if (messages.filter(m => m.content).map(m => `[${m.author.tag}]: ${m.content}`).join("\n").length > 1000) embed.setDescription(`${messages.filter(m => m.content).map(m => `[${m.author.tag}]: ${m.content}`).join("\n").substring(0, 1000)}`)
channel.send(embed)
});
});
};