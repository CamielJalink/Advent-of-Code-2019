"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return runTests()
        .then(function () { return helpers_1.getInput("input.txt")
        .then(function (inputArray) {
        //console.log(runProgram(inputArray));
    }); });
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input) {
    var i = 0;
    var isRunning = true;
    while (isRunning) {
        var opcode = helpers_1.parseOpcode(input[i]);
        switch (opcode[0]) {
            case 1:
                input[opcode[3]] = input[opcode[1]] + input[opcode[2]];
                break;
            case 2:
                input[opcode[3]] = input[opcode[1]] + input[opcode[2]];
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
function runTests() {
    return helpers_1.getInput("day2input.txt").then(function (inputArray) {
        var outputArray = runProgram(inputArray);
        if (outputArray[0] === 3760627) {
            console.log("SUCCESS!!! Day2part1 test succesfull");
        }
        else {
            console.log("ERROR!!! Day2part1 test value is " + outputArray[0] + " instead of 3760627");
        }
    });
}
advent();
