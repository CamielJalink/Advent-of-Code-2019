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
    var closestCrossingDistance = -1;
    for (var i = 0; i < allcrossings.length; i++) {
        var totalsteps = allcrossings[i].wire1.steps + allcrossings[i].wire2.steps;
        if (totalsteps < closestCrossingDistance || closestCrossingDistance === -1) {
            closestCrossingDistance = totalsteps;
        }
    }
    console.log(closestCrossingDistance);
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
    var x = 0;
    var y = 0;
    var steps = 0;
    for (var i = 0; i < wire.length; i++) {
        var operation = wire[i]; // e.g. R105
        var direction = operation[0]; //e.g. R
        var distance = parseInt(operation.substring(1)); //e.g. 105
        switch (direction) {
            case 'R':
                for (var j = 0; j < distance; j++) {
                    x++;
                    steps++;
                    var newCoord = { x: x, y: y, steps: steps };
                    wireCoords.push(newCoord);
                }
                break;
            case 'D':
                for (var j = 0; j < distance; j++) {
                    y--;
                    steps++;
                    var newCoord = { x: x, y: y, steps: steps };
                    wireCoords.push(newCoord);
                }
                break;
            case 'L':
                for (var j = 0; j < distance; j++) {
                    x--;
                    steps++;
                    var newCoord = { x: x, y: y, steps: steps };
                    wireCoords.push(newCoord);
                }
                break;
            case 'U':
                for (var j = 0; j < distance; j++) {
                    y++;
                    steps++;
                    var newCoord = { x: x, y: y, steps: steps };
                    wireCoords.push(newCoord);
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
            crossings.push({ wire1: wire1coords[i], wire2: wire2coords[j] });
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
