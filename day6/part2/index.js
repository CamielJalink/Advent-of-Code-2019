"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            console.log(findSanta(input));
        });
    });
}
function findSanta(orbits) {
    var nodeArray = [];
    var rootNode = new helpers_1.Node("_)COM");
    var youNode;
    nodeArray.push(rootNode);
    orbits.forEach(function (orbit) {
        var newNode = new helpers_1.Node(orbit);
        nodeArray.forEach(function (existingNode) {
            if (newNode.name === existingNode.parentName) {
                newNode.children.push(existingNode);
                existingNode.parent = newNode;
            }
            else if (existingNode.name === newNode.parentName) {
                existingNode.children.push(newNode);
                newNode.parent = existingNode;
            }
        });
        if (newNode.name === "YOU") {
            youNode = newNode;
        }
        nodeArray.push(newNode);
    });
    return youNode.parent.checkParentsForSanta(0);
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        var testResult = findSanta(input);
        if (testResult !== 4) {
            console.log("Testinput failed! Test gave back " + testResult + " instead of 4");
        }
        return;
    });
}
advent();
