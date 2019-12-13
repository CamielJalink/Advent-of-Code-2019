"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// promisify the readFile node method to read our txt input files.
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            var layers = helpers_1.parseIntoLayers(input, 25, 6);
            var shortestLayer = searchShortestLayer(layers);
            console.log(shortestLayer);
            console.log(calculateOutput(shortestLayer));
            return;
        });
    });
}
function searchShortestLayer(layers) {
    var layerWithFewest0s = "";
    var least0sOnLayer = Number.MAX_SAFE_INTEGER;
    for (var i = 0; i < layers.length; i++) {
        var numOf0s = 0;
        for (var j = 0; j < layers[i].length; j++) {
            if (layers[i][j] === "0") {
                numOf0s++;
            }
        }
        if (numOf0s < least0sOnLayer) {
            least0sOnLayer = numOf0s;
            layerWithFewest0s = layers[i];
        }
    }
    return layerWithFewest0s;
}
function calculateOutput(layer) {
    var numOf1s = 0;
    var numOf2s = 0;
    for (var i = 0; i < layer.length; i++) {
        if (layer[i] === "1") {
            numOf1s++;
        }
        if (layer[i] === "2") {
            numOf2s++;
        }
    }
    console.log(numOf1s);
    console.log(numOf2s);
    return numOf1s * numOf2s;
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        var layers = helpers_1.parseIntoLayers(input, 3, 2);
        var shortestLayer = searchShortestLayer(layers);
        console.log(calculateOutput(shortestLayer));
        return;
    });
}
advent();
