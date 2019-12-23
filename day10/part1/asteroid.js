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
        var xMax = this.map[0].length - 1;
        var yMin = 0;
        var yMax = this.map.length - 1;
        // First, check the four axis vision lines (1,0  0,1  -1,0 and 0,-1)
        if (this.x < xMax) {
            this.visionLines.push([1, 0]);
        }
        if (this.x > xMin) {
            this.visionLines.push([-1, 0]);
        }
        if (this.y < yMax) {
            this.visionLines.push([0, 1]);
        }
        if (this.y > yMin) {
            this.visionLines.push([0, -1]);
        }
        // These first two forloops check for all vision lines going to the east and south.
        for (var yStep = 1; yStep < (yMax + 1 - this.y); yStep++) {
            for (var xStep = 1; xStep < (xMax + 1 - this.x); xStep++) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    this.visionLines.push(visionLine);
                }
            }
        }
        // Same principle for vision lines going west and south
        for (var yStep = 1; yStep < (yMax + 1 - this.y); yStep++) {
            for (var xStep = -1; xStep > (xMin - 1 - this.x); xStep--) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    this.visionLines.push(visionLine);
                }
            }
        }
        // And for east and north
        for (var yStep = -1; yStep > (yMin - 1 - this.y); yStep--) {
            for (var xStep = 1; xStep < (xMax + 1 - this.x); xStep++) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    this.visionLines.push(visionLine);
                }
            }
        }
        // And finally for north and west
        for (var yStep = -1; yStep > (yMin - 1 - this.y); yStep--) {
            for (var xStep = -1; xStep > (xMin - 1 - this.x); xStep--) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    this.visionLines.push(visionLine);
                }
            }
        }
    };
    // This method checks a single line of sight for an asteroid, returning 1 if there is one.
    Asteroid.prototype.checkForAsteroids = function (visionLine) {
        var asteroidSeen = 0;
        var xModifier = visionLine[0];
        var yModifier = visionLine[1];
        var xMin = 0;
        var xMax = this.map[0].length - 1;
        var yMin = 0;
        var yMax = this.map.length - 1;
        var x = this.x;
        var y = this.y;
        var withinMap = true;
        while (withinMap) {
            x += xModifier;
            y += yModifier;
            if (x > xMax || x < xMin || y > yMax || y < yMin) {
                withinMap = false;
            }
            else if (this.map[y][x] === '#') {
                // console.log("found asteroid on position " + x + "," + y + " using visionline " + xModifier + "," + yModifier);
                asteroidSeen = 1;
                withinMap = false;
            }
        }
        return asteroidSeen;
    };
    return Asteroid;
}());
exports.Asteroid = Asteroid;
// If the x and y of this vision line are both divisable by the same non-0 or non-1 integer, 
// there already exists a simpler description of this visionLine   (for example: 1,2 is a simpler version of 2,4);
function checkSimplerLines(visionLine) {
    var isNewLine = true;
    var x = Math.abs(visionLine[0]);
    var y = Math.abs(visionLine[1]);
    // If x or y is 0, than the other coordinate must be 1 or else there exists a simpler line
    // for example: 2,0 is a duplicate of the simpler 1,0
    if ((x === 0 && y > 1) || (y === 0 && x > 1)) {
        isNewLine = false;
    }
    var lowestXorY = Math.min(x, y);
    // If the lowest value for x or y, is a 0 or 1, the x and y won't be divisable by a higher integer.
    if (lowestXorY > 1) {
        for (var i = 2; i <= lowestXorY; i++) {
            if (x % i === 0 && y % i === 0) {
                isNewLine = false;
            }
        }
    }
    return isNewLine;
}
exports.checkSimplerLines = checkSimplerLines;
