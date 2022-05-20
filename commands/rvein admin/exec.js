const exec = require('util').promisify(require('child_process').exec)
module.exports = {
  name: "exec",
  category: "owner",
  userperm: "",
  botperm: "",
  aliases: [],
  guild: false,
  description: "",
  run: async (client, message, args) => {
  let proc = args.slice(0).join(" ")
  exec(proc)
        .then(({ stdout, stderr }) => {
        return message.channel.send(stderr.substring(0, 200) || stdout.substring(0, 200), { code: "js" })
      })
          .catch(err => {
        return message.channel.send(err, { code: "js" })
      })
  }
}