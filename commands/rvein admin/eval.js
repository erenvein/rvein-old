const Discord = require('discord.js');

module.exports = {
  name: "eval",
  category: "owner",
  userperm: "",
  botperm: "",
  aliases: ["ev"],
  guild: false,
  description: "",
  run: async (client, message, args) => {
let code = args.join(" ");
if (!code) return message.channel.send(client.emotes.fail);
  try {
 let e = await eval(code);
  if (typeof evaled !== "string") e = require("util").inspect(e);
    message.channel.send(e, { code: "js" })
  } catch (err) {
    message.channel.send(err, { code: "js" })
    };
    },
  };
