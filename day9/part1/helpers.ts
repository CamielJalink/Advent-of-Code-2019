import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);



// This function returns an array of integers created by parsing a string-input.
function createIntArray(input: string){
  let inputStringArray: string[] = input.split(",");
  let inputArray: bigint[] = [];
  inputStringArray.forEach((num) => {
    inputArray.push(BigInt(num));
  })
  return inputArray;
}



// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
export function getInput(fileName: string) {
  return readInput(fileName, "utf8").then((input: string) => {
    return createIntArray(input);
  })
}



export function multiTest(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {
    // op enters de verschillende tests inlezen
    let testStringArray: string[] = input.split("\n");

    let multipleTestsArray: bigint[][] = [];

    testStringArray.forEach((testString: string) => {
      multipleTestsArray.push(createIntArray(testString));
    })

    return multipleTestsArray;
  })
}



function paramsPerInstruction(instruction: number){
  switch(instruction){
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



export function parseInstruction(input: number){

  let translatedInstruction: number[] = [];

  translatedInstruction.push(input % 100); // First, find the opcode type
  input = Math.floor(input / 100);  // and remove that part from the input number
  let numParams = paramsPerInstruction(translatedInstruction[0]); // get #params

  for(let i = 0; i < numParams; i++){
    translatedInstruction.push(input % 10);
    input = Math.floor(input / 10);
  }

  return translatedInstruction;
}



// This function evaluaties the value of a parameter base on it's mode, and returns it to the instruction.
export function parseParameter(paramNum: number, program: bigint[], i: number, paramMode: number, relativeBase: bigint){
  let paramValue: bigint;

  // Position Mode
  if(paramMode === 0){
    paramValue = checkProgramMemory(program, Number(program[i + paramNum]))
  }
  // Immediate Mode
  else if(paramMode === 1){
    paramValue = checkProgramMemory(program, i+paramNum);
  }
  // Relative Mode
  else if(paramMode === 2){
    paramValue = checkProgramMemory(program, Number(relativeBase + program[i + paramNum]))
  }
  else { 
    throw new Error('A parameter was found without parameter mode 0, 1 or 2');
  }

  return paramValue;
}



function checkProgramMemory(program: bigint[], target: number){
  if(program[target] === undefined){
    return 0n;
  } else{
    return program[target];
  }
}