import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);


// probably a bit overkill but this function checks whether positions in the inputarray exist.
function inputIsValid(input: number[], i: number){
  let positionsValid: boolean = true;

  if(input[i+1] > input.length || input[i+2] > input.length || input[i+3] > input.length){
    console.log("Error: illegal arrayposition")
    positionsValid = false;
  }

  return positionsValid; 
}


// The main logic for this puzzle. Loops over the inputarray and modifies it.
function parseInput(input: number[]){
  let i = 0;
  let isRunning: boolean = true;
  let pos1, pos2, targetPos;

  while(isRunning){
    pos1 = input[i+1];
    pos2 = input[i+2];
    targetPos = input[i+3];

    switch(input[i]){
      case 1:
        if(inputIsValid(input, i)){
          input[targetPos] = input[pos1] + input[pos2];
        }
        else{
          isRunning = false;
        }
        break;

      case 2:
        if(inputIsValid(input, i)){
          input[targetPos] = input[pos1] * input[pos2]; 
        }
        else{
          isRunning = false;
        }
        break;
      case 99:
        console.log("Found a 99, we're done here");
        isRunning = false;
        break;
      default:
        console.log("unexpected number found, error!");
        isRunning = false;
    }

    i+=4;
    if(i >= input.length){
      isRunning = false;
    }
  }
  return input;
}


function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split(",");
    let inputArray: number[] = [];
    inputStringArray.forEach((num) => {
      inputArray.push(parseInt(num));
    })

    let outputArray: number[] = parseInput(inputArray);
    console.log(outputArray[0]);
  })
}

advent();