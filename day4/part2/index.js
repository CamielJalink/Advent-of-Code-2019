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
        passwords = validIncrease(passwords);
        passwords = validSamePair(passwords);
        console.log(passwords.length);
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
function validIncrease(passwords) {
    var validPasswords = [];
    for (var i = 0; i < passwords.length; i++) {
        var isValid = true;
        for (var j = 1; j < passwords[i].length; j++) {
            // If current digit is smaller than previous digit, password is invalid!
            if (passwords[i][j] < passwords[i][j - 1]) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            validPasswords.push(passwords[i]);
        }
    }
    return validPasswords;
}
function validSamePair(passwords) {
    var validPasswords = [];
    for (var i = 0; i < passwords.length; i++) {
        if (checkForPairs(passwords[i])) {
            validPasswords.push(passwords[i]);
        }
    }
    return validPasswords;
}
function checkForPairs(password) {
    var charOccurences = [1];
    var j = 0;
    for (var i = 1; i < password.length; i++) {
        if (password[i] === password[i - 1]) {
            charOccurences[j] = charOccurences[j] + 1;
        }
        else {
            j++;
            charOccurences.push(1);
        }
    }
    return (charOccurences.includes(2));
}
advent();
