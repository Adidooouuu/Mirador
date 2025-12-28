const { Events } = require(`discord.js`);

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        let status;
        let activity;

        if (process.env.SELECTED_ENV === `dev`) {
            status = `dnd`;
            activity = `Je sers la science`;
        }
        else {
            status = `online`;
            activity = `Je me rends libre !`;
        }

        client.user.setPresence({ activities: [{ name: activity }], status: status });
        console.log(`${client.user.tag} est disponible !`);
    },
};