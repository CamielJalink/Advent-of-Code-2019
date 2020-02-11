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
// Mijn idee voor part twee:
// Een array met arrays. Elke subarray stelt alle states voor met dezelfde total energy.
//      Dus: Ik heb totalenergy 144. Ik zoek in de array met totalenergy 144 of er eentje is met exact dezelfde state.
//           De states ga ik als een string bijhouden voor een simpele check? 
//
//  En daarmee dus:
//    Na het doen van een StepInTime moet ik nog twee dingen doen:
//      1 Een string bouwen van deze state.
//      2 
// 
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
