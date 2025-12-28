const { Client, Collection, GatewayIntentBits } = require(`discord.js`);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates],
});

client.commands = new Collection();

const dotenv = require(`dotenv`);
dotenv.config();

const fs = require(`node:fs`);
const path = require(`node:path`);
const functionsHelper = require(`./export-functions`);

const commandsDir = `commands`;
const validCommandsPaths = functionsHelper.getPathsForCommandsWithDataExecute(commandsDir);

try {
    for (const validCommandPath of validCommandsPaths) {
        const cmdObj = require(validCommandPath);
        client.commands.set(cmdObj.data.name, cmdObj);
    }
} catch (error) {
    functionsHelper.logDevModeOnly(error, `error`, `index.js`);
}

const eventsPath = path.join(__dirname, `events`);
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(`.js`));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.DISCORD_TOKEN);