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