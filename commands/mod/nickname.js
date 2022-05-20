

module.exports = {
  name: "nickname",
  category: "mod",
  userperm: "MANAGE_NICKNAMES",
  botperm: "MANAGE_NICKNAMES",
  aliases: ["nick", "name", "setnickname"],
  usage: "nickname <@user> <nickname>",
  guild: true,
  sub: ["nickname <reset> <@user>/nickname <@user> <nickname>"],
  description: "Sets/Resets nickname of specified member",
  run: async (client, message, args, mentionuser) => {
  if (!args[0]) return message.reply(client.errors.args)
    let user = mentionuser || client.users.cache.get(args[1]) || client.users.cache.find(u => u.tag == args[1]) || client.users.cache.find(u => u.username == args[1]) || message.author// || mentionuser
   //if (!user) return message.reply("")
 //  let member = message.guild.members.cache.get(user.id)
  //if (!member) return;
   if (args[0] == "reset" || args[0] == "remove") {
    //if (message.guild.owner.id ==! message.author.id) {
//if (message.guild.owner.id ==! message.author.id) {
     if (message.guild.members.cache.get(user.id).roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
   if (message.guild.owner.id !== message.author.id) {
     if (message.guild.members.cache.get(user.id).roles.highest.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
      if (user.id == message.guild.owner.id) return message.reply(client.errors.botRolePosition)
     await message.guild.member(user).setNickname(user.username)
     message.reply(client.emotes.succes + ` | \`${user.tag}\`'s nickname is removed.`)
   } else {//benc ayrı komt açak bunlara no why? rgeeksiz 2 3 komt no fuck?  sdce?
   let userr = mentionuser || client.users.cache.get(args[0]) || client.users.cache.find(u => u.tag == args[0]) || client.users.cache.find(u => u.username == args[0]) || message.author
   if (message.guild.members.cache.get(userr.id).roles.highest.position >= message.guild.me.roles.highest.position) return message.reply(client.errors.botRolePosition)
 if (message.guild.owner.id ==! message.author.id) {
     if (message.guild.members.cache.get(userr.id).roles.highest.position >= message.member.roles.highest.position) return message.reply(client.errors.memberRolePosition)
  }
   if (userr.id == message.guild.owner.id) return message.reply(client.errors.memberRolePosition)
   await message.guild.member(userr).setNickname(args.slice(1).join(" "))
     message.reply(client.emotes.succes + ` | \`${user.tag}\`'s nickname is changed to ${args[0]}`)
   }
   
   },
};