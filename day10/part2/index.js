"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
var asteroid_1 = require("./asteroid");
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            // console.log("starting with real input");
            // fireLaser(input, 23, 20) // The base is placed on asteroid 23,20 which can see 334 asteroids
        });
    });
}
function fireLaser(asteroidMap, x, y) {
    var station = new asteroid_1.Asteroid(x, y, asteroidMap);
    var destroyedAsteroids = station.fireLaser();
    return destroyedAsteroids;
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
    return helpers_1.getInput("test1.txt").then(function (testInput) {
        var allAsteroids = parseMap(testInput);
        var bestAsteroid = findBestLocation(allAsteroids);
        if (bestAsteroid.x !== 3 || bestAsteroid.y !== 4 || bestAsteroid.visionScore !== 8) {
            console.log("Test 1 failed!");
        }
        ;
    }).then(function () {
        return helpers_1.getInput("test5.txt").then(function (testInput) {
            var allAsteroids = parseMap(testInput);
            var bestAsteroid = findBestLocation(allAsteroids);
            if (bestAsteroid.x !== 11 || bestAsteroid.y !== 13 || bestAsteroid.visionScore !== 210) {
                console.log("Test 5 failed!");
            }
            ;
        });
    })
        .then(function () {
        console.log("Done with the part 1 tests");
        return helpers_1.getInput("test1.txt").then(function (testInput) {
            // The base is place on asteroid 3,4
            var destroyedAsteroids = fireLaser(testInput, 2, 4);
            console.log("Destroyed " + destroyedAsteroids.length + " asteroids");
            console.log(destroyedAsteroids);
        });
    });
    // .then(() => {
    //   return getInput("test5.txt").then((testInput: string[]) => {
    //     // The base is placed on asteroid 11,23
    //     let destroyedAsteroids: number[][] = fireLaser(testInput, 11, 13);
    //     console.log("Destroyed " + destroyedAsteroids.length + " asteroids");
    //     console.log(destroyedAsteroids[0]);
    //     console.log(destroyedAsteroids[1]);
    //     console.log(destroyedAsteroids[2]);
    //     console.log(destroyedAsteroids[9]);
    //     console.log(destroyedAsteroids[19]);
    //     console.log(destroyedAsteroids[49]);
    //     console.log(destroyedAsteroids[99]);
    //     console.log(destroyedAsteroids[198]);
    //     console.log(destroyedAsteroids[199]);
    //     console.log(destroyedAsteroids[200]);
    //     console.log(destroyedAsteroids[298]);
    //   })
    // })
}
advent();
