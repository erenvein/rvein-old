module.exports = {
name: "join",
category: "",
botperm: [],
userperm: [],
cooldown: {},
aliases: ["connect"],
guild: true,
usage: "join",
description: "",
status: false,
run: async (client, message, args) => {
let vc = message.member.voice.channel
if (!vc) return message.reply(`You have to join a voice channel to i can join it.`)
if (message.guild.me.voice.channel) return message.reply(`I can't join a voice channel if i am already in a voice channel yet. **Soon bcz i got tired to make**`)
if (!vc.permissionsFor(client.user).has("CONNECT")) return message.reply(`I can't join this voice channel cause of i don't have enough permissions.`)
await vc.join()
message.reply(`Successfully i've joined to #${vc.name}`)
let int = setInterval(() => {
   if (client.queue.get(message.guild.id)) {
    if (!client.queue.get(message.guild.id).songs[0]) {
      if (message.guild.me.voice.channel) message.guild.me.voice.channel.leave()
      clearInterval(int)
      }
   }
   }, 900000);
 },
                                    
};