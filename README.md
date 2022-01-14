# DCon

A Minecraft RCon -> Discord Bot backend (?) for listening to the server console

(could probably also work for source servers idk)

# Note

Please make a config.json with the following contents

```json
{
    "token": "",
    "executionPrefix": ">",
    "listenChannel": "",
    
    "rconHost":"127.0.0.1",
    "rconPort": 25575,
    "rconPassword": "changeme"

}
```
* Insert your bot's token (a bot can be made [here](https://discord.com/developers/applications)) into the token field.
* Execution prefix is the prefix you want to use for the command, so you chat with other admins in the same channel, for example: >help >weather >ban BadPerson
* Listen channel is the discord channel you want the bot to recieve and send messages to.
* For best practices, host it on the same server/local network and NEVER expose it to the public.
* Changing the port in server.properties to something other than 25575 is HIGHLY RECOMMENED!
