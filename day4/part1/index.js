"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var passwordRange = input; //  "138307-654504"
        var stringBounds = passwordRange.split("-");
        var passwords = validRange(stringBounds);
    });
}
function validRange(stringBounds) {
    var lowerBound = parseInt(stringBounds[0]);
    var upperBound = parseInt(stringBounds[1]);
    var allPasswords = [];
    for (lowerBound; lowerBound <= upperBound; lowerBound++) {
        allPasswords.push(lowerBound.toString());
    }
    return allPasswords;
}
function onlyIncrease(passwords) {
    var validPasswords = [];
    for (var i = 0; i < passwords.length; i++) {
        var isValid = true;
        for (var j = 1; j < passwords[i].length; j++) {
            if (parseInt(passwords[i][j]) < parseInt(passwords[i][j - 1])) { // If current digit is smaller than previous digit, invalid!
                isValid = false;
            }
        }
        if (isValid) {
            validPasswords.push(passwords[i]);
        }
        return validPasswords;
    }
}
advent();
