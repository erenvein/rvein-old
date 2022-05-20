const model = require('../../models/Guild')
const d = require("discord.js")
module.exports = {
  name: "tag",
  category: "admin",
  userperm: "",
  botperm: "",
  aliases: ["tags", "customcommands"],
  usage: "tag <create/delete/list/owner/info/nsfw",
  guild: true,
  description: "Adds/Deletes/Lists/Gets info custom command.",
  run: async (client, message, args) => {
    const tags = await model.findOne({ guild: message.guild.id })
    let s = args[0]
  let c = args[1]
  let r = args.slice(2).join(' ')
  if (tags) {
    if (tags.tags) {
if (typeof tags.tags.find((gobr) => gobr.name === args[0]) !== "undefined") {  
			message.channel.send(`${tags.tags.find((gobr) => gobr.name === args[0]).response}`);
		}
    }
  }

    if (args[0] == "list") {
  const embed = new d.MessageEmbed()
  .setColor(client.color)
  .setDescription(`**Tags for ${message.guild.name}**\n\n${tags.tags.map((e) => e.name).join(" | ") || `None to create one \`${tags.prefix || client.prefix}tag create <name> <response>\``}`)
  .setAuthor(message.author.tag, message.author.avatarURL())
  return message.channel.send(embed)
}
    else if (args[0] == "owner") {
      let ss = tags.tags.find((gobr) => gobr.name === c).owner
      message.channel.send(`${client.users.cache.get(ss).tag || "This tag doesnt exist or user not found"}`)
    }
    else if (args[0] == "info") {
      let owner = tags.tags.find((gobr) => gobr.name === c).owner
      let name = tags.tags.find((gobr) => gobr.name === c).name
      const embds = new d.MessageEmbed()
      .setColor(client.color)
      .setAuthor(`${name || "This tag doesnt exist or user not found"}`)
      .addField("Owner", `${client.users.cache.get(owner).tag || "This tag doesnt exist or user not found"}`)
    message.channel.send(embds)
      if (!owner) return message.channel.send("Cannot find this tag")
      if (!name) return message.channel.send("Cannot find this tag")
    }
    else if (args[0] == "delete" || args[0] == "-") {
        if (client.owner.indexOf(message.author.id) ===  -1) {
        }
      if (!tags) return message.reply(client.emotes.fail + ` | I could not find any tag to delete`)
      if (!tags.tags) return message.reply(client.emotes.fail + ` | I could not find any tag to delete`)
      if (!tags.tags.find((gobr) => gobr.name === c)) return message.reply(client.emotes.fail + ` | I could not find a custom command named \`${c}\``)
    await tags.updateOne({ $pull: { tags: { name: c } } } )
   return message.channel.send(`${client.emotes.succes} | Succesfully deleted tag`)
    }
        else if (args[0] == "non-nsfw") {
       if (client.owner.indexOf(message.author.id) ===  -1) {
      if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${client.emotes.fail} | You are missing one or more of the following permissions:\n\`MANAGE_GUILD\``)
        }
 const s = tags.tags.find((gobr) => gobr.name === c).name
     await tags.updateOne({ tags: { name: s, nsfw: false } })
     message.channel.send(`${client.emotes.succes} | Succesfully created tag`) 
     }
    
    
    else if (args[0] == "nsfw") {
       if (client.owner.indexOf(message.author.id) ===  -1) {
      if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${client.emotes.fail} | You are missing one or more of the following permissions:\n\`MANAGE_GUILD\``)
        }
 const s = tags.tags.find((gobr) => gobr.name === c).name
      if (!tags) {
 const db = new model({
   guild: message.guild.id,
   $push: { tags: { name: c, response: r, owner: message.author.id } } 
 })

 await tags.updateOne({ tags: { name: s, response: r, owner: message.author.id, nsfw: true }  })
 message.channel.send(`${client.emotes.succes} | Succesfully created tag`)
db.save()
   } else {
     await tags.updateOne({ tags: { name: s, response: r, owner: message.author.id, nsfw: true } })
     message.channel.send(`${client.emotes.succes} | Succesfully created tag`) 
     }
    
    }
    else if (args[0] == "create" || args[0] == "+") {
        if (client.owner.indexOf(message.author.id) ===  -1) {
      if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send(`${client.emotes.fail} | You are missing one or more of the following permissions:\n\`MANAGE_GUILD\``)
        }
          let cmd = client.commands.get(c)
   if (!cmd) cmd = client.commands.get(client.aliases.get(c))
      if (cmd) return message.reply(client.emotes.fail + ` | You can't create a custom command named \`${c}\`.`)
      if (!tags) {
 const db = new model({
   guild: message.guild.id,
   $push: { tags: { name: c, response: r, owner: message.author.id } } 
 })
 db.save()
        
// if (tags.tags.map(c => c.name)[20]) return message.reply(client.emotes.fail + ` | You can't create custom commands anymore because of this guild has reached the limit of 20`)
if (r.length > 200) return message.reply(client.emotes.fail + ` | Response has more than 200 characters.`)
  if (c.length > 20) return message.reply(client.emotes.fail + ` | Command has more than 20 characters.`)
    
      //await tags.updateOne({ $push: { tags: { name: c, response: r, owner: message.author.id, nsfw: false } } })
 //message.channel.send(`${client.emotes.succes} | Succesfully created tag`)
   } else {
     if (tags.tags.map(c => c.name)[5]) return message.reply(client.emotes.fail + ` | You can't create custom commands anymore because of this guild has reached the limit of 20`)
     await tags.updateOne({ $push: { tags: { name: c, response: r, owner: message.author.id, nsfw: false } } })
     message.channel.send(`${client.emotes.succes} | Succesfully created tag`) 
     } 
    }
  else if (!args.length) { return message.channel.send(`${client.emotes.fail} | What do you want me to do? Ex: create, list, delete`) }


    },
  };
