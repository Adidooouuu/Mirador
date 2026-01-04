const functionsHelper = require(`../../../export-functions`);

/**
 * 
 * @param {number} month
 * @param {number} year
 * 
 * @returns {number}
 */
function defineExpectedDaysCountByMonth(month, year) {
    const oddMonths = [1, 3, 5, 7, 8, 10, 12];
    const evenMonths = [4, 6, 9, 11];
    const february = 2;

    if (month === february) {
        return (year % 4 === 0) ? 29 : 28;
    }
    else if (evenMonths.includes(month)) {
        return 30;
    }
    else if (oddMonths.includes(month)) {
        return 31;
    }
    else {
        return 0;
    }
}

/**
 * 
 * @param {number} day 
 * @param {number} month 
 * @param {number} year 
 * @returns {boolean}
 */
function isDateCorrect(day, month, year) {
    const daysCount = defineExpectedDaysCountByMonth(month, year);
    const monthCount = 12;
    const isDayOk = day >= 1 && day <= daysCount;
    const isMonthOk = month >= 1 && month <= monthCount;
    const isYearOk = year >= 1900 && year <= functionsHelper.getActualYear();

    functionsHelper.logDevModeOnly(
        `
        day : ${day}\n
        month : ${month}\n
        year : ${year}\n
        daysCount : ${daysCount}\n
        monthCount : ${monthCount}\n 
        isDayOk : ${isDayOk}\n
        isMonthOk : ${isMonthOk}\n
        isYearOk : ${isYearOk}
        `
    );

    return (isDayOk && isMonthOk && isYearOk);
}

/**
 * 
 * @param {*} interaction 
 * @returns {*}
 */
async function createBirthdayDate(interaction) {
    const day = interaction.options.getInteger(`day`);
    const month = interaction.options.getInteger(`month`);
    const year = interaction.options.getInteger(`year`);
    const shareAge = interaction.options.getBoolean(`share`);

    /*const birthday = (isDateCorrect(day, month, year)) ? new Date(year, month - 1, day) : new Date(1899, 1, 1);*/

    isDateCorrect(day, month, year) ? console.log("oui") : console.log("non");

    await interaction.reply(`Set date`);
}

module.exports = {
    createBirthdayDate
};