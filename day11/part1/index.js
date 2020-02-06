"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./helpers");
const intcodeTests_1 = __importDefault(require("./intcodeTests"));
const computer_1 = __importDefault(require("./computer"));
// Main function
function advent() {
    // runs any tests, then starts current challenge
    return intcodeTests_1.default()
        .then(() => helpers_1.getInput("input.txt")
        .then((program) => {
        console.log("starting day 11");
        let computer = new computer_1.default(program, true);
        paintShip(computer);
    }));
}
function paintShip(computer) {
    console.log(computer.runProgram([0n]));
}
advent();
