"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return runTests()
        .then(function () { return helpers_1.getInput("input.txt")
        .then(function (programme) {
        console.log("starting day7part2");
        var phaseSettings = [5, 6, 7, 8, 9];
        var startInput = [0];
        var maxThrusterSignal = tryAmplifiers(programme, phaseSettings, startInput);
        console.log(maxThrusterSignal);
    }); });
}
function tryAmplifiers(programme, phaseSettings, input) {
    // All permutations of the amplifiers: [0,1,2,3,4]
    var allAmpPermutations = helpers_1.getAmpPermutations(phaseSettings);
    var maxThrusterSignal = 0;
    allAmpPermutations.forEach(function (ampPermutation) {
        // Create an initial state for each amplifier
        var stateArray = [];
        for (var i_1 = 0; i_1 < ampPermutation.length; i_1++) {
            var state = {
                output: [ampPermutation[i_1]],
                i: 0,
                programme: JSON.parse(JSON.stringify(programme))
            };
            stateArray.push(state);
        }
        // The first state gets an extra input: the 0
        stateArray[0].output.push(0);
        var feedbackLoopBusy = true;
        var i = 0;
        // this is an ugly way of determining if a amplifier runs for the first time,
        // and thus if that amplifier still needs to receive it's phase setting.
        var j = 0;
        while (feedbackLoopBusy) {
            var currentAmplifier = runProgram(stateArray[i]);
            if (currentAmplifier.programme == []) {
                feedbackLoopBusy = false; // the programme is only empty when opcode 99 is found
                maxThrusterSignal = stateArray[stateArray.length - 1].output[0];
            }
            // transfer your output to the next amplifier
            if (i === stateArray.length - 1) {
                stateArray[0].output = currentAmplifier.output;
                j = 1;
            }
            else {
                if (j === 0) { // If this is the first time running this amplifier, add it's phase
                    stateArray[i + 1].output = [ampPermutation[i + 1]].concat(currentAmplifier.output);
                }
                else {
                    stateArray[i + 1].output = currentAmplifier.output;
                }
            }
            // save the state of the amplifier that just returned an output
            stateArray[i] = currentAmplifier;
            // determine which amplifier can go next
            if (i < stateArray.length - 1) {
                i += 1;
            }
            else {
                i = 0;
            }
        }
    });
    return maxThrusterSignal;
}
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(startState) {
    var input = startState.programme;
    var opcodeInput = startState.output;
    var i = startState.i;
    var isRunning = true;
    var pauseProgramme = false;
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
                isRunning = false;
                pauseProgramme = true;
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
    if (pauseProgramme) {
        var state = {
            output: opcodeOutputs,
            i: i,
            programme: input
        };
        return state;
    }
    else {
        var exitState = {
            output: [],
            i: i,
            programme: []
        };
        return exitState;
    }
}
function runTests() {
    return helpers_1.multiTest("day5tests.txt")
        // .then((testProgrammes: number[][]) => {
        // let day5inputs: number[][] = [[8],[6],[7],[3],[2],[4],[8],[1]];
        // for(let i = 0; i < testProgrammes.length; i++){
        //   console.log(runProgram(testProgrammes[i], day5inputs[i]));
        // }
        // })
        .then(function () {
        return helpers_1.multiTest("day7tests.txt")
            .then(function (testProgrammes) {
            var amplifierPhases = [0, 1, 2, 3, 4];
            if (tryAmplifiers(testProgrammes[0], amplifierPhases, [0]) !== 43210) {
                console.log("ERROR in first day7part1 tests!");
            }
            if (tryAmplifiers(testProgrammes[1], amplifierPhases, [0]) !== 54321) {
                console.log("ERROR in second day7part1 tests!");
            }
            if (tryAmplifiers(testProgrammes[2], amplifierPhases, [0]) !== 65210) {
                console.log("ERROR in third day7part1 tests!");
            }
        });
    });
}
advent();
