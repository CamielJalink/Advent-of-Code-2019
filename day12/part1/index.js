"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var space_1 = require("./space");
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            var moonsNumArray = [];
            input.forEach(function (stringMoon) {
                var moonStrArray = stringMoon.split(', ');
                var moonNumArray = moonStrArray.map(function (stringCoord) {
                    return Number(stringCoord.substring(2));
                });
                moonsNumArray.push(moonNumArray);
            });
            var jupiterSpace = new space_1.JupiterSpace(moonsNumArray);
        });
    });
}
function runTests() {
    return helpers_1.getInput("input.txt").then(function (input) {
        console.log("no tests currently made");
        return;
    });
}
advent();
