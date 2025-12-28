// Ne détecte que les interactions "commandes slash" et traite les erreurs potentielles à leur exécution
const { Events } = require(`discord.js`);

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`La commande ${interaction.commandName} est introuvable.`);
            return;
        }

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(`**Une erreur est survenue à l'exécution la commande ${interaction.commandName}.**`);
            console.error(error);
        }
    },
};