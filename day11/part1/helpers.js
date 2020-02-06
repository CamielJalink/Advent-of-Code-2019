"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
// promisify the readFile node method to read our txt input files.
let readInput = util_1.promisify(fs_1.readFile);
// This function returns an array of integers created by parsing a string-input.
function createIntArray(input) {
    let inputStringArray = input.split(",");
    let inputArray = [];
    inputStringArray.forEach((num) => {
        inputArray.push(BigInt(num));
    });
    return inputArray;
}
// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
function getInput(fileName) {
    return readInput(fileName, "utf8").then((input) => {
        return createIntArray(input);
    });
}
exports.getInput = getInput;
function multiTest(fileName) {
    return readInput(fileName, "utf8").then((input) => {
        // op enters de verschillende tests inlezen
        let testStringArray = input.split("\n");
        let multipleTestsArray = [];
        testStringArray.forEach((testString) => {
            multipleTestsArray.push(createIntArray(testString));
        });
        return multipleTestsArray;
    });
}
exports.multiTest = multiTest;
