"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return runTests()
        .then(function () { return helpers_1.getInput("input.txt")
        .then(function (inputArray) {
        console.log("starting day7part1");
        var maxThrusterSignal = tryAmplifiers(inputArray, [0, 1, 2, 3, 4], [0]);
        console.log(maxThrusterSignal);
    }); });
}
function tryAmplifiers(programme, ampConfig, input) {
    // All permutations of the amplifiers: [0,1,2,3,4]
    var allAmpPermutations = helpers_1.getAmpPermutations(ampConfig);
    var maxThrusterSignal = 0;
    allAmpPermutations.forEach(function (ampPermutation) {
        var output = input;
        for (var i = 0; i < ampPermutation.length; i++) {
            var newProgramme = JSON.parse(JSON.stringify(programme));
            var nextInput = [ampPermutation[i]].concat(output);
            output = runProgram(newProgramme, nextInput);
        }
        if (output[0] > maxThrusterSignal) {
            maxThrusterSignal = output[0]; // I guess outputs should always be a single value, but an outputarray seems more futureproof
        }
    });
    return maxThrusterSignal;
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input, opcodeInput) {
    var i = 0;
    var isRunning = true;
    var opcodeOutputs = [];
    opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.
    while (isRunning) {
        var opcode = helpers_1.parseOpcode(input[i]); // Builds a small array that contains the opcode, and the TYPE of parameters (0 or 1) it has.
        switch (opcode[0]) { // opcode[0] contains the type of opcode (1 for sum, 2 for multiplication, etc.)
            case 1: // Summation opcode
                var sum1 = 0, sum2 = 0;
                if (opcode[1] === 0) { // first param
                    sum1 = input[input[i + 1]];
                }
                else {
                    sum1 = input[i + 1];
                }
                if (opcode[2] === 0) { // second param
                    sum2 = input[input[i + 2]];
                }
                else {
                    sum2 = input[i + 2];
                }
                input[input[i + 3]] = sum1 + sum2; // third param is always in position mode
                i += 4;
                break;
            case 2: // Multiplication opcode
                var mult1 = 0, mult2 = 0;
                if (opcode[1] === 0) {
                    mult1 = input[input[i + 1]];
                }
                else {
                    mult1 = input[i + 1];
                }
                if (opcode[2] === 0) {
                    mult2 = input[input[i + 2]];
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
                if (opcode[1] === 0) {
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
                if (opcode[1] === 0) {
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
                    if (opcode[2] === 0) {
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
                if (opcode[1] === 0) {
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
                    if (opcode[2] === 0) {
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
                if (opcode[1] === 0) { // first param
                    ltNum1 = input[input[i + 1]];
                }
                else {
                    ltNum1 = input[i + 1];
                }
                if (opcode[2] === 0) { // second param
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
                if (opcode[1] === 0) { // first param
                    eqNum1 = input[input[i + 1]];
                }
                else {
                    eqNum1 = input[i + 1];
                }
                if (opcode[2] === 0) { // second param
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
        .then(function (testArray) {
        var day5inputs = [[8], [6], [7], [3], [2], [4], [8], [1]];
        for (var i = 0; i < testArray.length; i++) {
            console.log(runProgram(testArray[i], day5inputs[i]));
        }
    })
        .then(function () {
        return helpers_1.multiTest("day7tests.txt")
            .then(function (testArray) {
            var amplifierPhases = [0, 1, 2, 3, 4];
            if (tryAmplifiers(testArray[0], amplifierPhases, [0]) !== 43210) {
                console.log("ERROR in first day7part1 tests!");
            }
            if (tryAmplifiers(testArray[0], amplifierPhases, [0]) !== 43210) {
                console.log("ERROR in second day7part1 tests!");
            }
            if (tryAmplifiers(testArray[0], amplifierPhases, [0]) !== 43210) {
                console.log("ERROR in third day7part1 tests!");
            }
        });
    });
}
advent();
