///onst nekoclient = require('nekos.life');
//const neko = new nekoclient();

module.exports = {
  name: "8ball",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: ["ask", "eightball"],
  guild: false,
  description: "Ask something to gets REAL answer of the question. (Its includes magic)",
  run: async (client, message, args) => {
    const t = args.join(' ')
      if (!t) return message.reply(client.errors.args+" a text!")
    const list = require('../../utils/lists.js').eightball
   // let resp = Math.floor(Math.random() * list.lentgh)
    let resp = Math.floor(Math.random() * list.length)
    if (t == "am i gay") return message.channel.send(":flushed: :rainbow_flag:")  
    message.channel.send(list[resp])
  },
};