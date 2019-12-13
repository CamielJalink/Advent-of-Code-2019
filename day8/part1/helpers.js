"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var util_1 = require("util");
var readInput = util_1.promisify(fs_1.readFile);
function getInput(fileName) {
    return readInput(fileName, "utf8").then(function (input) {
        return input;
    });
}
exports.getInput = getInput;
// This array determines the size of a layer, and puts the data of each layer together.
function parseIntoLayers(input, layerWidth, layerHight) {
    var layerSize = layerWidth * layerHight;
    var layersArray = [];
    var nextLayer = [];
    for (var i = 0; i < input.length; i++) {
        nextLayer.push(input[i]);
        if (nextLayer.length === layerSize) {
            layersArray.push(JSON.parse(JSON.stringify(nextLayer)));
            nextLayer = [];
        }
    }
    return layersArray;
}
exports.parseIntoLayers = parseIntoLayers;
