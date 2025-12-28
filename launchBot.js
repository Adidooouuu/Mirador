const readline = require(`readline`).createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question(`Sélectionnez l'environnement (dev/prod): `, (env) => {
    if (env.toLowerCase() === `dev`) {
        console.log(`Lancement du bot en mode développement`);
        launchBotAction(env);
    }
    else if (env.toLowerCase() === `prod`) {
        console.log(`Lancement du bot en mode production`);
        launchBotAction(env);
    }
    else {
        console.error(`Environnement non valide. Veuillez choisir entre "dev" ou "prod".`);
        process.exit(1);
    }

    readline.on(`error`, (err) => {
        console.error(`Error:`, err);
        readline.close();
    });

    readline.close();
});

/**
 *
 * @param {String} userChoice
 */
function launchBotAction(userChoice) {
    process.env.SELECTED_ENV = userChoice;
    
    require(`./deploy-commands.js`);
    require(`./index.js`);
}
