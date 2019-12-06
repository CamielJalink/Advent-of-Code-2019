"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
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
        .then(function () { return formatInput("input.txt")
        .then(function (inputArray) {
        var outputArray = parseInput(inputArray);
        console.log(outputArray[0]);
    }); });
}
function runTests() {
    return formatInput("day2input.txt").then(function (inputArray) {
        var outputArray = parseInput(inputArray);
        if (outputArray[0] === 3760627) {
            console.log("SUCCESS!!! Day2part1 test succesfull");
        }
        else {
            console.log("ERROR!!! Day2part1 test value is " + outputArray[0] + " instead of 3760627");
        }
    });
}
// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
function formatInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        var inputStringArray = input.split(",");
        var inputArray = [];
        inputStringArray.forEach(function (num) {
            inputArray.push(parseInt(num));
        });
        return inputArray;
    });
}
advent();
