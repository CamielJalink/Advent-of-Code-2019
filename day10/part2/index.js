"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var asteroid_1 = require("./asteroid");
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            console.log("starting with real input");
            var allAsteroids = parseMap(input);
            var bestAsteroid = findBestLocation(allAsteroids);
            console.log(bestAsteroid.x + "," + bestAsteroid.y + " : " + bestAsteroid.visionScore);
        });
    });
}
// This function checks the asteroid map and returns all Asteroids, with a x and y coordinate
function parseMap(stringMap) {
    var allAsteroids = [];
    for (var y = 0; y < stringMap.length; y++) {
        for (var x = 0; x < stringMap[y].length; x++) {
            if (stringMap[y][x] === "#") {
                var asteroid = new asteroid_1.Asteroid(x, y, JSON.parse(JSON.stringify(stringMap)));
                allAsteroids.push(asteroid);
            }
        }
    }
    return allAsteroids;
}
// Asks each asteroid to determine how many other asteroids it can see,
// and returns the best one.
function findBestLocation(allAsteroids) {
    var bestVisionScore = 0;
    var bestAsteroid = allAsteroids[0];
    allAsteroids.forEach(function (asteroid) {
        var visionScore = asteroid.getVisionScore();
        if (visionScore > bestVisionScore) {
            bestVisionScore = visionScore;
            bestAsteroid = asteroid;
        }
    });
    return bestAsteroid;
}
function runTests() {
    return helpers_1.getInput("test5.txt").then(function (testInput) {
        var allAsteroids = parseMap(testInput);
        var bestAsteroid = findBestLocation(allAsteroids);
        if (bestAsteroid.x !== 11 || bestAsteroid.y !== 13 || bestAsteroid.visionScore !== 210) {
            console.log("Test 5 failed!");
        }
        ;
    });
}
advent();
