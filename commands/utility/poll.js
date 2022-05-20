const d = require("discord.js")
module.exports = {
  name: "poll",
  category: "utility",
  description: "Quick and easy yes/no poll, for multiple answers, see a.quickpoll",
  //otperm: "MANAGE_MESSAGES",
  aliases: [],
  usage: "poll <question>",
  sub: "embed",
  guild: true,
 // description: "Creates polls",
  run: async (client, message, args) => {
  if (!args) return message.reply("Missing the question")
  const e = args.join(' ')
    if (message.guild.me.permissions.has("MANAGE_MESSAGES")) message.delete();
    const msg = await message.channel.send(`[${message.author.tag}]: ${e}`)
       await msg.react("744921738017505440")
       await msg.react("744921818292420639")
        
      
      
  },
};
