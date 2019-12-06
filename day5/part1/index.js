"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
// probably a bit overkill but this function checks whether positions in the inputarray exist.
function inputIsValid(input, i) {
    var positionsValid = true;
    if (input[i + 1] > input.length || input[i + 2] > input.length || input[i + 3] > input.length) {
        console.log("Error: illegal arrayposition");
        positionsValid = false;
    }
    return positionsValid;
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function parseInput(input) {
    var i = 0;
    var isRunning = true;
    var pos1, pos2, targetPos;
    while (isRunning) {
        pos1 = input[i + 1];
        pos2 = input[i + 2];
        targetPos = input[i + 3];
        switch (input[i]) {
            case 1:
                if (inputIsValid(input, i)) {
                    input[targetPos] = input[pos1] + input[pos2];
                }
                else {
                    isRunning = false;
                }
                break;
            case 2:
                if (inputIsValid(input, i)) {
                    input[targetPos] = input[pos1] * input[pos2];
                }
                else {
                    isRunning = false;
                }
                break;
            case 99:
                console.log("Found a 99, we're done here");
                isRunning = false;
                break;
            default:
                console.log("unexpected number found, error!");
                isRunning = false;
        }
        i += 4;
        if (i >= input.length) {
            isRunning = false;
        }
    }
    return input;
}
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var inputStringArray = input.split(",");
        var inputArray = [];
        inputStringArray.forEach(function (num) {
            inputArray.push(parseInt(num));
        });
        var outputArray = parseInput(inputArray);
        console.log(outputArray[0]);
    });
}
advent();
