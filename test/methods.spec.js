/* eslint-disable quotes */
/* eslint-disable no-undef */
const {
    getStatusCode,
    getTextFileHref, searchFilesOrDirectory, getPropertiesOfObject,
    validityStatusCode, getLinks,
    getStatsUniqueBroken, getStatsUnique,
// eslint-disable-next-line quotes
} = require("../src/methods");
  
// eslint-disable-next-line no-undef
// eslint-disable-next-line quotes
jest.mock("chalk", () => ({
    // eslint-disable-next-line quotes
    green: jest.fn(() => "green"),
    // eslint-disable-next-line quotes
    yellow: jest.fn(() => "yellow"),
    // eslint-disable-next-line quotes
    red: jest.fn(() => "red"),
    // eslint-disable-next-line quotes
    yellowBright: jest.fn(() => "yellowBright"),
    // eslint-disable-next-line quotes
    blue: jest.fn(() => "blue"),
    // eslint-disable-next-line quotes
    bgRed: jest.fn(() => "bgRed"),
    bold: {
    // eslint-disable-next-line quotes
        redBright: jest.fn(() => "redBright"),
        // eslint-disable-next-line quotes
        magenta: jest.fn(() => "magenta"),
    },
}));
  
describe("searchFilesOrDirectory", () => {
    it("if pathUser is a file return a file markdown", () => {
        const pathUser = "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md";
        expect(searchFilesOrDirectory(pathUser, [])).toEqual(["D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md"]);
    });
    it("if pathUSer is a folder return a array's file markdown", () => {
        const pathUser = "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md";
        expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md");
    });
});
  
describe("getTextFileHref", () => {
    it("Return an object array with file, href and text(text with less a 50 characters)", () => {
        const arrayFiles = [
            "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
        ];
        expect(getTextFileHref(arrayFiles)).toEqual([{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",
        }]);
    });
});
  
describe("getStatusCode", () => {
    it("Return a number of status code", () => {
        const link = "https://es.wikipedia.org/wiki/Markdown";
        getStatusCode(link).then((n) => {
            expect(n).toBe(200);
        });
    });
    it("Return status code (https's protocol)", () => {
        const link = "https://es.wikipedia.org/wiki/Markdown";
        return expect(getStatusCode(link)).resolves.toBe(200);
    });
    it("Return status code(http's protocol)", () => {
        const link = "http://es.wikipedia.org/wiki";
        return expect(getStatusCode(link)).resolves.toBe(301);
    });
    it("Return a message when request fail (https's protocol)", () => {
        const link = "https://fakecccaa1.com";
        return expect(getStatusCode(link)).resolves.toBe("problem with request: getaddrinfo ENOTFOUND fakecccaa1.com on the link (https://fakecccaa1.com)");
    });
    it("Return a message when request fail (http's protocol)", () => {
        const link = "http://fakecccaa1.com";
        return expect(getStatusCode(link)).resolves.toBe("problem with request: getaddrinfo ENOTFOUND fakecccaa1.com on the link(http://fakecccaa1.com)");
    });
    it("Return a message when protocol is not http or https", () => {
        const link = "ftp://fakecccaa1.com";
        return expect(getStatusCode(link)).resolves.toBe("problem with request: this protocol's link ftp://fakecccaa1.com is not http or https");
    });
});

describe("validityStatusCode", () => {
    it("Return Ok due to a valid number", () => {
        expect(validityStatusCode(200)).toBe("Ok");
        expect(validityStatusCode(301)).toBe("Ok");
        expect(validityStatusCode(302)).toBe("Ok");
    });
    it("Return Fail due to a invalid number", () => {
        expect(validityStatusCode(404)).toBe("Fail");
    });
});
  
describe("getPropertiesOfObject", () => {
    it("Return an object array (file,href,text) when option is false", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const optionTrueFalse = { validate: false };
        return expect(getPropertiesOfObject(route, optionTrueFalse)).resolves.toEqual([{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá"
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",}]);
    });
    it("Return an object array (file,href,text,statusCode,status) when option is true", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const optionTrueFalse = { validate: true };
        return expect(getPropertiesOfObject(route, optionTrueFalse)).resolves.toEqual([{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
            statusCode: 301,
            status: "ok",
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",
            statusCode: 301,
            status: "ok",
        }]);
    });
});
  
describe("getLinks", () => {
    it("Return a number of unique link", () => {
        const arrayObject = [
            { href: "https://developers.google.com/v8/" },
            { href: "https://developers.google.com/v8/" },
            { href: "https://docs.npmjs.com/cli/install/" }];
        expect(getLinks(arrayObject)).toBe(2);
    });
});
  
describe("getStatsUniqueBroken", () => {
    it("Return an object array with data total and unique and broken", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://docs.npmjs.com/cli/install",
            text: "docs oficiales de `npm install` acá",
            status: "Fail",
        }, {
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://github.com/Laboratoria/course-parser",
            text: "`course-parser`",
            statusCode: 301,
            status: "Ok",
        }];
        expect(getStatsUniqueBroken(arrayObject)).toEqual([{ Unique: 2, total: 2, Broquen: 1 }]);
    });
});
  
describe("getStatsUnique", () => {
    it("Return an object array with data total and unique", () => {
        const arrayObject = [{
            file: "D:\\Laboratoria\\md-links\\LIM17-md-links\\examples\\folder\\directory1\\readme6.md",
            href: "https://developers.google.com/v8/",
            text: "motor de JavaScript V8 de Chrome",
        }];
        expect(getStatsUnique(arrayObject)).toEqual([{ Unique: 1, total: 1 }]);
    });
});