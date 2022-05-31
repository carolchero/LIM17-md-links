/* eslint-disable quotes */
/* eslint-disable no-undef */
const fs = require("node:fs");
const inputUser = process.argv.slice(3);// entrada del usuario argumentos ingresados en la consola
const pathUser = process.argv[2];// ruta del usuario
const existRoute = (route) => fs.existsSync(route);//existe ruta
//console.log(existRoute("D:\\Laboratoria\\md-links\\LIM17-md-links\\README.md"))
const chalk = require('chalk'); // cambio de colores
const path = require("node:path");
// eslint-disable-next-line no-unused-vars
const pathToAbsolute = (paths) => path.resolve(paths);//si es una ruta absoluta

const {
    getPropertiesOfObject, // obtener propiedades de objetos
    getStatsUniqueBroken, // obtener estadisticas  unicos rotos
} = require("./methods");

const {
    printObject, // imprimir objetos
    printObjectStats, // imprimir estadisticas d objetos
    printStatAndValidate, // imprimir estadidticas validos
    printObjectFalse, // imprimir objetos falsos
} = require("./util");

const validateRoute = (route) => existRoute(route) ? route : "inexistente";//ver si la ruta es valida y devuelve la ruta
//console.log(validateRoute("D:\\Laboratoria\\md-links\\LIM17-md-links\\README.md"));

const mdLinks = (route, options) => new Promise((resolve) => {
    getPropertiesOfObject(route, options) // array de objetos
        .then((arrayObject) => {
            resolve(arrayObject);
        });
});
//console.log(mdLinks("D:\\Laboratoria\\md-links\\LIM17-md-links\\README.md",{}))

const getExistOption = (input) => { //existe la opcion
    let result;
    if (input[0] === undefined) {
        result = false;
    } else if (input[1] === undefined) {
        if (input.includes("--validate")) {
            result = true;
        } else if (input.includes("--stats")) {
            result = false;
        } else {
            result = "inexistente";
        }
    } else {
        if (input.includes("--stats") && input.includes("--validate")) {
            result = true;
        } else {
            result = "inexistente";
        }
    }
    return result;
};
//console.log(getExistOption(["--validate", undefined]))


const cliFunction = (route, option) =>  {
    const newOptions = getExistOption(option);//nuevas opciones
    const newRoutes = validateRoute(route);// nuevas rutas
    const validateTrueOrFalse = option.includes('--validate');// validarverdaderoofalso
    if (newOptions === "inexistente") {
        console.log(chalk.red("This option does not exist."));
        return "This option does not exist.";
    // reject(console.error(chalk.red("This option does not exist.")));
    } else if (newRoutes === "inexistente") {
        console.log(chalk.red("This route does not exist."));
        return "This route does not exist.";
        // reject(console.error(chalk.red("This route does not exist.")))
    } else {
        mdLinks(route, { validate : validateTrueOrFalse})
            .then((arrayObject) => {
                if (option[0] === undefined) {
                    const result = printObjectFalse(arrayObject);
                    console.log(result);
                } else if (option[1] === undefined) {
                    if (option[0] === "--validate") {
                        const result = printObject(arrayObject);
                        console.log(result);
                    } else if (option.includes("--stats")) {
                        const result = printObjectStats(arrayObject);
                        console.log(result);
                    }
                } else {
                    if (option.includes("--stats") && option.includes("--validate")) {
                        const arrayObjectStats = getStatsUniqueBroken(arrayObject);
                        const result = printStatAndValidate(arrayObjectStats);
                        console.log(result);}
                }
            });
        return "route processed";}
};

console.log(cliFunction(pathUser, inputUser));
//console.log(cliFunction(".\\examples\\folder\\directory\\file6.md",[undefined]))





module.exports = {
    mdLinks,
    validateRoute,
    getExistOption,
    cliFunction,
};

