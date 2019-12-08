import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);



// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
export function getInput(fileName: string) {
  return readInput(fileName, "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split(",");
    let inputArray: number[] = [];
    inputStringArray.forEach((num) => {
      inputArray.push(parseInt(num));
    })
    return inputArray;
  })
}



function paramsPerInstruction(instruction: number){
  switch(instruction){
    case 1:
      return 3;
    case 2:
      return 3;
    case 3:
      return 1;
    case 4: 
      return 1;
    case 5: // jump if true
      return 2;
    case 6: // jump if false
      return 2;
    case 7: // less than
      return 3;
    case 8: // equals
      return 3;
    case 99:
      return 0;
    default:
      return new Error();
  }
}



export function parseOpcode(input: number){
let translatedOpcode: number[] = [];

translatedOpcode.push(input % 100); // first number is the opcode instruction
input = Math.floor(input / 100);  // remove the two digits determining the opcode.
let numParams = paramsPerInstruction(translatedOpcode[0]);

for(let i = 0; i < numParams; i++){
  translatedOpcode.push(input % 10);
  input = Math.floor(input / 10);
}

return translatedOpcode
}