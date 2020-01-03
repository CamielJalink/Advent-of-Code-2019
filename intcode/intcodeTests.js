"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const computer_1 = __importDefault(require("./computer"));
function runIntcodeTests() {
    //////////////////////////
    // Day 5 tests          //
    //////////////////////////
    return helpers_1.multiTest("day5tests.txt")
        .then((testPrograms) => {
        let day5inputs = [[8n], [6n], [7n], [3n], [2n], [0n], [8n], [1n]];
        let day5outputs = [[1n], [1n], [0n], [1n], [1n], [0n], [1000n], [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 5346030n]];
        for (let i = 0; i < testPrograms.length; i++) {
            let computer = new computer_1.default(testPrograms[i], day5inputs[i]);
            let output = computer.runProgram();
            if (output[0] !== day5outputs[i][0]) {
                console.log("Error in day5 test number " + (i + 1));
                console.log("Expected " + output[0] + " to be " + day5outputs[i][0]);
            }
        }
        console.log("Done with day5 tests");
        //////////////////////////
        // Day 9 tests          //
        //////////////////////////
    }).then(() => {
        return helpers_1.multiTest("day9tests.txt")
            .then((testPrograms) => {
            let day9outputs = [
                [109n, 1n, 204n, -1n, 1001n, 100n, 1n, 100n, 1008n, 100n, 16n, 101n, 1006n, 101n, 0n, 99n],
                [1219070632396864n],
                [1125899906842624n],
                [3235019597n],
                [80274n]
            ];
            let day9inputs = [[0n], [0n], [0n], [1n], [2n]];
            for (let i = 0; i < testPrograms.length; i++) {
                let computer = new computer_1.default(testPrograms[i], day9inputs[i]);
                let output = computer.runProgram();
                let testValid = true;
                for (let j = 0; j < output.length; j++) {
                    if (output[j] !== day9outputs[i][j]) {
                        testValid = false;
                    }
                }
                if (!testValid) {
                    console.log("Error in day9 test number " + (i + 1));
                    console.log("Expected " + output + " to be " + day9outputs[i]);
                }
            }
            console.log("Done with day9 tests");
        });
    });
}
exports.default = runIntcodeTests;
