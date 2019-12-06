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
// This helperfunction checks whether the parameters of an opcode are still within the array.
function inputIsValid(input, i) {
    var positionsValid = true;
    if (input[i + 1] > input.length || input[i + 2] > input.length || input[i + 3] > input.length) {
        console.log("Error: illegal arrayposition");
        positionsValid = false;
    }
    return positionsValid;
}
exports.inputIsValid = inputIsValid;
