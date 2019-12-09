"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
function getInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        var inputStringArray = input.split(",");
        var inputArray = [];
        inputStringArray.forEach(function (num) {
            inputArray.push(parseInt(num));
        });
        return inputArray;
    });
}
exports.getInput = getInput;
// Old helper function from day2 that I'm no longer using.
// export function inputIsValid(input: number[], i: number) {
//   let positionsValid: boolean = true;
//   if (input[i + 1] > input.length || input[i + 2] > input.length || input[i + 3] > input.length) {
//     console.log("Error: illegal arrayposition")
//     positionsValid = false;
//   }
//   return positionsValid;
// }
function paramsPerInstruction(instruction) {
    switch (instruction) {
        case 1:
            return 3;
        case 2:
            return 3;
        case 3:
            return 1;
        case 4:
            return 1;
        case 99:
            return 0;
        default:
            return new Error();
    }
}
function parseOpcode(input) {
    var translatedOpcode = [];
    translatedOpcode.push(input % 100); // first number is the opcode instruction
    input = Math.floor(input / 100); // remove the two digits determining the opcode.
    var numParams = paramsPerInstruction(translatedOpcode[0]);
    for (var i = 0; i < numParams; i++) {
        translatedOpcode.push(input % 10);
        input = Math.floor(input / 10);
    }
    return translatedOpcode;
}
exports.parseOpcode = parseOpcode;
