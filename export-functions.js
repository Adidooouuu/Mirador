const dotenv = require(`dotenv`);
dotenv.config();
const fs = require(`node:fs`);
const path = require(`node:path`);

/**
 * 
 * @returns {Boolean}
 */
function isDevMode() {
    return process.env.SELECTED_ENV === `dev`;
}

/**
 * 
 * @param {*} info 
 * @param {String} key 
 * @param {String} title
 * 
 * @returns {void}
 */
function logDevModeOnly(info, key = ``, title = ``) {
    if (isDevMode()) {

        let msg = `\x1b[32m%s\x1b[0m`;

        if (key === ``) {
            console.log(msg, info);
        }
        else {
            msg = `\x1b[42m\x1b[37m%s : \x1b[0m` + msg;
            console.log(msg, key, info);

            if (title !== ``) {
                msg = `\x1b[40m\x1b[37m%s - \x1b[0m` + msg;
                console.log(msg, title, key, info);
            }
        }
    }
}

/**
 * 
 * @param {[*]} list
 * @param {String} key
 * @param {String} title
 */
function logListDevModeOnly(list, key, title) {
    for (const elem of list) {
        logDevModeOnly(
            elem,
            `${key} elem ${list.indexOf(elem) + 1}`,
            title);
    }
}

/**
 * 
 * @param {any} file 
 * @returns {boolean}
 */
function isDataExecuteHere(file) {
    return `data` in file && `execute` in file;
}

/**
 * 
 * @param {[*]} list 
 * @returns {boolean}
 */
function isListNotFilled(list) {
    return list === undefined || list.length == 0;
}

/**
 *
 * @param {String} directory
 * @param {String[]} jsFilesList
 * 
 * @returns {String[]}
 */
function getAllJsFiles(directory, jsFilesList = []) {
    const foldersPath = path.join(__dirname, directory);

    const filesInDirectory = fs.readdirSync(foldersPath, { recursive: true }).filter(file => file.endsWith(`.js`));
    try {
        for (const file of filesInDirectory) {
            const filePath = path.join(directory, file);
            jsFilesList.push(`./${filePath}`);
            logDevModeOnly(file, `file`, `getAllJsFiles()`);
        }
    } catch (error) {
        logDevModeOnly(error, `error`, `getAllJsFiles()`);
    }

    logDevModeOnly(jsFilesList.length, `jsFilesList.length`, `getAllJsFiles()`);

    return jsFilesList;
};

/**
 * 
 * @param {string[]} filesList
 * @param {string[]} validFilesList
 * 
 * @returns {String[]}
 */
function actOnDataExecutePresence(filesList, validFilesList = []) {
    if (isListNotFilled(filesList)) {
        logDevModeOnly(
            `actOnDataExecutePresence() - filesList === undefined : ${filesList === undefined} ||||
            filesList.length == 0 : ${filesList.length == 0}`
        );
    }
    else {
        for (const filePath of filesList) {
            try {
                const jsFile = require(filePath);

                logDevModeOnly(isDataExecuteHere(jsFile), `isDataExecuteHere()`, `actOnDataExecutePresence()`);

                isDataExecuteHere(jsFile)
                    ? validFilesList.push(filePath)
                    : logDevModeOnly(`La commande à l'emplacement ${filePath} requiert les propriétés suivantes : "data" et "execute".`);

            } catch (error) {
                logDevModeOnly(`Erreur pour la commande à l'emplacement ${filePath} : ${error}`);
            }
        }
    }
    return validFilesList;
}

/**
 *
 * @param {String} directory
 * @param {String[]} validFilesList
 * 
 * @returns {String[]}
 */
function getPathsForCommandsWithDataExecute(directory, validFilesList = []) {
    const filesList = getAllJsFiles(directory);
    return actOnDataExecutePresence(filesList, validFilesList);
}

/**
 * 
 * @returns {number}
 */
function getActualYear() {
    const date = new Date();
    return date.getFullYear();
}

module.exports = {
    getPathsForCommandsWithDataExecute,
    logDevModeOnly,
    logListDevModeOnly,
    getActualYear
};