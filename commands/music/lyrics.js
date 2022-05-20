//const f = require('node-fetch');
const d = require('discord.js')
const paginationEmbed = require('discord.js-pagination');
module.exports = {
  name: "lyrics",
  category: "music",
  userperm: "",
  botperm: "",
  aliases: [],
  usage: "lyrics <music>",
  guild: false,
  description: "Sends lyrics of music. (Supporting max 6144 characters)",
  run: async (client, msg, args) => {
    if (!args[0]) return msg.reply(client.errors.args)
    let result = args.join(' ')
    const r = await f(`https://some-random-api.ml/lyrics?title=${result}`).catch(e => msg.reply("srry kid i got a err while gets results"))
    r.json().then(async e => {
      if (!e) return msg.reply("srry kid, i couldnt get any result")
     let message = {}
     message.author = msg.author
     message.channel = msg.channel
      if (e.lyrics.length > 2048) {
         if (e.lyrics.length > 4096) {
           if (e.lyrics.length <= 6144) {
     const em = new d.MessageEmbed()
      .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
     .setDescription(e.lyrics.substring(0, 2048))
      let em2 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(2049, 4096))
      let em3 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(4097,  (e.lyrics.length > 6144? 6144 : e.lyrics.length)))
          let pages = [em, em2, em3]
          paginationEmbed(message, pages);
         } else {
           const em = new d.MessageEmbed()
      .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
     .setDescription(e.lyrics.substring(0, 2048))
      let em2 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(2049, 4096))
      let em3 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(4097, 6144))
         let em4 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(6145,  (e.lyrics.length > 8192 ? 8192 : e.lyrics.length)))
          let pages = [em, em2, em3, em4]
          paginationEmbed(message, pages);
           }
           } else {
         const em = new d.MessageEmbed()
      .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
     .setDescription(e.lyrics.substring(0, 2047))
      let em2 = new d.MessageEmbed()
         .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
        .setDescription(e.lyrics.substring(2048, e.lyrics.length))
          let pages = [em, em2]
          paginationEmbed(message, pages);
         }
           } else {
          const em = new d.MessageEmbed()
      .setColor(client.color)
         .setTitle(e.author + " - " + e.title)
     .setDescription(e.lyrics)
    //setTitle(e.author)
       
          let pages = [em]
           paginationEmbed(message, pages);
           };
      })
    },
  };