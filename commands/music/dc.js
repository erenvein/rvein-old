module.exports = {
  name: "dc",
  category: "music",
  userperm: ["MUTE_MEMBERS"],
  botperm: "",
  aliases: ["disconnect", "leave"],
  sub: "",
  usage: "",
  guild: true,
  description: "Disconnects from the voice channel and Deletes queue",
  run: async (client, message, args) => {
  if (!message.member.voice.channel) return message.reply(client.emotes.fail + ` | You have to join a voice channel to disconnect`)
  let vc = message.member.voice.channel
  if (!message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | I don't play any music in this server.`) 
  if (vc ==! message.guild.me.voice.channel) return message.reply(client.emotes.fail + ` | You don't listen what i am playing now.`)
  if (message.guild.me.voice.connection) {
    if (message.guild.me.voice.connection.dispatcher) await message.guild.me.voice.connection.dispatcher.end()}
  await message.guild.me.voice.channel.leave()
  client.queue.delete(message.guild.id)
    message.reply(client.emotes.succes + ` | Successfully disconnected and queue is deleted.`)
  },
};