"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
var readInput = util_1.promisify(fs_1.readFile);
function getInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        var inputStringArray = input.split("\r\n");
        return inputStringArray;
    });
}
exports.getInput = getInput;
var Node = /** @class */ (function () {
    function Node(orbit) {
        this.name = "";
        this.parent = "";
        this.children = [];
        this.name = orbit.split(")")[1];
        this.parent = orbit.split(")")[0];
    }
    Node.prototype.countOrbits = function () {
        var orbits = 1;
        orbits += this.children.length * 2;
        return orbits;
    };
    return Node;
}());
exports.Node = Node;
