/* eslint-disable no-undef */
/* eslint-disable quotes */
const {
    printObject,
    printStatAndValidate,
    printObjectFalse,
    printObjectStats,
} = require("../src/util");
  
jest.mock("chalk", () => ({
    green: jest.fn(() => "green"),
    yellow: jest.fn(() => "yellow"),
    red: jest.fn(() => "red"),
    yellowBright: jest.fn(() => "yellowBright"),
    blue: jest.fn(() => "blue"),
    bgRed: jest.fn(() => "bgRed"),
    bold: {
        redBright: jest.fn(() => "redBright"),
        magenta: jest.fn(() => "magenta"),
    },
}));
describe("printObject", () => {
    it("Return a text with properties and colors", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md\n",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
            statusCode: 404,
            status: "Fail",
        },
        ];
        const result = "*File:green Href:yellow Text:blue Status:redBright StatusCode:yellowBright\n";
        expect(printObject(arrayObject)).toBe(result);
    });
    it("Return a text with properties and colors", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "course-parser",
            statusCode: 301,
            status: "Ok",
        }];
        const result = "*File:green Href:yellow Text:blue Status:magenta StatusCode:yellowBright\n";
        expect(printObject(arrayObject)).toBe(result);
    });
});
  
describe("printObjectFalse", () => {
    it("Return a text with properties and colors", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md\n",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
        },
        ];
        const result = "*File:green Href:yellow Text:blue\n";
        expect(printObjectFalse(arrayObject)).toBe(result);
    });
    it("Return a text with properties and colors", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "course-parser",
        }];
        const result = "*File:green Href:yellow Text:blue\n";
        expect(printObjectFalse(arrayObject)).toBe(result);
    });
});
describe("printStatAndValidate", () => {
    it("Return a text with properties and colors", () => {
        const arrayObject = [
            {
                file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md",
                href: "https://github.com/Laboratoria/course-parser",
                text: "course-parser",
                statusCode: 301,
                status: "Ok",
            }];
        
        const result = `
           --------------------
              bgRed : yellowBright 
              bgRed : yellowBright
              bgRed : yellowBright
           --------------------
      `;
        expect(printStatAndValidate(arrayObject)).toBe(result);
    });
});
  
describe("printObjectStats", () => {
    it("Return a text with properties and colors", () => {
        const arrayObject = [
            {
                file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory\\file6.md",
                href: "https://github.com/Laboratoria/course-parser",
                text: "course-parser",
                statusCode: 301,
                status: "Ok",
            }];
        const result = `
       --------------------
        bgRed : yellowBright 
        bgRed : yellowBright
       --------------------
    `;
        expect(printObjectStats(arrayObject)).toBe(result);
    });
});