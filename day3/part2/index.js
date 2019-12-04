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
    var wire1coords = findWireCoordinates(wire1);
    var wire2coords = findWireCoordinates(wire2);
    var allcrossings = findCrossings(wire1coords, wire2coords);
    var closestCrossingDistance = determineDistance(allcrossings[0].x, allcrossings[0].y);
    for (var i = 0; i < allcrossings.length; i++) {
        if (determineDistance(allcrossings[i].x, allcrossings[i].y) < closestCrossingDistance) {
            closestCrossingDistance = determineDistance(allcrossings[i].x, allcrossings[i].y);
        }
    }
    // part two code start: an array is added for crossings that have been considered before.
    var visitedCrossings = [];
    var shortestCombinedWire = 999999999;
    for (var i = 0; i < allcrossings.length; i++) {
        var wire1length = 999999999;
        var wire2length = 999999999;
        var allreadyChecked = false;
        for (var l = 0; l < visitedCrossings.length; l++) {
            if (allcrossings[i].x == visitedCrossings[l].x && allcrossings[i].y == visitedCrossings[l].y) {
                allreadyChecked = true;
            }
        }
        if (!allreadyChecked) {
            for (var j = 0; j < wire1coords.length; j++) {
                if (wire1coords[j].x == allcrossings[i].x && wire1coords[j].y == allcrossings[i].y) {
                    wire1length = j + 1;
                }
            }
            for (var k = 0; k < wire2coords.length; k++) {
                if (wire2coords[k].x == allcrossings[i].x && wire2coords[k].y == allcrossings[i].y) {
                    wire2length = k;
                }
            }
            if ((wire1length + wire2length) < shortestCombinedWire) {
                shortestCombinedWire = wire1length + wire2length;
            }
            visitedCrossings.push(JSON.parse(JSON.stringify(allcrossings[i])));
        }
    }
    console.log(shortestCombinedWire);
}
function findWireCoordinates(wire) {
    var wireCoords = [];
    var currentCoord = { x: 0, y: 0 };
    for (var i = 0; i < wire.length; i++) {
        var operation = wire[i]; // e.g. R105
        var direction = operation[0]; //e.g. R
        var distance = parseInt(operation.substring(1)); //e.g. 105
        switch (direction) {
            case 'R':
                for (var j = 0; j < distance; j++) {
                    currentCoord.x = currentCoord.x + 1;
                    wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
                }
                break;
            case 'D':
                for (var j = 0; j < distance; j++) {
                    currentCoord.y = currentCoord.y - 1;
                    wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
                }
                break;
            case 'L':
                for (var j = 0; j < distance; j++) {
                    currentCoord.x = currentCoord.x - 1;
                    wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
                }
                break;
            case 'U':
                for (var j = 0; j < distance; j++) {
                    currentCoord.y = currentCoord.y + 1;
                    wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
                }
                break;
        }
    }
    return wireCoords;
}
function findCrossings(wire1coords, wire2coords) {
    var crossings = [];
    for (var i = 0; i < wire1coords.length; i++) {
        for (var j = 0; j < wire2coords.length; j++) {
            var wire1C = wire1coords[i];
            var wire2C = wire2coords[j];
            if (wire1C.x == wire2C.x && wire1C.y == wire2C.y) {
                crossings.push(JSON.parse(JSON.stringify(wire1C)));
            }
        }
    }
    return crossings;
}
function determineDistance(x, y) {
    return Math.abs(x) + Math.abs(y);
}
advent();
// Ik heb een array met alle stappen die hij nam
// Ik heb een array met alle knopen waar hij langs kwam
// Voor elke knoop:
// Als die knoop al aan bod is geweest, negeer 'm (een 'al gedaan' array maken?)
// Hoeveel stappen kost het wire1 om daar te komen?
// Hoeveel stappen kost het wire2 om daar te komen?
// Is dat aantal stappen lager dan totdantoe laagste? 
