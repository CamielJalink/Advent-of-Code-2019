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
    wire1coords = wire1coords.sort(coordsCompare);
    wire2coords = wire2coords.sort(coordsCompare);
    var allcrossings = findCrossings(wire1coords, wire2coords);
    var closestCrossingDistance = determineDistance(allcrossings[0].x, allcrossings[0].y);
    for (var i = 0; i < allcrossings.length; i++) {
        if (determineDistance(allcrossings[i].x, allcrossings[i].y) < closestCrossingDistance) {
            closestCrossingDistance = determineDistance(allcrossings[i].x, allcrossings[i].y);
        }
    }
    console.log(closestCrossingDistance);
    // console.log(closest)
}
function coordsCompare(first, second) {
    if (first.x < second.x) {
        return -1;
    }
    if (first.x > second.x) {
        return 1;
    }
    if (first.x === second.x) {
        return first.y - second.y;
    }
    return 0;
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
    var i = 0;
    var j = 0;
    while (wire1coords.length > i && wire2coords.length > j) {
        if (coordsCompare(wire1coords[i], wire2coords[j]) > 0) {
            j += 1;
        }
        else if (coordsCompare(wire1coords[i], wire2coords[j]) < 0) {
            i += 1;
        }
        else {
            crossings.push(JSON.parse(JSON.stringify(wire1coords[i])));
            i += 1;
            j += 1;
        }
    }
    return crossings;
}
//findcrossings oud
// function findCrossings(wire1coords: Coord[], wire2coords: Coord[]){
//   let crossings: Coord[] = [];
//   for (let i = 0; i < wire1coords.length; i++) {
//     for (let j = 0; j < wire2coords.length; j++) {
//       let wire1C: Coord = wire1coords[i];
//       let wire2C: Coord = wire2coords[j];
//       if (wire1C.x == wire2C.x && wire1C.y == wire2C.y) {
//         crossings.push(JSON.parse(JSON.stringify(wire1C)));
//       }
//     }
//   }
//   return crossings;
// }
function determineDistance(x, y) {
    return Math.abs(x) + Math.abs(y);
}
advent();
// Twee tests
