const functionsHelper = require(`../../../export-functions`);
const localHelper = require(`./functionsEntryPoint`);
const { SlashCommandBuilder } = require(`discord.js`);

const mainCommandName = `birthday`;
const subcommandSet = `set`;
const subcommandUpdate = `update`;
const subcommandDelete = `delete`;

module.exports = {
    data: new SlashCommandBuilder()
        .setName(mainCommandName)
        .setDescription(`Birthday command`)
        .addSubcommand((subcommand) =>
            localHelper.birthdayUserInput(subcommand, subcommandSet)
        )
        .addSubcommand((subcommand) =>
            localHelper.birthdayUserInput(subcommand, subcommandUpdate)
        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName(subcommandDelete)
                .setDescription(`Delete your birthday`)
        ),
    async execute(interaction) {
        const getSubcommand = interaction.options.getSubcommand();
        functionsHelper.logDevModeOnly(`getSubcommand : ${getSubcommand}`);
        switch (getSubcommand) {
            case subcommandSet:
                localHelper.setBirthdayDate(interaction);
                break;
            case subcommandUpdate:
                await interaction.reply(`update date`);
                break;
            case subcommandDelete:
                await interaction.reply(`off to gulag`);
                break;
            default:
                await interaction.reply(`return`);
                break;
        }
    },
};