"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// promisify the readFile node method to read our txt input files.
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            console.log(input);
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
