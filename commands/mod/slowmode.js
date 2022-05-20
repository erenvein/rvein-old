module.exports = {
  name: "slowmode",
  category: "info",
  botperm: "MANAGE_CHANNELS",
  userperm: "",
  cooldown: { user: 5 },
  aliases: ["setslowmode", "channelslowmode"],
  guild: true,
  description: "Sets the specified channel's slowmode",
  run: async (client, message, args) => {
  if (!args[0]) return message.channel.send(`${message.channel.name}'s slowmode is ${message.channel.rateLimitPerUser}`)
  let c = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel
  if (c.type == "category" || c.type == "voice") return message.reply(`You trying to set slowmode of a ${c.type} channel wtf.`)
  if (isNaN(args[0])) return message.reply(`Slowmode is must be a real number.`)
  await c.setRateLimitPerUser(args[0])
  message.reply(`Successfully ${c.name}'s slowmode set to ${args[0]}`)
    },
  };