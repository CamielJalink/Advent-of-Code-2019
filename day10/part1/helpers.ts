import { readFile } from "fs";
import { promisify } from "util";

let readInput = promisify(readFile);

export function getInput(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split("\r\n");
    return inputStringArray;
  })
}