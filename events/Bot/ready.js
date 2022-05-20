const d = require("discord.js")
//const DBL = require("dblapi.js")
/*onst dr = require("discord-rpc")
dr.register("683366408092254275")*/
module.exports = client => {
 
client.on("ready", async () => {
  //const cliet = new dr.Client();

 //const dbl = new DBL(process.env.DBL, client)
 client.user.setActivity(`-help`, { type: "WATCHING" })
client.user.setStatus("dnd")
 console.log(`Logged in as ${client.user.tag} with ${client.ws.ping} ms`)

 // setInterval(() => {
   //     dbl.postStats(client.guilds.cache.size, 0, client.shard ? client.shard.count : 1);
    //}, 1800000);
  });
};
 