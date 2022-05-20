
module.exports = {
  name: "shutdown",
  category: "owner",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "",
  guild: false,
  description: "",
  run: async (client, message, args) => {
  message.channel.send("Goodbye world")
  client.destroy()
  },
};