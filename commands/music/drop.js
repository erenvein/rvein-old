module.exports = {
  name: "drop",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: true,
  status: false,
  description: "Drops specified music from the queue",
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Ups")
  let q = client.queue.get(message.guild.id)
    if (!q) return message.reply(`Ups`)
   if (!q.songs) return message.reply(`Ups`)
   // if (!message.guild.me.voice.connection) return;
  // ./ if(!message.member.voice.channel) return;
  //  if (!message.member.voice.channel.id !== message.guild.me.voice.channel.id) return;
    message.reply(`Successfully dropped \`${q.songs[Math.floor(parseInt(args[0]) - 1)].title}\``)
   await q.songs.splice(Math.floor(parseInt(args[0]) - 1), 1)
  },
  };