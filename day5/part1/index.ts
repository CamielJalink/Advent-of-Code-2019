import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);



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


// Starts program
function advent(){

// runs any tests, and after finishing those starts with the current problem
  return runTests()
    .then(() => formatInput("input.txt")
    .then((inputArray: number[]) => {
      let outputArray: number[] = parseInput(inputArray);
      console.log(outputArray[0]);
    }))
}





function runTests(){
  return formatInput("day2input.txt").then((inputArray: number[]) => {
    let outputArray: number[] = parseInput(inputArray);
    if (outputArray[0] === 3760627) {
      console.log("SUCCESS!!! Day2part1 test succesfull");
    } else {
      console.log("ERROR!!! Day2part1 test value is " + outputArray[0] + " instead of 3760627")
    }
  })
}


// This helperfunction reads input from a txt file as a string, and casts it to a numbers array before returning it.
function formatInput(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split(",");
    let inputArray: number[] = [];
    inputStringArray.forEach((num) => {
      inputArray.push(parseInt(num));
    })
    return inputArray;
  })
}

advent();