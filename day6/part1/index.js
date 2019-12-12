"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
function advent() {
    return runTests().then(function () {
        // return getInput("input.txt").then((input: string[]) => {
        //   console.log(input);
        // })
    });
}
function findAllOrbits(orbits) {
    var nodeArray = [];
    orbits.forEach(function (orbit) {
        var newNode = new helpers_1.Node(orbit);
        nodeArray.forEach(function (existingNode) {
            if (newNode.name === existingNode.parent) {
                newNode.children.push(existingNode.parent);
            }
            else if (existingNode.name === newNode.parent) {
                existingNode.children.push(newNode.name);
            }
        });
        nodeArray.push(newNode);
    });
    // Ik heb nu een array met nodes die elk hun parent en children goed bijhouden. 
    // Die zou ik kunnen sorteren   DOM)A, A)B, A)C, B)D, C)E, C)F
    // Nut daarvan:
    // Dan zou ik kunnen zeggen: voor elke node:
    // JIj hebt een relatie met je parent:
    // 1.
    // Jouw children hebben een relatie met jou, en met jouw parent.
    // Children.length * 2.
    // 8 + 10 + 4 + 2 + 6 + 1 = 18 + 6 + 7 = 18 + 13 = 31
    // Nou mis ik alsnog precies voor elke node 1 punt.
    // Dit gaat fout want grandchildren met meerdere childeren tel je niet meer genoeg. 
    // Ik moet denk ik vanuit de children gaan redeneren?
    var numberOfOrbits = 0;
    nodeArray.forEach(function (node) {
        numberOfOrbits += node.countOrbits();
    });
    console.log(nodeArray);
    return numberOfOrbits;
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        console.log(findAllOrbits(input));
        return;
    });
}
advent();
