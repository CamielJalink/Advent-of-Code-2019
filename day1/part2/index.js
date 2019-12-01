"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
function fuelForModule(mass) {
    var totalFuelNeeded = 0;
    var unconsideredMass = mass;
    while (unconsideredMass > 0) {
        unconsideredMass = fuelForMass(unconsideredMass);
        if (unconsideredMass > 0) {
            totalFuelNeeded += unconsideredMass;
        }
    }
    return totalFuelNeeded;
}
function fuelForMass(mass) {
    var fuel = Math.floor((mass / 3)) - 2;
    return fuel;
}
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var inputStringArray = input.split("\n");
        var inputArray = [];
        inputStringArray.forEach(function (module) {
            inputArray.push(parseInt(module));
        });
        var totalFuelNeeded = 0;
        inputArray.forEach(function (module) {
            totalFuelNeeded += fuelForModule(module);
        });
        console.log(totalFuelNeeded);
    });
}
advent();
