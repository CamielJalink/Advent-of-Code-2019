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



// This helperfunction checks whether the parameters of an opcode are still within the array.
export function inputIsValid(input: number[], i: number) {
  let positionsValid: boolean = true;

  if (input[i + 1] > input.length || input[i + 2] > input.length || input[i + 3] > input.length) {
    console.log("Error: illegal arrayposition")
    positionsValid = false;
  }

  return positionsValid;
}