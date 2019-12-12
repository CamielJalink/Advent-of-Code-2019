"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            console.log(findAllOrbits(input));
        });
    });
}
function findAllOrbits(orbits) {
    var nodeArray = [];
    var rootNode = new helpers_1.Node("_)COM");
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
        nodeArray.push(newNode);
    });
    return rootNode.countOrbits(0);
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        console.log(findAllOrbits(input));
        return;
    });
}
advent();
