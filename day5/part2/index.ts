import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);


// probably a bit overkill but this function checks whether positions in the inputarray exist.
function inputIsValid(memory: number[], i: number){
  let positionsValid: boolean = true;

  if(memory[i+1] > memory.length || memory[i+2] > memory.length || memory[i+3] > memory.length){
    console.log("Error: illegal memory address")
    positionsValid = false;
  }

  return positionsValid; 
}


// The main logic for this puzzle. Loops over the inputarray and modifies it.
function intcode(memory: number[]){
  let i = 0; // i for instruction, of course..
  let isRunning: boolean = true;
  let param1, param2, param3;

  while(isRunning){
    param1 = memory[i+1];
    param2 = memory[i+2];
    param3 = memory[i+3];

    switch(memory[i]){
      case 1:
        if(inputIsValid(memory, i)){
          memory[param3] = memory[param1] + memory[param2];
        }
        else{
          isRunning = false;
        }
        break;

      case 2:
        if(inputIsValid(memory, i)){
          memory[param3] = memory[param1] * memory[param2]; 
        }
        else{
          isRunning = false;
        }
        break;
      case 99:
        // console.log("Instruction 99, we're done here");
        isRunning = false;
        break;
      default:
        console.log("unexpected instruction found, error!");
        isRunning = false;
    }

    i+=4;
    if(i >= memory.length){
      isRunning = false;
    }
  }
  return memory;
}


function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split(",");
    let cleanMemory: number[] = [];
    inputStringArray.forEach((num) => {
      cleanMemory.push(parseInt(num));
    })


    for(let i = 0; i < 100; i++){
      for(let j = 0; j < 100; j++){
        let memory = JSON.parse(JSON.stringify(cleanMemory));
        memory[1] = i;
        memory[2] = j;


        if(intcode(memory)[0] == 19690720){
          console.log("noun is " + i);
          console.log("verb is " + j);
          console.log((i * 100) + j);
          j = 999; // Ugly break out of this loop.
        }
      }
    }
  })
}

advent();