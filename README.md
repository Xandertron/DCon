# DCon

A wrapper for minecraft that uses discord to transmit the console, which allows you to see realtime logs and send commands

# Note

Please make a config.json with the following contents

```json
{
    "token": "",
    "executionPrefix": ">",
    "listenChannel": "",
    "jarPath": "serverfiles/server.jar"
}
```
* Insert your bot's token (a bot can be made [here](https://discord.com/developers/applications)) into the token field.
* Execution prefix is the prefix you want to use for the command, so you chat with other admins in the same channel, for example: >help >weather >ban BadPerson
* Listen channel is the discord channel you want the bot to recieve and send messages to.
* Jar path is the path to your server.jar or whatever
