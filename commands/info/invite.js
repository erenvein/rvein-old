const d = require('discord.js')
module.exports = {
  name: "invite",
  category: "info",
  botperm: "",
  userperm: "",
  //usage: "ping",
  aliases: [],
  guild: false,
  description: "Sends useful links",
  run: async (client, message, args) => {//yes
    const e = new d.MessageEmbed()
    .setColor(client.color)
    .setAuthor(" | Links", client.user.avatarURL())
    .setDescription("[Invite](https://bit.ly/invrvein)")
message.channel.send(e)
  },
};

