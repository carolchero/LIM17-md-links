/* eslint-disable quotes */
const chalk = require("chalk");
const {
    getStatsUnique, // obtener estadisticas rotas
} = require("./methods");


const printObject = (arrayObject) => { //imprimir objetos
    const options =  arrayObject.map(propertiesObject => {
        const file = chalk.green(propertiesObject.file);
        console.log(file);
        const link = chalk.yellow(propertiesObject.href);
        const number = chalk.yellowBright(propertiesObject.statusCode);
        const text = chalk.blue(propertiesObject.text);
        let status = propertiesObject.status;
        const color = (propertiesObject.status === "Fail") ? chalk.bold.redBright(status) : chalk.bold.magenta(status);
        const properties= `*File:${file} Href:${link} Text:${text} Status:${color} StatusCode:${number}\n`;
        return properties;
    });
    return options.join("");
};
//console.log(printObject("D:\\Laboratoria\\md-links\\LIM17-md-links\\README.md"))

const  printObjectFalse = (arrayObject) => {
    const options = arrayObject.map(propertiesObject => {
        const file = chalk.green(propertiesObject.file);
        const link = chalk.yellow(propertiesObject.href);
        const text = chalk.blue(propertiesObject.text);
        const properties = `*File:${file} Href:${link} Text:${text}\n`;
        return properties;
    });
    return options.join("");
};

const printObjectStats = (arrayObject) => {
    const stats = getStatsUnique(arrayObject);
    // console.log("stats")
    // console.log(stats)
    const options = stats.map((stat) => {
        const properties = `
  --------------------
    ${chalk.bgRed('**Total  ')} : ${chalk.yellowBright(stat.total)} 
    ${chalk.bgRed('**Unique ')} : ${ chalk.yellowBright(stat.Unique)}
  --------------------
  `;
        return properties;
    });
    return options.join("");
};

const printStatAndValidate = (arrayObjectStats) => {
    const options = arrayObjectStats.map((stat) => {
        const properties = `
    --------------------
       ${chalk.bgRed('**Total   ')} : ${chalk.yellowBright(stat.total)} 
       ${chalk.bgRed('**Unique  ')} : ${ chalk.yellowBright(stat.Unique)}
       ${chalk.bgRed('**Broquen ')} : ${ chalk.yellowBright(stat.Broquen)}
    --------------------
    `;
        return properties;
    });
    return options.join("");

};

module.exports = {
    printObject,
    printObjectStats,
    printStatAndValidate,
    printObjectFalse,
};