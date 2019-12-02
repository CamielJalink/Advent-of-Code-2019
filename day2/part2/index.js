"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
// probably a bit overkill but this function checks whether positions in the inputarray exist.
function inputIsValid(memory, i) {
    var positionsValid = true;
    if (memory[i + 1] > memory.length || memory[i + 2] > memory.length || memory[i + 3] > memory.length) {
        console.log("Error: illegal memory address");
        positionsValid = false;
    }
    return positionsValid;
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function intcode(memory) {
    var i = 0; // i for instruction, of course..
    var isRunning = true;
    var param1, param2, param3;
    while (isRunning) {
        param1 = memory[i + 1];
        param2 = memory[i + 2];
        param3 = memory[i + 3];
        switch (memory[i]) {
            case 1:
                if (inputIsValid(memory, i)) {
                    memory[param3] = memory[param1] + memory[param3];
                }
                else {
                    isRunning = false;
                }
                break;
            case 2:
                if (inputIsValid(memory, i)) {
                    memory[param3] = memory[param1] * memory[param2];
                }
                else {
                    isRunning = false;
                }
                break;
            case 99:
                console.log("Instruction 99, we're done here");
                isRunning = false;
                break;
            default:
                console.log("unexpected instruction found, error!");
                isRunning = false;
        }
        i += 4;
        if (i >= memory.length) {
            isRunning = false;
        }
    }
    return memory;
}
// function 
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var inputStringArray = input.split(",");
        var memory = [];
        inputStringArray.forEach(function (num) {
            memory.push(parseInt(num));
        });
        var outputArray = intcode(memory);
        console.log(outputArray[0]);
    });
}
advent();
