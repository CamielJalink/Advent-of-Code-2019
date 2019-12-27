"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The asteroid class has an x coordinate, y coordinate, 
// and a map representation of the asteroid field
var Asteroid = /** @class */ (function () {
    function Asteroid(x, y, map) {
        this.visionLines = []; // determines all directions this asteroid can 'look'
        this.visionScore = 0;
        this.x = x;
        this.y = y;
        this.map = map;
    }
    // Determines the number of asteroids that can be seen from this asteroid
    Asteroid.prototype.getVisionScore = function () {
        var _this = this;
        this.getVisionLines();
        this.visionLines.forEach(function (visionLine) {
            _this.visionScore += _this.checkForAsteroids(visionLine);
        });
        return this.visionScore;
    };
    // Determines all directions in which the asteroid can 'look' to find neighbours.
    // Directions are a x,y pair.
    Asteroid.prototype.getVisionLines = function () {
        var _this = this;
        var xMin = 0;
        var xMax = this.map[0].length - 1;
        var yMin = 0;
        var yMax = this.map.length - 1;
        if (this.y > yMin) { // visionline looking north
            this.visionLines.push([0, -1]);
        }
        // Create a tempary array for the first quarter of all visionlines, too make sorting them easier.
        var northEast = [];
        // Check northeast for visionlines
        for (var yStep = -1; yStep > (yMin - 1 - this.y); yStep--) {
            for (var xStep = 1; xStep < (xMax + 1 - this.x); xStep++) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    northEast.push(visionLine);
                }
            }
        }
        // Sort the northeast visionLines in preparation for firing the laser.
        northEast.sort(function (a, b) {
            // the north east attributes have a negative y that should be reversed. 
            var x1 = a[0];
            var y1 = -1 * a[1];
            var x2 = b[0];
            var y2 = -1 * b[1];
            if ((x1 / y1) < (x2 / y2)) {
                return -1;
            }
            else if ((x1 / y1) > (x2 / y2)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        northEast.forEach(function (visionLine) {
            _this.visionLines.push(visionLine);
        });
        if (this.x < xMax) { // visionline looking east
            this.visionLines.push([1, 0]);
        }
        // Check southeast for visionlines
        var southEast = [];
        for (var yStep = 1; yStep < (yMax + 1 - this.y); yStep++) {
            for (var xStep = 1; xStep < (xMax + 1 - this.x); xStep++) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    southEast.push(visionLine);
                }
            }
        }
        southEast.sort(function (a, b) {
            // the south east attributes have only positive coordinates
            var x1 = a[0];
            var y1 = a[1];
            var x2 = b[0];
            var y2 = b[1];
            if ((y1 / x1) < (y2 / x2)) { // x and y are swapped here compared to the northeast quardrant
                return -1;
            }
            else if ((y1 / x1) > (y2 / x2)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        southEast.forEach(function (visionLine) {
            _this.visionLines.push(visionLine);
        });
        if (this.y < yMax) { // visionline looking south
            this.visionLines.push([0, 1]);
        }
        // Check southwest for visionlines
        var southWest = [];
        for (var yStep = 1; yStep < (yMax + 1 - this.y); yStep++) {
            for (var xStep = -1; xStep > (xMin - 1 - this.x); xStep--) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    southWest.push(visionLine);
                }
            }
        }
        southWest.sort(function (a, b) {
            // the south west attributes have a negative x that should be reversed. 
            var x1 = -1 * a[0];
            var y1 = a[1];
            var x2 = -1 * b[0];
            var y2 = b[1];
            if ((x1 / y1) < (x2 / y2)) {
                return -1;
            }
            else if ((x1 / y1) > (x2 / y2)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        southWest.forEach(function (visionLine) {
            _this.visionLines.push(visionLine);
        });
        if (this.x > xMin) { // visionline looking west
            this.visionLines.push([-1, 0]);
        }
        // Check northwest for visionlines
        var northWest = [];
        for (var yStep = -1; yStep > (yMin - 1 - this.y); yStep--) {
            for (var xStep = -1; xStep > (xMin - 1 - this.x); xStep--) {
                var visionLine = [];
                visionLine.push(xStep);
                visionLine.push(yStep);
                if (checkSimplerLines(visionLine)) {
                    northWest.push(visionLine);
                }
            }
        }
        northWest.sort(function (a, b) {
            // the north west attributes have both a negative x and y
            var x1 = -1 * a[0];
            var y1 = -1 * a[1];
            var x2 = -1 * b[0];
            var y2 = -1 * b[1];
            if ((y1 / x1) < (y2 / x2)) {
                return -1;
            }
            else if ((y1 / x1) > (y2 / x2)) {
                return 1;
            }
            else {
                return 0;
            }
        });
        northWest.forEach(function (visionLine) {
            _this.visionLines.push(visionLine);
        });
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
    Asteroid.prototype.fireOneDirection = function (visionLine) {
        var blastedAsteroid = [];
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
                blastedAsteroid.push(x);
                blastedAsteroid.push(y);
                withinMap = false;
            }
        }
        return blastedAsteroid;
    };
    // First, get all the directions we are going to check, using a modified version of the getVisionLines method from part1
    Asteroid.prototype.fireLaser = function (totalAsteroids) {
        var _this = this;
        this.getVisionLines();
        var destroyedAsteroids = [];
        var stillFiring = true;
        while (stillFiring) {
            this.visionLines.forEach(function (visionLine) {
                var blastedAsteroid = _this.fireOneDirection(visionLine);
                if (blastedAsteroid.length > 0) {
                    destroyedAsteroids.push(blastedAsteroid);
                    _this.map = writeMap(_this.map, blastedAsteroid);
                }
            });
            if (destroyedAsteroids.length >= totalAsteroids) {
                stillFiring = false;
            }
        }
        return destroyedAsteroids;
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
function writeMap(map, spot) {
    var xlength = map.length;
    var ylength = map[0].length;
    var newMap = [];
    for (var y = 0; y < map.length; y++) {
        var newRow = "";
        for (var x = 0; x < map[y].length; x++) {
            if (x === spot[0] && y === spot[1]) {
                newRow += '.';
            }
            else {
                newRow += map[y][x];
            }
        }
        newMap.push(newRow);
    }
    return (newMap);
}
