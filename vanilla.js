const { Client, Intents, Util } = require("discord.js");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    allowedMentions: { parse: [] }
});
const config = require("./config.json");
let channel;
let minecraftServerProcess;
console.log("Starting the server...")

bot.on('ready', client => {
    var channel = client.channels.cache.get(config.listenChannel)

    var spawn = require('child_process').spawn;
    minecraftServerProcess = spawn('java', [
        '-Xmx1G',
        '-Xms1G',
        '-jar',
        config.jarPath,
        'nogui'
    ]);

    // Log server output to stdout
    function log(data) {
        process.stdout.write(data.toString());
    }
    minecraftServerProcess.stdout.on('data', log);
    minecraftServerProcess.stderr.on('data', log);

    //minecraftServerProcess.stdin.write(command + '\n');

    // buffer output for a quarter of a second, then reply to HTTP request
    var buffer = [];
    var collector = function (data) {
        data = data.toString();
        // Split to omit timestamp and junk from Minecraft server output
        buffer.push(data)//.split(']: ')[1]);
        //console.log(buffer)
    };
    minecraftServerProcess.stdout.on('data', collector);

    // Delay for a bit, then send a response with the latest server output
    setInterval(function () {
        //console.log(channel)
        //console.log("data: "+buffer.join('').toString())
        //channel.send(`\`\`\`${buffer.join('').toString()}\`\`\``)
        let message = buffer.join('')
        if (message == '') {
            buffer = [];
            return
        }
        chunks = Util.splitMessage(buffer.join(''), { maxLength: 1988 }).forEach(data => {
            channel.send(`\`\`\`${data}\`\`\``)
        });
        buffer = [];
    }, 1000);
    // minimum delay so its not too slow but not that fast for discord

    // Make sure the Minecraft server dies with this process
    process.on('exit', function () {
        minecraftServerProcess.stdin.write('stop\n');
        setTimeout(function () {
            minecraftServerProcess.kill();
        }, 5000)
    });
})
bot.on("messageCreate", (message) => {
    if (!message.content.startsWith(config.executionPrefix) || message.author.bot) return;
    minecraftServerProcess.stdin.write(`${message.content.slice(1)}\n`);
});
bot.on("err", console.log)

bot.login(config.token)
