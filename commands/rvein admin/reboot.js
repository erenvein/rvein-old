const exec = require('util').promisify(require('child_process').exec)
module.exports = {
  name: "reboot",
  category: "owner",
  userperm: "",
  botperm: "",
  aliases: ["res", "restart"],
  guild: false,
  description: "",
  run: async (client, message, args) => {
  message.channel.send("rvein is rebooting now.").then(async() => {
  await process.exit()
  })//a w noty a i t
    
  },
   };