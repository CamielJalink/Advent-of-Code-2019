"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
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
                if (helpers_1.inputIsValid(input, i)) {
                    input[targetPos] = input[pos1] + input[pos2];
                }
                else {
                    isRunning = false;
                }
                break;
            case 2:
                if (helpers_1.inputIsValid(input, i)) {
                    input[targetPos] = input[pos1] * input[pos2];
                }
                else {
                    isRunning = false;
                }
                break;
            case 99:
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
// Starts program
function advent() {
    // runs any tests, and after finishing those starts with the current problem
    return runTests()
        .then(function () { return helpers_1.getInput("input.txt")
        .then(function (inputArray) {
        var outputArray = parseInput(inputArray);
        console.log(outputArray[0]);
    }); });
}
function runTests() {
    return helpers_1.getInput("day2input.txt").then(function (inputArray) {
        var outputArray = parseInput(inputArray);
        if (outputArray[0] === 3760627) {
            console.log("SUCCESS!!! Day2part1 test succesfull");
        }
        else {
            console.log("ERROR!!! Day2part1 test value is " + outputArray[0] + " instead of 3760627");
        }
    });
}
advent();
