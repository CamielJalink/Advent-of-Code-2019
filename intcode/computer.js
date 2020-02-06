"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Computer {
    constructor(memory, multipleRunsMode) {
        this.i = 0;
        this.relativeBase = 0n;
        this.memory = memory;
        this.multipleRunsMode = multipleRunsMode;
    }
    runProgram(input) {
        let isRunning = true;
        let isPaused = false;
        let output = [];
        let opcodeInput = input.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.
        while (isRunning && !isPaused) {
            //instructions aren't bigintegers, so we cast them to Number before parsing them.
            let instruction = parseInstruction(Number(this.memory[this.i]));
            // The instruction array contains both the intcode as well as the parameter modes
            switch (instruction[0]) {
                case 1: // Summation opcode
                    let sum1 = parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase);
                    let sum2 = parseParameter(2, this.memory, this.i, instruction[2], this.relativeBase);
                    if (instruction[3] === 0) {
                        this.memory[Number(this.memory[this.i + 3])] = sum1 + sum2; // third param is in position or relative mode.
                    }
                    else if (instruction[3] === 2) {
                        this.memory[Number(this.relativeBase + this.memory[this.i + 3])] = sum1 + sum2;
                    }
                    this.i += instruction.length;
                    break;
                case 2: // Multiplication opcode
                    let mult1 = parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase);
                    let mult2 = parseParameter(2, this.memory, this.i, instruction[2], this.relativeBase);
                    if (instruction[3] === 0) {
                        this.memory[Number(this.memory[this.i + 3])] = mult1 * mult2;
                    }
                    else if (instruction[3] === 2) {
                        this.memory[Number(this.relativeBase + this.memory[this.i + 3])] = mult1 * mult2;
                    }
                    this.i += instruction.length;
                    break;
                case 3: // Input instruction
                    if (opcodeInput.length > 0) {
                        if (instruction[1] === 0) {
                            this.memory[Number(this.memory[this.i + 1])] = opcodeInput.pop();
                        }
                        else if (instruction[1] === 2) {
                            this.memory[Number(this.relativeBase + this.memory[this.i + 1])] = opcodeInput.pop();
                        }
                    }
                    else {
                        throw new Error("No input for opcode 3 was specified");
                    }
                    this.i += instruction.length;
                    break;
                case 4: // Output opcode
                    // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
                    if (instruction[1] === 0) {
                        output.push(this.memory[Number(this.memory[this.i + 1])]);
                    }
                    else if (instruction[1] === 2) {
                        output.push(this.memory[Number(this.relativeBase + this.memory[this.i + 1])]);
                    }
                    else {
                        output.push(this.memory[this.i + 1]);
                    }
                    if (this.multipleRunsMode) {
                        isPaused = true;
                    }
                    this.i += instruction.length;
                    break;
                case 5: //Jump-if-true opcode:  Jumps if the parameter value IS NOT zero.
                    if (parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase) !== 0n) {
                        if (instruction[2] === 0) {
                            this.i = Number(this.memory[Number(this.memory[this.i + 2])]);
                        }
                        else if (instruction[2] === 2) {
                            this.i = Number(this.memory[Number(this.relativeBase + this.memory[this.i + 2])]);
                        }
                        else {
                            this.i = Number(this.memory[this.i + 2]);
                        }
                    }
                    else {
                        this.i += instruction.length;
                    }
                    break;
                case 6: // jump-if-false instruction: Jumps if the parameter value IS zero
                    if (parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase) === 0n) {
                        if (instruction[2] === 0) {
                            this.i = Number(this.memory[Number(this.memory[this.i + 2])]);
                        }
                        else if (instruction[2] === 2) {
                            this.i = Number(this.memory[Number(this.relativeBase + this.memory[this.i + 2])]);
                        }
                        else {
                            this.i = Number(this.memory[this.i + 2]);
                        }
                    }
                    else {
                        this.i += instruction.length;
                    }
                    break;
                case 7: // less-than opcode
                    let ltNum1 = parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase);
                    let ltNum2 = parseParameter(2, this.memory, this.i, instruction[2], this.relativeBase);
                    if (instruction[3] === 0) {
                        this.memory[Number(this.memory[this.i + 3])] = (ltNum1 < ltNum2) ? 1n : 0n;
                    }
                    else if (instruction[3] === 2) {
                        this.memory[Number(this.relativeBase + this.memory[this.i + 3])] = (ltNum1 < ltNum2) ? 1n : 0n;
                    }
                    this.i += instruction.length;
                    break;
                case 8: // equals opcode
                    let eqNum1 = parseParameter(1, this.memory, this.i, instruction[1], this.relativeBase);
                    let eqNum2 = parseParameter(2, this.memory, this.i, instruction[2], this.relativeBase);
                    if (instruction[3] === 0) {
                        this.memory[Number(this.memory[this.i + 3])] = eqNum1 === eqNum2 ? 1n : 0n;
                    }
                    else if (instruction[3] === 2) {
                        this.memory[Number(this.relativeBase + this.memory[this.i + 3])] = eqNum1 === eqNum2 ? 1n : 0n;
                    }
                    this.i += instruction.length;
                    break;
                case 9: //Adjusts the this.relativeBase number by the value of its only parameter
                    if (instruction[1] === 0) { // in position mode
                        this.relativeBase += this.memory[Number(this.memory[this.i + 1])];
                    }
                    else if (instruction[1] === 2) { // in relative mode
                        this.relativeBase += this.memory[Number(this.relativeBase + this.memory[this.i + 1])];
                    }
                    else { // in immediate mode
                        this.relativeBase += this.memory[this.i + 1];
                    }
                    this.i += instruction.length;
                    break;
                case 99:
                    isRunning = false;
                    break;
                default:
                    isRunning = false;
                    throw new Error("Invalid opcode encoutered. Default switch error created.");
            }
        }
        // In multiple runs mode, if the program
        if (isPaused && isRunning) {
            return output;
        }
        else {
            // reset the computer;
            return output;
        }
    }
}
exports.default = Computer;
function paramsPerInstruction(instruction) {
    switch (instruction) {
        case 1: // sum
            return 3;
        case 2: // multiplication
            return 3;
        case 3: // input
            return 1;
        case 4: // output
            return 1;
        case 5: // jump if true
            return 2;
        case 6: // jump if false
            return 2;
        case 7: // less than
            return 3;
        case 8: // equals
            return 3;
        case 9: // add or subtract from base relative base. 
            return 1;
        case 99:
            return 0;
        default:
            return new Error();
    }
}
function parseInstruction(input) {
    let translatedInstruction = [];
    translatedInstruction.push(input % 100); // First, find the opcode type
    input = Math.floor(input / 100); // and remove that part from the input number
    let numParams = paramsPerInstruction(translatedInstruction[0]); // get #params
    for (let i = 0; i < numParams; i++) {
        translatedInstruction.push(input % 10);
        input = Math.floor(input / 10);
    }
    return translatedInstruction;
}
// This function evaluaties the value of a parameter base on it's mode, and returns it to the instruction.
function parseParameter(paramNum, program, i, paramMode, relativeBase) {
    let paramValue;
    // Position Mode
    if (paramMode === 0) {
        paramValue = checkProgramMemory(program, Number(program[i + paramNum]));
    }
    // Immediate Mode
    else if (paramMode === 1) {
        paramValue = checkProgramMemory(program, i + paramNum);
    }
    // Relative Mode
    else if (paramMode === 2) {
        paramValue = checkProgramMemory(program, Number(relativeBase + program[i + paramNum]));
    }
    else {
        throw new Error('A parameter was found without parameter mode 0, 1 or 2');
    }
    return paramValue;
}
function checkProgramMemory(program, target) {
    if (program[target] === undefined) {
        return 0n;
    }
    else {
        return program[target];
    }
}
