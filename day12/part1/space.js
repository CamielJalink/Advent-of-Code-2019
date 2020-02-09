"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Moon = /** @class */ (function () {
    function Moon(initLocation) {
        this.velocity = [0, 0, 0];
        this.location = initLocation;
    }
    Moon.prototype.updateLocation = function (newLocation) {
        this.location = newLocation;
    };
    Moon.prototype.updateVelocity = function (changeInVelocity) {
        // Not sure about this one yet;
    };
    return Moon;
}());
var JupiterSpace = /** @class */ (function () {
    function JupiterSpace(initMoons) {
        var _this = this;
        this.moons = [];
        this.timeSteps = 0;
        initMoons.forEach(function (initMoonLoc) {
            _this.moons.push(new Moon(initMoonLoc));
        });
        console.log(this.moons);
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
