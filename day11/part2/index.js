"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const intcodeTests_1 = __importDefault(require("./intcodeTests"));
const computer_1 = __importDefault(require("./computer"));
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return intcodeTests_1.default()
        .then(() => helpers_1.getInput("input.txt")
        .then((program) => {
        console.log("starting day 11");
        let computer = new computer_1.default(program);
        let knownMap = paintShip(computer);
        console.log(readMap(knownMap));
    }));
}
function paintShip(computer) {
    let knownMap = [];
    let currentLocation = { x: 0, y: 0, color: 1 };
    let currentDirection = "up";
    let nextInput = [];
    while (!computer.isFinished) {
        nextInput[0] = BigInt(currentLocation.color);
        let instruction = computer.runProgram(nextInput).map(bignum => Number(bignum));
        currentLocation.color = instruction[0];
        let isKnownLocation = false;
        // If the current location has been visited before, update it's color.
        knownMap.forEach((square) => {
            if (square.x === currentLocation.x && square.y === currentLocation.y) {
                square.color = currentLocation.color;
                isKnownLocation = true;
            }
        });
        // If the current location hasn't been visited before, add it to the knownMap and increase numUniqueVisited by 1
        if (!isKnownLocation) {
            knownMap.push(JSON.parse(JSON.stringify(currentLocation)));
        }
        // Determine new direction. 
        switch (currentDirection) {
            case "up":
                instruction[1] === 0 ? currentDirection = "left" : currentDirection = "right";
                break;
            case "down":
                instruction[1] === 0 ? currentDirection = "right" : currentDirection = "left";
                break;
            case "right":
                instruction[1] === 0 ? currentDirection = "up" : currentDirection = "down";
                break;
            case "left":
                instruction[1] === 0 ? currentDirection = "down" : currentDirection = "up";
                break;
            default:
                break;
        }
        // Determine next position
        switch (currentDirection) {
            case "up":
                currentLocation = checkMap(knownMap, currentLocation.x, currentLocation.y + 1);
                break;
            case "down":
                currentLocation = checkMap(knownMap, currentLocation.x, currentLocation.y - 1);
                break;
            case "right":
                currentLocation = checkMap(knownMap, currentLocation.x + 1, currentLocation.y);
                break;
            case "left":
                currentLocation = checkMap(knownMap, currentLocation.x - 1, currentLocation.y);
                break;
            default:
                break;
        }
    }
    return knownMap;
}
// Returns the square we are stepping toward if it exists, or creates a new one.
function checkMap(knownMap, x, y) {
    let squareIsKnown = false;
    let square;
    knownMap.forEach((existingSquare) => {
        if (existingSquare.x === x && existingSquare.y === y) {
            square = JSON.parse(JSON.stringify(existingSquare));
            squareIsKnown = true;
        }
    });
    // If we haven't painted this square before, it's color is black and therefor a zero.
    if (!squareIsKnown) {
        square = { x: x, y: y, color: 0 };
    }
    return square;
}
function readMap(knownMap) {
    let maxX = 0, minX = 0, maxY = 0, minY = 0;
    knownMap.forEach((square) => {
        if (square.x > maxX) {
            maxX = square.x;
        }
        if (square.x < minX) {
            minX = square.x;
        }
        if (square.y > maxY) {
            maxY = square.y;
        }
        if (square.y < minY) {
            minY = square.y;
        }
    });
    let xRange = Math.abs(minX - maxX);
    let yRange = Math.abs(minY - maxY);
    let printedMap = [];
    for (let y = 0; y <= yRange; y++) {
        let newRow = [];
        for (let x = 0; x <= xRange; x++) {
            newRow.push(' ');
        }
        printedMap.push(newRow);
    }
    knownMap.forEach((square) => {
        if (square.color === 0) {
            printedMap[square.y + Math.abs(minY)][square.x + Math.abs(minX)] = ' ';
        }
        else {
            printedMap[square.y + Math.abs(minY)][square.x + Math.abs(minX)] = '#';
        }
    });
    let stringMap = [];
    printedMap.forEach((row) => {
        let stringRow = row.reduce((rowString, char) => {
            return rowString += char;
        }, "");
        stringMap.push(stringRow);
    });
    return stringMap;
}
advent();
