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
        case 5: // jump if true
            return 2;
        case 6: // jump if false
            return 2;
        case 7: // less than
            return 3;
        case 8: // equals
            return 3;
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
