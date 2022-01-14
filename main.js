const { Client, Intents } = require("discord.js");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const config = require("./config.json");
let channel;

const rcon = require("rcon")

conn = new rcon(config.rconHost, config.rconPort, config.rconPassword);
let authenticated;

bot.on('ready', client => {
    let channel = client.channels.cache.get(config.listenChannel)
    conn.on('auth', function () {
        console.log("RCon authenticated")
        authenticated = true
    }).on('response', function (str) {
        if(str.length >= 1990) {
            channel.send(`\`\`\`${str.substr(0,1990)}\`\`\``);
            channel.send(`\`\`\`${str.slice(1990)}\`\`\``);
            return
        }
        channel.send(`\`\`\`${str}\`\`\``);
    }).on('server', function (str) {
        if(str.length >= 1990) {
            channel.send(`\`\`\`${str.substr(0,1990)}\`\`\``);
            channel.send(`\`\`\`${str.slice(1990)}\`\`\``);
            return
        }
        channel.send(`\`\`\`${str}\`\`\``);
    }).on('error', function (err) {
        console.log("Error: " + err);
    }).on('end', function () {
        console.log("Connection closed");
        process.exit();
    });
    conn.connect()
})

bot.on("messageCreate", (message) => {
    if (!message.content.startsWith(config.executionPrefix) || message.author.bot) return;
    console.log(message.content)
    if (authenticated) {
        conn.send(message.content.slice(1))
    }
});

bot.login(config.token)
