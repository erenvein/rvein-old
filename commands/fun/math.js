/*onst Stroople = require('strooplejs');
const math = new Stroople();*/
const d = require("discord.js")               
module.exports = {
  name: "math",
  category: "fun",
  userperm: "",
  botperm: "",
  aliases: [],
  guild: false,
  status: false,
  description: "Math solves the operation",
  run: async (client, message, args) => {
  // try {
   const s = args[0]
// const go_br = math.calc(args.join(" "))
     if (message.content.includes("+")) {
       if (args[1]) {
      let gobr = parseInt(args[0]) + parseInt(args[2])
       return message.channel.send(gobr)
         } else {
          let slakeren = parseInt(args[0].charAt(args[0].length - 1)) + parseInt(args[0].charAt(args[0].length - 3))
     
       return message.channel.send(slakeren)
         
          }
       

  }
    
  },
};
