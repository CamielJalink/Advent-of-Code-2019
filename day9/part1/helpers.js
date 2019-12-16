"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
// This function returns an array of integers created by parsing a string-input.
function createIntArray(input) {
    var inputStringArray = input.split(",");
    var inputArray = [];
    inputStringArray.forEach(function (num) {
        inputArray.push(parseInt(num));
    });
    return inputArray;
}
// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
function getInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        return createIntArray(input);
    });
}
exports.getInput = getInput;
function multiTest(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        // op enters de verschillende tests inlezen
        var testStringArray = input.split("\n");
        var multipleTestsArray = [];
        testStringArray.forEach(function (testString) {
            multipleTestsArray.push(createIntArray(testString));
        });
        return multipleTestsArray;
    });
}
exports.multiTest = multiTest;
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
        case 9: // add or subtract from base relative base. 
            return 1;
        case 99:
            return 0;
        default:
            return new Error();
    }
}
function parseInstruction(input) {
    var translatedInstruction = [];
    translatedInstruction.push(input % 100); // First, find the opcode type
    input = Math.floor(input / 100); // and remove that part from the input number
    var numParams = paramsPerInstruction(translatedInstruction[0]); // get #params
    for (var i = 0; i < numParams; i++) {
        translatedInstruction.push(input % 10);
        input = Math.floor(input / 10);
    }
    return translatedInstruction;
}
exports.parseInstruction = parseInstruction;
