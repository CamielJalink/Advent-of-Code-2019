"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
// promisify the readFile node method to read our txt input files.
function advent() {
    return runTests().then(function () {
        return helpers_1.getInput("input.txt").then(function (input) {
            var layerwidth = 25;
            var layers = helpers_1.parseIntoLayers(input, layerwidth, 6);
            var image = createImageFromLayers(layers);
            displayImage(image, layerwidth);
            return;
        });
    });
}
function createImageFromLayers(layers) {
    var image = "";
    var layerLength = layers[0].length;
    for (var i = 0; i < layerLength; i++) {
        var pixel = "2";
        for (var j = 0; j < layers.length; j++) {
            if (layers[j][i] === '0') {
                pixel = ' ';
                break;
            }
            else if (layers[j][i] === '1') {
                pixel = '1';
                break;
            }
        }
        image += pixel;
    }
    return image;
}
function displayImage(image, horizontalSize) {
    var row = "";
    for (var i = 0; i < image.length; i++) {
        row += image[i];
        if ((i + 1) % horizontalSize === 0 && row.length > 0) {
            console.log(row);
            row = "";
        }
    }
}
function runTests() {
    return helpers_1.getInput("test.txt").then(function (input) {
        var layers = helpers_1.parseIntoLayers(input, 2, 2);
        var image = createImageFromLayers(layers);
        displayImage(image, 2);
        console.log(" ");
        return;
    });
}
advent();
