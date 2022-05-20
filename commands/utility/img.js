const GoogleImages = require("google-images");
const { Client, Attachment, MessageEmbed } = require("discord.js");
//const client = new Client;
const googleImages = new GoogleImages("009566364478457158503:3g3icphwlh0","AIzaSyDmohgZZEZzVxWasrX0KTrswbld4M0MwaE");
module.exports = {
  name: "img",
  category: "utility",
  perm: "",
  aliases: ["image", "imagesearch", "image-search"],
  guild: false,
  description: "Searchs and sends image of the first of results",
  run: async (client, message, args) => {
  if (client.owner.indexOf(message.author.id) ===  -1) {
    if (!message.channel.nsfw) return message.reply(client.emotes.fail + ` | That command can't be used in not marked nsfw channels.`)
 }
    let s = args.slice(0).join(" ")
  if (!s) return message.reply(`You need to type something to search image..`)
  try {
  const results = await googleImages.search(args.slice(0).join(" "));
if (!results.length) return message.reply(`I couldnt found anything on google.`)
  const e = new MessageEmbed()
.setImage(results[0].url)
  .setAuthor(`Results for ${args.slice(0).join(" ")}`, message.author.avatarURL({dynamic: true}) || message.author.defaultAvatarURL())
 .setColor(client.color)
  message.channel.send(e);
  } catch (e) {
    message.reply(client.emotes.fail + `I got error while searching. Error: ${e}`)
  }
},//gerek yok? k 
};