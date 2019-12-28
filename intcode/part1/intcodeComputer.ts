// The main logic for this puzzle. Loops over the inputarray and modifies it.
export default function runProgram(input: bigint[], opcodeInput: bigint[]) {
  let i: number = 0;
  let relativeBase: bigint = 0n;
  let isRunning: boolean = true;
  let notPaused: boolean = true;
  let opcodeOutputs: bigint[] = [];
  opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.


  while (isRunning && notPaused) {

    //instructions aren't bigintegers, so we cast them to Number before parsing them.
    let instruction: number[] = parseInstruction(Number(input[i]));
    // The instruction array contains both the intcode as well as the parameter modes

    switch (instruction[0]) {
      case 1: // Summation opcode
        let sum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let sum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if (instruction[3] === 0) {
          input[Number(input[i + 3])] = sum1 + sum2; // third param is in position or relative mode.
        }
        else if (instruction[3] === 2) {
          input[Number(relativeBase + input[i + 3])] = sum1 + sum2;
        }
        i += instruction.length;
        break;



      case 2: // Multiplication opcode

        let mult1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let mult2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if (instruction[3] === 0) {
          input[Number(input[i + 3])] = mult1 * mult2;
        }
        else if (instruction[3] === 2) {
          input[Number(relativeBase + input[i + 3])] = mult1 * mult2;
        }
        i += instruction.length;
        break;



      case 3: // Input instruction
        if (opcodeInput.length > 0) {
          if (instruction[1] === 0) {
            input[Number(input[i + 1])] = opcodeInput.pop()!;
          }
          else if (instruction[1] === 2) {
            input[Number(relativeBase + input[i + 1])] = opcodeInput.pop()!;
          }
        } else {
          throw new Error("No input for opcode 3 was specified");
        }
        i += instruction.length;
        break;



      case 4: // Output opcode
        // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]

        if (instruction[1] === 0) {
          opcodeOutputs.push(input[Number(input[i + 1])]);
        }
        else if (instruction[1] === 2) {
          opcodeOutputs.push(input[Number(relativeBase + input[i + 1])])
        }
        else {
          opcodeOutputs.push(input[i + 1]);
        }
        i += instruction.length;
        break;



      case 5: //Jump-if-true opcode:  Jumps if the parameter value IS NOT zero.

        if (parseParameter(1, input, i, instruction[1], relativeBase) !== 0n) {
          if (instruction[2] === 0) {
            i = Number(input[Number(input[i + 2])]);
          }
          else if (instruction[2] === 2) {
            i = Number(input[Number(relativeBase + input[i + 2])]);
          }
          else {
            i = Number(input[i + 2]);
          }
        } else {
          i += instruction.length;
        }
        break;



      case 6: // jump-if-false instruction: Jumps if the parameter value IS zero

        if (parseParameter(1, input, i, instruction[1], relativeBase) === 0n) {
          if (instruction[2] === 0) {
            i = Number(input[Number(input[i + 2])]);
          }
          else if (instruction[2] === 2) {
            i = Number(input[Number(relativeBase + input[i + 2])]);
          }
          else {
            i = Number(input[i + 2]);
          }
        } else {
          i += instruction.length;
        }
        break;



      case 7: // less-than opcode

        let ltNum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let ltNum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if (instruction[3] === 0) {
          input[Number(input[i + 3])] = (ltNum1 < ltNum2) ? 1n : 0n;
        }
        else if (instruction[3] === 2) {
          input[Number(relativeBase + input[i + 3])] = (ltNum1 < ltNum2) ? 1n : 0n;
        }
        i += instruction.length;
        break;



      case 8: // equals opcode

        let eqNum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let eqNum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if (instruction[3] === 0) {
          input[Number(input[i + 3])] = eqNum1 === eqNum2 ? 1n : 0n;
        }
        else if (instruction[3] === 2) {
          input[Number(relativeBase + input[i + 3])] = eqNum1 === eqNum2 ? 1n : 0n;
        }

        i += instruction.length;
        break;



      case 9: //Adjusts the relativeBase number by the value of its only parameter
        if (instruction[1] === 0) { // in position mode
          relativeBase += input[Number(input[i + 1])];
        } else if (instruction[1] === 2) { // in relative mode
          relativeBase += input[Number(relativeBase + input[i + 1])]
        } else { // in immediate mode
          relativeBase += input[i + 1];
        }
        i += instruction.length;
        break;



      case 99:
        isRunning = false;
        break;
      default:
        console.log("unexpected number found, error!");
        isRunning = false;
    }

  }

  if( isRunning && !notPaused){
    let programMemory: ProgramMemory = new ProgramMemory(JSON.parse(JSON.stringify(input)), i, opcodeOutputs);
    return programMemory;
  }
  else{
    return opcodeOutputs;
  }
}



export class ProgramMemory{

  program: bigint[];
  i: number;
  previousOutput: bigint[];
  constructor(program: bigint[], i : number, previousOutput: bigint[]){
    this.program = program;
    this.i = i;
    this.previousOutput = previousOutput;
  }
}



function paramsPerInstruction(instruction: number) {
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



function parseInstruction(input: number) {

  let translatedInstruction: number[] = [];

  translatedInstruction.push(input % 100); // First, find the opcode type
  input = Math.floor(input / 100);  // and remove that part from the input number
  let numParams = paramsPerInstruction(translatedInstruction[0]); // get #params

  for (let i = 0; i < numParams; i++) {
    translatedInstruction.push(input % 10);
    input = Math.floor(input / 10);
  }

  return translatedInstruction;
}



// This function evaluaties the value of a parameter base on it's mode, and returns it to the instruction.
function parseParameter(paramNum: number, program: bigint[], i: number, paramMode: number, relativeBase: bigint) {
  let paramValue: bigint;

  // Position Mode
  if (paramMode === 0) {
    paramValue = checkProgramMemory(program, Number(program[i + paramNum]))
  }
  // Immediate Mode
  else if (paramMode === 1) {
    paramValue = checkProgramMemory(program, i + paramNum);
  }
  // Relative Mode
  else if (paramMode === 2) {
    paramValue = checkProgramMemory(program, Number(relativeBase + program[i + paramNum]))
  }
  else {
    throw new Error('A parameter was found without parameter mode 0, 1 or 2');
  }

  return paramValue;
}



function checkProgramMemory(program: bigint[], target: number) {
  if (program[target] === undefined) {
    return 0n;
  } else {
    return program[target];
  }
}