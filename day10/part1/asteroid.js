"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The asteroid class has an x coordinate, y coordinate, 
// and a map representation of the asteroid field
var Asteroid = /** @class */ (function () {
    function Asteroid(x, y, map) {
        this.visionLines = []; // determines all directions this asteroid can 'look' 
        this.x = x;
        this.y = y;
        this.map = map;
    }
    // Determines the number of asteroids that can be seen from this asteroid
    Asteroid.prototype.getVisionScore = function () {
        var _this = this;
        var visionScore = 0;
        this.getVisionLines();
        this.visionLines.forEach(function (visionLine) {
            visionScore += _this.checkForAsteroids(visionLine);
        });
        return visionScore;
    };
    // Determines all directions in which the asteroid can 'look' to find neighbours.
    // Directions are a x,y pair. 
    Asteroid.prototype.getVisionLines = function () {
        var xMin = 0;
        var xMax = this.map[0].length - 1; //The -1 here feels semantically more correct
        var yMin = 0;
        var yMax = this.map.length - 1;
        var visionLines = [];
        // sneaky +1 to ensure that the border squares are also checked
        for (var yStep = 0; yStep < (yMax + 1 - this.y); yStep++) {
            for (var xStep = 0; xStep < (xMax + 1 - this.x); xStep++) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                visionLines.push(visionLine);
            }
        }
        console.log(visionLines);
    };
    // This method checks a single line of sight for an asteroid, returning 1 if there is one.
    Asteroid.prototype.checkForAsteroids = function (visionLine) {
        var asteroidSeen = 0;
        return asteroidSeen;
    };
    return Asteroid;
}());
exports.default = Asteroid;
