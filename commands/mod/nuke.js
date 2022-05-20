module.exports = {
name: "nuke",
category: "mod",
botperm: ["MANAGE_CHANNELS"],
userperm: ["MANAGE_CHANNELS"],
cooldown: {},
aliases: [],
guild: true,
usage: "",
description: "",
run: async (client, message, args) => {
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
await message.channel.send(`This channel ${channel}'s all messages gonna deleted. Are you accept it? (type yes or no)`)
await message.channel.awaitMessages(m => m.author.id == message.author.id, { time: 10000, max: 1}).then(async c => {
  if (c.first().content.toLowerCase() == "no") return message.reply(`Okay.`).then(m => m.delete({ timeout: 3000}))
  else if (c.first().content.toLowerCase() == "yes") {
    let n = await channel.clone()
    await n.setPosition(channel.position)
    await channel.delete()
    //wait     await n.setPosition(channel.rawPosition)
    if (n.type !== "voice") await n.send(`first`)
    if (message.channel.id !== channel.id) return message.reply(`BOOM! nuked.`)
    }
  });
 },
};