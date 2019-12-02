"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
function parseInput(input) {
    var output = input;
    var i = 0;
    var isRunning = true;
    while (isRunning) {
    }
}
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var inputStringArray = input.split(",");
        var inputArray = [];
        inputStringArray.forEach(function (num) {
            inputArray.push(parseInt(num));
        });
    });
}
advent();
