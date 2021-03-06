"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Moon = /** @class */ (function () {
    function Moon(initLocation) {
        this.velocity = [0, 0, 0];
        this.location = initLocation;
    }
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
        var prevState = JSON.parse(JSON.stringify(this.moons));
        for (var i = 0; i < this.moons.length; i++) {
            var velChange = [0, 0, 0];
            for (var j = 0; j < prevState.length; j++) {
                // Don't compare a moon with the copy of itself
                if (i !== j) {
                    for (var k = 0; k < velChange.length; k++) {
                        if (this.moons[i].location[k] < prevState[j].location[k]) {
                            velChange[k] = velChange[k] + 1;
                        }
                        else if (this.moons[i].location[k] > prevState[j].location[k]) {
                            velChange[k] = velChange[k] - 1;
                        }
                    }
                }
            }
            for (var l = 0; l < velChange.length; l++) {
                this.moons[i].velocity[l] = this.moons[i].velocity[l] + velChange[l];
                this.moons[i].location[l] = this.moons[i].location[l] + this.moons[i].velocity[l];
            }
        }
    };
    JupiterSpace.prototype.calculateTotalEnergy = function () {
        var totalEnergy = 0;
        this.moons.forEach(function (moon) {
            var moonPotential = 0;
            moon.location.forEach(function (potential) {
                moonPotential += Math.abs(potential);
            });
            var moonVelocity = 0;
            moon.velocity.forEach(function (kinetic) {
                moonVelocity += Math.abs(kinetic);
            });
            totalEnergy += (moonPotential * moonVelocity);
        });
        return totalEnergy;
    };
    return JupiterSpace;
}());
exports.JupiterSpace = JupiterSpace;
