const Discord = require("discord.js");
module.exports = async client => {
  
client.token = "bruh"
  
  
client.prefix = "-"
client.owner = ["409757314367750146", "412254835849691146"] 
client.color = 0x7289da//0x9158bc 3498db 008ae2 4286f4
client.logcolor = 0x2296f3
client.discord = Discord
  
client.emotes = {
  "one": "753910647019929650",
  "two": "753910767505375335",
  "three": "753910868785365052",
  "four": "753911087870771210",
  "five": "753911167444844625",
  "six": "753911504327278602",
  "seven": "753911563261313076",
  "eight": "753911609985859664",
  "nine": "753911651186769963",
  "ten": "755029074102976543",
  "up": "744921738017505440",
  "down": "744921818292420639",
  "succes": "<a:success:744923392095813722>",
  "fail": "<a:fail:744923350744301678>",
  "djs": "<a:djspride:745989327292596234>"
}   
 
  
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.spammer = new Discord.Collection();
 
  
client.errors = {
  "memberNoPerm": `${client.emotes.fail} | You don't have enough permissions to do that.`,
  "memberRolePosition": `${client.emotes.fail} | You are not high enough in the role hierarchy to do that.`,
  "args": `${client.emotes.fail} You didn't provide required arguments`,
  "botRolePosition": `${client.emotes.fail} | I am not high enough in the role hierarchy to do that.`,
  "botNoPerm": `${client.emotes.fail} | I don't have enough permissions to do that.`,
  "notNsfw": `${client.emotes.fail} | This command is can be used in only nsfw channels.`,
  "notGuild": `${client.emotes.fail} | This command is cant be used in private channels`
  }
  
};