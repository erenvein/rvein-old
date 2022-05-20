const Discord = require('discord.js');
const client = new Discord.Client()
const { readdirSync } = require("fs");
require("./utils/tools.js")(client);
require("./database/database.js");

// Command Handler
readdirSync("./commands/").forEach(d => {
const cmds = readdirSync(`./commands/${d}/`).filter(file => file.endsWith(".js"));
for (let f of cmds) {
let cmd = require(`./commands/${d}/${f}`);
if (cmd.name) client.commands.set(cmd.name, cmd);
else continue;
if (cmd.aliases && Array.isArray(cmd.aliases)) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name));}});

// Event Handler
readdirSync("./events/").forEach(d => { 
const events = readdirSync(`./events/${d}/`).filter(file => file.endsWith(".js"));
for (let f of events) {
require(`./events/${d}/${f}`)(client)};
});

// MADE BY ARDA BASKAYA, EREN (EVILS)
client.login(process.env.token);