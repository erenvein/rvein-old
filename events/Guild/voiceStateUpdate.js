const model = require("../../models/Guild");
module.exports = async client => {
client.on("voiceStateUpdate", async (oldS, newS) => {
let g = await model.findOne({ guild: newS.guild.id })
if (newS.member.id == client.user.id) { if (!newS.channel && oldS.channel) client.queue.delete(newS.guild.id)}
if (g) {
if (g.log) {   
if (g.log.channel) {
  let sp = "n"
if (!oldS.channel && newS.channel) sp = `Member joined to #${newS.channel.name}`
if (!newS.channel && oldS.channel) {
  sp = `Member left from #${oldS.channel.name}`
   }
if (sp == "n") return;
let e = new (require("discord.js")).MessageEmbed()
.setAuthor(newS.member.user.tag, newS.member.user.avatarURL({ dynamic: true }) || newS.member.user.defaultAvatarURL)
.setTitle(`Member voice state updated`)
.setDescription(sp)
.setColor(client.color)
.setFooter(`ID: ${newS.member.id}`)
let s = newS.guild.channels.cache.get(g.log.channel)
if (s) s.send(e)
     }}}
    });
   };