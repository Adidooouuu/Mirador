const dotenv = require(`dotenv`);
dotenv.config();

const { REST, Routes } = require(`discord.js`);
const functionsHelper = require(`./export-functions`);

const commandsDir = `commands`;
const commands = [];
const validCommandsPaths = functionsHelper.getPathsForCommandsWithDataExecute(commandsDir);

try {
    for (const validCommandPath of validCommandsPaths) {
        const cmdObj = require(validCommandPath);
        commands.push(cmdObj.data.toJSON());
    }
} catch (error) {
    functionsHelper.logDevModeOnly(error, `error push data to JSON`, `deploy-commands.js`);
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log(`Démarrage du rechargement des ${commands.length} commandes.`);
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Rechargement des ${data.length} commandes réussi.`);
    }
    catch (error) {
        functionsHelper.logDevModeOnly(error, `error REST`, `deploy-commands.js`);
    }
})();