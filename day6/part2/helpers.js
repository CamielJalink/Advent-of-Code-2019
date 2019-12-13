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
        this.children = [];
        this.name = orbit.split(")")[1];
        this.parentName = orbit.split(")")[0];
    }
    Node.prototype.countOrbits = function (step) {
        var orbits = step;
        this.children.forEach(function (child) {
            orbits += child.countOrbits(step + 1);
        });
        return orbits;
    };
    // Check if you or one of your children has Santa.
    // If not, recursively ask your parent to do the same.
    Node.prototype.checkParentsForSanta = function (jumps) {
        var myJumps = this.checkChildrenForSanta(jumps);
        if (myJumps > -1) {
            return myJumps;
        }
        else {
            return this.parent.checkParentsForSanta(jumps + 1);
        }
    };
    Node.prototype.checkChildrenForSanta = function (jumps) {
        if (this.children.length > 0) { // Only try if you have children nodes
            // First, check if one of your direct children is Santa
            var childIsSanta_1 = false;
            this.children.forEach(function (child) {
                if (child.name === "SAN") {
                    childIsSanta_1 = true;
                }
            });
            if (childIsSanta_1) {
                return jumps;
            }
            // If none of your direct children is Santa, ask them to resursively check their children
            else {
                var aChildHasSanta_1 = false;
                this.children.forEach(function (child) {
                    var childResult = child.checkChildrenForSanta(jumps + 1);
                    if (childResult > -1) {
                        aChildHasSanta_1 = true;
                        jumps = childResult;
                    }
                });
                if (aChildHasSanta_1) { // If one of your children has Santa, return it's jumps
                    return jumps;
                }
                else {
                    return -1; // If none of your children have Santa, return -1
                }
            }
        }
        else { // If you have no children, return -1
            return -1;
        }
    };
    return Node;
}());
exports.Node = Node;
