const d = require('discord.js')
module.exports = {
  name: "embed",
  category: "utility",
  botperm: "EMBED_LINKS",
  userperm: "MANAGE_MESSAGES",
  cooldown: { user: 5 },
  aliases: [],
  guild: false,
  description: "embed maker",
  run: async (client, message, args) => {
  let a = []
  message.delete()
  let embed = new d.MessageEmbed()
  await message.channel.send(`Hey What do you want what to set embed's title? (if you don't want a title type no)`).then(async m => {
    a.push(m)
    await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c => {
      if (c.first().content.toLowerCase() == "no") {
       } else {
         embed.setAuthor(c.first().content)
         };
     a.push(c.first())
     await message.channel.send(`Okay, do you want what to set embed's description? (if you don't want a description type no)`).then(async m2 => {
      a.push(m2)
      await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c1 => {
         if (c1.first().content.toLowerCase() == "no") {
       } else {
         embed.setDescription(c1.first().content)
         };
        a.push(c1.first())
        let aa = await message.channel.send(`Okay, do you want what to set embed's footer? (if you don't want a footer type no)`)
   a.push(aa)
    await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c2 => {
   if (c2.first().content.toLowerCase() == "no") {
       } else {
         embed.setFooter(c2.first().content)
         }
      a.push(c2.first())
     let qwr = await message.channel.send(`Okay, do you want what to set embed's (hex) color? (if you don't want a color type no)`)  
     a.push(qwr)
     await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c =>{
        if (c.first().content.toLowerCase() == "no") {
       } else {
         embed.setColor(c.first().content)
         };
       a.push(c.first())
     let pgs = await message.channel.send(`Okay, do you want what to set embed's thumbnail? **send url or attachment** (its not large image. if you don't want a thumbnail type no)`)
       a.push(pgs)
     await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c => {
         if (c.first().content.toLowerCase() == "no") {
       } else {
         if (!c.first().attachments) {
         embed.setThumbnail(c.first().content)
        } else {
          if (c.first().attachments.first()) embed.setThumbnail(c.first().attachments.first().url)
          }
         };
       a.push(c.first())
         let h = await message.channel.send(`Okay, do you want what to set embed's image? **send url or attachment** (its large image. if you don't want a image type no)`)
        a.push(h)
         await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c => {
           if (c.first().content.toLowerCase() == "no") {
       } else {
         if (!c.first().attachments) {
         embed.setImage(c.first().content)
        } else {
         if (c.first().attachments.first()) embed.setImage(c.first().attachments.first().url)
         }}
          a.push(c.first())
         let pz = await message.channel.send(`Okay, do you want add a field? **Type like that** This is title of field ||| This is value of field (if you don't want a footer type no)`)   
      a.push(pz)
         await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c2 => {
   if (c2.first().content.toLowerCase() == "no") {
       } else {
         if (c2.first().content.includes("|||")) {
          let a = c2.first().content.split(" ").slice(0, c2.first().content.split(" ").indexOf("|||"))
          let v = c2.first().content.split(" ").slice(c2.first().content.split(" ").indexOf("|||") + 1)
         embed.addField(a, v)
         }
         }
           a.push(c2.first())
        let xc = await message.channel.send(`Okay, type **yes** to add a timestamp of now beside of footer to embed (if you don't want a timestamp type no)`)  
       a.push(xc)
        await message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1, time: 30000 }).then(async c =>{
        if (c.first().content.toLowerCase() == "no") {
       } else {
         embed.setTimestamp()
         a.push(c.first())
         }}).catch(e => "")}).catch(e => "")}).catch(e => "")})}).catch(e => "")}).catch(e => "")}).catch(e => "")}).catch(e => "")}).catch(e => "")}).catch(e => "")
   await message.channel.send(`Okay..`).then(m => m.delete({ timeout: 1000 }))
  await message.channel.bulkDelete(a)
    await message.channel.send(embed)
    },
  };