import { readFile } from "fs";
import { promisify } from "util";
// promisify the readFile node method to read our txt input files.

let readInput = promisify(readFile);

export function getInput(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split("\r\n");
    return inputStringArray;
  })
}