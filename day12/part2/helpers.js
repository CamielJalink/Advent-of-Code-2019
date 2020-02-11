"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
function getInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        var inputStringArray = input.split("\r\n");
        inputStringArray = inputStringArray.map(function (line) {
            line = line.replace('>', '');
            line = line.replace('<', '');
            return line;
        });
        return inputStringArray;
    });
}
exports.getInput = getInput;
