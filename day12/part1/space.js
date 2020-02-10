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
        initMoons.forEach(function (initMoonLoc) {
            _this.moons.push(new Moon(initMoonLoc));
        });
    }
    JupiterSpace.prototype.StepInTime = function () {
        var _this = this;
        this.moons.forEach(function (moon) {
            var velChange = [0, 0, 0];
            _this.moons.forEach(function (otherMoon) {
                if (moon !== otherMoon) {
                    for (var i = 0; i < velChange.length; i++) {
                        if (moon.location[i] < otherMoon.location[i]) {
                            velChange[i] = velChange[i] + 1;
                        }
                        else if (moon.location[i] > otherMoon.location[i]) {
                            velChange[i] = velChange[i] - 1;
                        }
                    }
                }
            });
            for (var i = 0; i < velChange.length; i++) {
                moon.velocity[i] = moon.velocity[i] + velChange[i];
                moon.location[i] = moon.location[i] + moon.velocity[i];
            }
            console.log(moon);
        });
    };
    JupiterSpace.prototype.calculateTotalEnergy = function () {
        // bereken totale energie in het systeem
    };
    return JupiterSpace;
}());
exports.JupiterSpace = JupiterSpace;
