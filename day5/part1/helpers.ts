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



// Old helper function from day2 that I'm no longer using.

// export function inputIsValid(input: number[], i: number) {
//   let positionsValid: boolean = true;

//   if (input[i + 1] > input.length || input[i + 2] > input.length || input[i + 3] > input.length) {
//     console.log("Error: illegal arrayposition")
//     positionsValid = false;
//   }

//   return positionsValid;
// }




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