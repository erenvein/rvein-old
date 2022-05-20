const d = require("discord.js");
module.exports = client => {
  client.on("guildMemberUpdate", async(oldMembe, newMembe) => {
    let oldMember = oldMembe.user
    let newMember = newMembe.user
    let model = require("../../models/Guild")
    let act = "n"
    let o = "n"
    let n = "n"
    let guild = await model.findOne({ guild: newMembe.guild.id })
   if (!guild) return;
    if (!guild.log) return;
    if (!guild.log.channel) return;
    if (oldMember.avatar !== newMember.avatar) {
     let embed = new d.MessageEmbed()
    .setAuthor(`${newMember.tag}`, newMember.avatarURL({ dynamic: true }) || newMember.defaultAvatarURL)
    .setTitle(`Member avatar update`)
    .setThumbnail(newMember.avatarURL({ dynamic: true }) || newMember.defaultAvatarURL)
    .setImage(newMember.avatarURL({ dynamic: true }))
    newMembe.guild.channels.cache.get(guild.log.channel).send(embed)
    } else if (oldMember.name !== newMember.name) {
      act = "name"
      o = oldMember.name
      n = newMember.name
      } else if (oldMember.discriminator !== newMember.discriminator) {
      act = "discriminator"
      o = oldMember.discriminator
      n = newMember.discriminator
      }
   
    
    let embed = new d.MessageEmbed()
    .setAuthor(`${newMember.tag}`, newMember.avatarURL({ dynamic: true }) || newMember.defaultAvatarURL)
    .setTitle(`${act} update`)
    .setThumbnail(newMember.avatarURL({ dynamic: true }) || newMember.defaultAvatarURL)
    .addField(`Before`, `**${act}**: ${act == "avatar" ? `[${oldMember.avatar || "default"}](${o})`: o}`)
    .addField(`After`, `**${act}**: ${act == "avatar" ? `[${newMember.avatar || "default"}](${o})`: o}`)
    newMembe.guild.channels.cache.get(guild.log.channel)

  
    })

}