const model = require("../../models/Guild");
module.exports = async client => {
client.on("messageReactionRemove", async (reaction, user) => {
let rr = await model.findOne({ rrchannel: reaction.message.channel.id })
if (!rr) return;
if (reaction.message.id ==! rr.rrmsg) return;
let m = reaction.message.guild.members.cache.get(user.id)
let r = reaction.message.guild.roles.cache.get(rr.rrrole)
if (reaction.emoji.id == rr.rremoji) {
await m.roles.remove(r)
  } else if (reaction.emoji.name == rr.rremoji) {
    await m.roles.remove(r)
    } else {
      return;
      }
});
};
//          
          
