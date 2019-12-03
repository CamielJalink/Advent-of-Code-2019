"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
// promisify the readFile node method to read our txt input files.
var readInput = util_1.promisify(fs_1.readFile);
function advent() {
    return readInput("input.txt", "utf8").then(function (input) {
        var wireArray = input.split("\n");
        var wire1 = wireArray[0].split(",");
        var wire2 = wireArray[1].split(",");
        findClosestCrossing(wire1, wire2);
    });
}
function findClosestCrossing(wire1, wire2) {
    findWireCoordinates(wire1);
    findWireCoordinates(wire2);
}
function findWireCoordinates(wire) {
    var wireCoords = [];
    var currentCoord = { x: 0, y: 0 };
    for (var i = 0; i < wire.length; i++) {
        var operation = wire[i]; // R105
        var direction = operation[0]; // R
        var distance = parseInt(operation.substring(1)); // 105
        doOperation(direction, distance, currentCoord, wireCoords);
    }
    return wireCoords;
}
function doOperation(direction, distance, currentCoord, wireCoords) {
    switch (direction) {
        case 'R':
            for (var j = 0; j < distance; j++) {
                currentCoord.x = currentCoord.x + 1;
                wireCoords.push(currentCoord);
            }
            break;
        case 'D':
            for (var j = 0; j < distance; j++) {
                currentCoord.y = currentCoord.y - 1;
                wireCoords.push(currentCoord);
            }
            break;
        case 'L':
            for (var j = 0; j < distance; j++) {
                currentCoord.x = currentCoord.x - 1;
                wireCoords.push(currentCoord);
            }
            break;
        case 'U':
            for (var j = 0; j < distance; j++) {
                currentCoord.y = currentCoord.y + 1;
                wireCoords.push(currentCoord);
            }
            break;
    }
    return;
}
advent();
// Twee tests
