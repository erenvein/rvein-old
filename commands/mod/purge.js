module.exports = {
  name: "purge",
  category: "mod",
  userperm: "MANAGE_MESSAGES",
  botperm: "MANAGE_MESSAGES",
  aliases: ["clear", "prune"],
  usage: "purge [channel] <number>",
  guild: true,
  sub: [],
  status: false,
  cooldown: { guild: 25 },
  description: "Deletes specified amount of messages in specified channel",
  run: async (client, message, args, mentionuser) => {
  if (!args[0]) return message.reply(client.emotes.fail + ` | I need a number to purge messages.`).then(c => c.delete({ timeout: 3000 }))
  let channel = message.mentions.channels.first() || message.guild.channels.cache.filter(c => c.type == "text").get(args[0]) || message.guild.channels.cache.filter(c => c.type == "text").find(c => c.name == args[0].toLowerCase())
  let amount = args[1]
  if (!channel) {
  channel = message.channel
  amount = args[0]} 
  if (channel.type == "voice" || channel.type == "category") return message.reply(`You trying purge in a ${channel.type} channel wtf.`)
 // if (!args[1]) return message.reply(client.emotes.fail + ` | I need a number to purge messages.`).then(c => c.delete({ timeout: 3000 }))
  if (isNaN(amount)) return message.reply(client.emotes.fail + ` | \`${amount}\` is not a real number.`).then(c => c.delete({ timeout: 3000 }))
  if (amount <= 100) {
  try {
  await message.delete();
  let fetched = await channel.messages.fetch({ limit: amount })
  let deleted = await channel.bulkDelete(fetched, true)
  message.channel.send(client.emotes.succes + ` | Successfully **${deleted.size || 0}** messages were purged.`).then(c => c.delete({ timeout: 3000 }))
  } catch (error) {
  return message.channel.send(client.emotes.fail + ` | No messages deleted, make sure the messages aren't over two weeks old.`).then(e => e.delete({ timeout: 3000 }))
};
  } else {

   let i = 0
   let del = 0
    while (i == amount.charAt()) {
    let fetched = await message.channel.messages.fetch({ limit: 100 })
    if (!fetched) return message.channel.send(client.emotes.succes + ` | Successfully **${del || 0}** messages were purged.`).then(e => e.delete({ timeout: 3000 }))
    let deleted = await message.channel.bulkDelete(fetched, true)
     if (deleted < 100) return message.channel.send(client.emotes.succes + ` | Successfully **${del || 0}** messages were purged.`).then(e => e.delete({ timeout: 3000 }))
    del+=deleted
      i++
    }
   if (del.endsWith("00")) {
    let f2 = await message.channel.messages.fetch({ limit: amount - `${amount.charAt()}` + "00"})
    let d2 = await message.channel.bulkDelete(f2, true)
    del+=d2
    await message.channel.send(client.emotes.succes + ` | Successfully **${del || 0}** messages were purged.`).then(e => e.delete({ timeout: 3000 }))
     } else {
       await message.channel.send(client.emotes.succes + ` | Successfully **${del || 0}** messages were purged.`).then(e => e.delete({ timeout: 3000 }))
       }
};
 },
};
