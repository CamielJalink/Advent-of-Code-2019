"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var space_1 = require("./space");
function advent() {
    return runTests().then(function () {
        console.log("Starting with Day 12 part 1");
        // return getInput("input.txt").then((input: string[]) => {
        //   simulateSystem(input);
        // })
    });
}
function simulateSystem(input) {
    var moonsNumArray = [];
    input.forEach(function (stringMoon) {
        var moonStrArray = stringMoon.split(', ');
        var moonNumArray = moonStrArray.map(function (stringCoord) {
            return Number(stringCoord.substring(2));
        });
        moonsNumArray.push(moonNumArray);
    });
    var jupiterSpace = new space_1.JupiterSpace(moonsNumArray);
    for (var i = 0; i < 10; i++) {
        jupiterSpace.StepInTime();
    }
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        simulateSystem(input);
        return;
    });
}
advent();
