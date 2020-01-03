"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const intcodeTests_1 = __importDefault(require("./intcodeTests"));
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return intcodeTests_1.default()
        .then(() => helpers_1.getInput("input.txt")
        .then((program) => {
        console.log("starting day X");
    }));
}
advent();
