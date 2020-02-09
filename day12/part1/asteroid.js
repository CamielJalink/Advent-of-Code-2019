"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Asteroid = /** @class */ (function () {
    function Asteroid(initLocation) {
        this.velocity = [0, 0, 0];
        this.location = initLocation;
    }
    Asteroid.prototype.updateLocation = function (newLocation) {
        this.location = newLocation;
    };
    Asteroid.prototype.updateVelocity = function (changeInVelocity) {
        // Not sure about this one yet;
    };
    return Asteroid;
}());
exports.Asteroid = Asteroid;
var JupiterSpace = /** @class */ (function () {
    function JupiterSpace(initAsteroids) {
        var _this = this;
        this.asteroids = [];
        this.timeSteps = 0;
        initAsteroids.forEach(function (initAstLoc) {
            _this.asteroids.push(new Asteroid(initAstLoc));
        });
    }
    JupiterSpace.prototype.StepInTime = function () {
        // bereken velocities voor asteroids
        // bereken daarmee locations van asteroids
        // update de asteroids zelf
        // update jouw timeSteps
    };
    JupiterSpace.prototype.calculateTotalEnergy = function () {
        // bereken totale energie in het systeem
    };
    return JupiterSpace;
}());
exports.JupiterSpace = JupiterSpace;
