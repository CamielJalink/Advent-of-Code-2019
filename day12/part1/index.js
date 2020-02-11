"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var space_1 = require("./space");
function advent() {
    return runTests().then(function () {
        console.log("Starting with Day 12 part 1");
        return helpers_1.getInput("input.txt").then(function (input) {
            console.log(simulateSystem(input, 1000));
        });
    });
}
function simulateSystem(input, numSteps) {
    var moonsNumArray = [];
    input.forEach(function (stringMoon) {
        var moonStrArray = stringMoon.split(', ');
        var moonNumArray = moonStrArray.map(function (stringCoord) {
            return Number(stringCoord.substring(2));
        });
        moonsNumArray.push(moonNumArray);
    });
    var jupiterSpace = new space_1.JupiterSpace(moonsNumArray);
    for (var i = 0; i < numSteps; i++) {
        jupiterSpace.StepInTime();
    }
    return jupiterSpace.calculateTotalEnergy();
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        if (simulateSystem(input, 10) !== 179) {
            console.log("The first testcased failed to return a system energy of 179");
        }
        else {
            console.log("Test succeeded");
        }
        return;
    });
}
advent();
