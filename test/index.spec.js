/* eslint-disable no-undef */
/* eslint-disable quotes */
const {
    mdLinks,
    getExistOption,
    cliFunction,
} = require("../src/index");
  
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
  
describe("mdLinks", () => {
    it("Return a array object (href,text,file,statusCode, status)", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const validate = ["--validate", "--stats"];
        const result = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
            statusCode: 404,
            status: "Fail",
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",
            statusCode: 301,
            status: "Ok",
        }];
        mdLinks(route, { validate: validate.includes("--validate") }).then((arrayObject) => {
            expect(arrayObject).toEqual(result);
        });
    });
    it("Return a array object (href,text,file)", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = { validate: false };
        const result = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",
        }];
        mdLinks(route, option).then((arrayObject) => {
            expect(arrayObject).toEqual(result);
        });
    });
});
  
describe("cliFunction", () => {
    it("Promise rejects a red message", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = ["--sta", undefined];
        expect(cliFunction(route, option)).rejects.toEqual("red");
    });
    it("Promise resolves a string with data", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = ["--stats", undefined];
        const result = `
    --------------------
      bgRed : yellowBright 
      bgRed : yellowBright
    --------------------
    `;
        expect(cliFunction(route, option)).resolves.toEqual(result);
    });
    it("Promise resolves a string with data", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = [undefined];
        const result = "*File:green Href:yellow Text:blue\n*File:green Href:yellow Text:blue\n";
        expect(cliFunction(route, option)).resolves.toBe(result);
    });
    it("Promise not resolves this string with data", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = ["--stats", "--validate"];
        const result = `
      --------------------
         bgRed : yellowBright 
         bgRed : yellowBright
      --------------------
      `;
        cliFunction(route, option).then((n) => {
            expect(n).not.toBe(result);
        });
    });
    it("Promise not resolves this string with data", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = ["--validate", undefined];
        const result = `
      --------------------
         bgRed : yellowBright 
         bgRed : yellowBright
      --------------------
      `;
        cliFunction(route, option).then((n) => {
            expect(n).not.toBe(result);
        });
    });
});
  
describe("getExistOption", () => {
    it("Return true if comand exist", () => {
        const input = ["--validate", undefined];
        expect(getExistOption(input)).toBe(true);
    });
    it("Return true if comand exist", () => {
        const input = ["--validate", "--stats"];
        expect(getExistOption(input)).toBe(true);
    });
    it("Return false if comand exist", () => {
        const input = ["--stats", undefined];
        expect(getExistOption(input)).toBe(false);
    });
    it("Return false if comand exist", () => {
        const input = [undefined];
        expect(getExistOption(input)).toBe(false);
    });
    it("Return inexistente if comand is not exist", () => {
        const input = ["-stat", undefined];
        expect(getExistOption(input)).toBe("inexistente");
    });
    it("Return inexistente if comand is not exist", () => {
        const input = ["-cmdno", "noexist"];
        expect(getExistOption(input)).toBe("inexistente");
    });
});