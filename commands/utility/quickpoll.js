const d = require("discord.js");
module.exports = {
  name: "quickpoll",
  category: "utility",
  userperm: "",
  botperm: "",
  aliases: [],
  sub: "",
  usage: "quickpoll <choices>",
  guild: true,
  description: "delimit questions and answers by either | or , supports up to 10 choices",
  run: async (client, message, args) => {
   if (!args[1]) return message.reply(client.emotes.fail + ` | You need type choices to start quickpoll.`)
   if (args[11]) return message.reply(client.emotes.fail + ` | I cant quickpoll with more than 9 choices.`)

   /*for (let a of args.slice(1)) {
    if (args.slice(1).indexOf(a) ==! args.slice(1).lastIndexOf(a)) {
      arg = args.slice(1).slice(args.slice(1).lastIndexOf(a), 1)
      }*/
    
    let embed = new d.MessageEmbed()
   .setColor(client.color)
   .setDescription(`[${message.author.tag}]: ${args[0]},\n${args.slice(1).map(a => `**${args.slice(1).indexOf(a) + 1}** ${a}`).join("\n")}`)
 let m = await message.channel.send(embed)
    let i = 1;
     for (let f of args.slice(1)) {
       if (i == 1) {
      await m.react(client.emotes.one)
         } else if (i == 2) {
      await m.react(client.emotes.two)
         } else  if (i == 3) {
      await m.react(client.emotes.three)
         } else if (i == 4) {
      await m.react(client.emotes.four)
         } else if (i == 5) {
      await m.react(client.emotes.five)
         } else if (i == 6) {
      await m.react(client.emotes.six)
         } else if (i == 7) {
      await m.react(client.emotes.seven)
         } else if (i == 8) {
      await m.react(client.emotes.eight)
         } else if (i == 9) {
      await m.react(client.emotes.nine)
         } else if (i = 10) {
      await m.react(client.emotes.ten) 
         }
       i++;
       }
                      
   },
  };