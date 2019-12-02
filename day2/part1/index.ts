import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);


function parseInput(input: number[]){
  let output: number[] = input;
  let i = 0;
  let isRunning: boolean = true;

  while(isRunning){
    

  }
}

function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split(",");
    let inputArray: number[] = [];
    inputStringArray.forEach((num) => {
      inputArray.push(parseInt(num));
    })

  })
}

advent();