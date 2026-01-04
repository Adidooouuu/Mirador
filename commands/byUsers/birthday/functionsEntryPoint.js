const create = require(`./create`);
const functionsHelper = require(`../../../export-functions`);

/**
 * 
 * @param {SlashCommandSubcommandBuilder} subcommand
 * @param {String} subcommandName
 * 
 * @returns {SlashCommandSubcommandBuilder}
 */
function birthdayUserInput(subcommand, subcommandName) {
    const yearNow = functionsHelper.getActualYear();
    return subcommand
        .setName(subcommandName)
        .setDescription(`${subcommandName} your birthday`)
        .addIntegerOption((option) => option
            .setName('day')
            .setDescription(`1-31`)
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(31)
        )
        .addIntegerOption((option) => option
            .setName(`month`)
            .setDescription(`1-12`)
            .setRequired(true)
            .setMinValue(1)
            .setMaxValue(12)
        )
        .addIntegerOption((option) => option
            .setName(`year`)
            .setDescription(`Pour vérifier la validité de la date. [1900-aujourd'hui]`)
            .setRequired(true)
            .setMinValue(1900)
            .setMaxValue(yearNow)
        )
        .addBooleanOption((option) => option
            .setName(`share`)
            .setDescription(`Partager l'âge calculé ?`)
            .setRequired(true)
        );
}

//
// Create
//

/**
 * 
 * @param {*} interaction 
 * @returns 
 */
async function setBirthdayDate(interaction) {
    return create.createBirthdayDate(interaction);
}

module.exports = {
    birthdayUserInput,
    setBirthdayDate
};