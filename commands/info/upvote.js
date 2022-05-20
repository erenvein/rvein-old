module.exports = {
name: "upvote",
category: "info",
botperm: [],
userperm: [],
cooldown: { user: 5 },
aliases: ["vote"],
guild: false,
usage: "",
description: "",
run: async (client, message, args) => {
 message.channel.send(`You can vote at: https://top.gg/bot/${client.user.id}/vote`) 
 },
};