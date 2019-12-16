"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return runTests()
        .then(function () { return helpers_1.getInput("input.txt")
        .then(function (program) {
        console.log("starting day9part1");
    }); });
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input, opcodeInput) {
    var i = 0;
    var relativeBase = 0;
    var isRunning = true;
    var opcodeOutputs = [];
    opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.
    while (isRunning) {
        var instruction = helpers_1.parseInstruction(input[i]); // Builds a small array that contains the opcode, and the TYPE of parameters (0 or 1) it has.
        // The instruction array contains both the intcode as well as the parameter modes
        switch (instruction[0]) {
            case 1: // Summation opcode
                var sum1 = 0, sum2 = 0;
                if (instruction[1] === 0) { // position mode
                    sum1 = input[input[i + 1]];
                }
                else if (instruction[1] === 2) { // relative mode
                    sum1 = input[input[i + 1 + relativeBase]];
                }
                else {
                    sum1 = input[i + 1]; // immediate mode
                }
                if (instruction[2] === 0) {
                    sum2 = input[input[i + 2]];
                }
                else if (instruction[2] === 2) {
                    sum2 = input[input[i + 2 + relativeBase]];
                }
                else {
                    sum2 = input[i + 2];
                }
                if (instruction[3] === 0) {
                    input[input[i + 3]] = sum1 + sum2; // third param is in position or relative mode.
                }
                else if (instruction[3] === 2) {
                    input[input[i + 3 + relativeBase]] = sum1 + sum2;
                }
                i += 4;
                break;
            case 2: // Multiplication opcode
                var mult1 = 0, mult2 = 0;
                if (instruction[1] === 0) {
                    mult1 = input[input[i + 1]];
                }
                else if (instruction[1] === 2) {
                    mult1 = input[input[i + 1 + relativeBase]];
                }
                else {
                    mult1 = input[i + 1];
                }
                if (instruction[2] === 0) {
                    mult2 = input[input[i + 2]];
                }
                else if (instruction[2] === 2) {
                    mult2 = input[input[i + 2 + relativeBase]];
                }
                else {
                    mult2 = input[i + 2];
                }
                input[input[i + 3]] = mult1 * mult2;
                i += 4;
                break;
            case 3: // Input opcode
                // "Parameters that an instruction writes to will never be in immediate mode"   <-- so we don't have to check opcode[1] 
                if (opcodeInput.length > 0) {
                    input[input[i + 1]] = opcodeInput.pop();
                }
                else {
                    throw new Error("No input for opcode 3 was specified");
                }
                i += 2;
                break;
            case 4: // Output opcode
                // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
                if (instruction[1] === 0) {
                    opcodeOutputs.push(input[input[i + 1]]);
                }
                else {
                    opcodeOutputs.push(input[i + 1]);
                }
                i += 2;
                break;
            case 5: //Jump-if-true opcode
                //changes the (i) instruction pointer if i+1 is not 0
                var i1IsNotZero = false;
                if (instruction[1] === 0) {
                    if (input[input[i + 1]] !== 0) {
                        i1IsNotZero = true;
                    }
                }
                else {
                    if (input[i + 1] !== 0) {
                        i1IsNotZero = true;
                    }
                }
                if (i1IsNotZero) {
                    if (instruction[2] === 0) {
                        i = input[input[i + 2]];
                    }
                    else {
                        i = input[i + 2];
                    }
                }
                else {
                    i += 3;
                }
                break;
            case 6: // jump-if-false opcode
                // Changes the (i) instruction pointer if the i+1 is 0
                var i1IsZero = false;
                if (instruction[1] === 0) {
                    if (input[input[i + 1]] === 0) {
                        i1IsZero = true;
                    }
                }
                else {
                    if (input[i + 1] === 0) {
                        i1IsZero = true;
                    }
                }
                if (i1IsZero) {
                    if (instruction[2] === 0) {
                        i = input[input[i + 2]];
                    }
                    else {
                        i = input[i + 2];
                    }
                }
                else {
                    i += 3;
                }
                break;
            case 7: // less-than opcode
                var ltNum1 = 0, ltNum2 = 0;
                if (instruction[1] === 0) { // first param
                    ltNum1 = input[input[i + 1]];
                }
                else {
                    ltNum1 = input[i + 1];
                }
                if (instruction[2] === 0) { // second param
                    ltNum2 = input[input[i + 2]];
                }
                else {
                    ltNum2 = input[i + 2];
                }
                if (ltNum1 < ltNum2) { // third param is always in position mode
                    input[input[i + 3]] = 1;
                }
                else {
                    input[input[i + 3]] = 0;
                }
                i += 4;
                break;
            case 8: // equals opcode
                var eqNum1 = 0, eqNum2 = 0;
                if (instruction[1] === 0) { // first param
                    eqNum1 = input[input[i + 1]];
                }
                else {
                    eqNum1 = input[i + 1];
                }
                if (instruction[2] === 0) { // second param
                    eqNum2 = input[input[i + 2]];
                }
                else {
                    eqNum2 = input[i + 2];
                }
                if (eqNum1 === eqNum2) { // third param is always in position mode
                    input[input[i + 3]] = 1;
                }
                else {
                    input[input[i + 3]] = 0;
                }
                i += 4;
                break;
            case 99:
                isRunning = false;
                break;
            default:
                console.log("unexpected number found, error!");
                isRunning = false;
        }
        if (i >= input.length) {
            isRunning = false;
        }
    }
    return opcodeOutputs;
}
function runTests() {
    return helpers_1.multiTest("day5tests.txt")
        .then(function (testPrograms) {
        var day5inputs = [[8], [6], [7], [3], [2], [0], [8], [1]];
        var day5outputs = [[1], [1], [0], [1], [1], [0], [1000], [0, 0, 0, 0, 0, 0, 0, 0, 0, 5346030]];
        for (var i = 0; i < testPrograms.length; i++) {
            var output = runProgram(testPrograms[i], day5inputs[i]);
            if (output[0] !== day5outputs[i][0]) {
                console.log("Error in day5 test number " + (i + 1));
                console.log("Expected " + output[0] + " to be " + day5outputs[i][0]);
            }
        }
    });
}
advent();
