import { getInput, parseOpcode } from "./helpers";

// Main function
function advent(){
  // runs any tests, then starts current challenge
    return runTests()
      .then(() => getInput("input.txt")
      .then((inputArray: number[]) => {
        
        runProgram(inputArray, 1);
      }))
  }



  
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input: number[], opcodeInput?: number){

  let i = 0;
  let isRunning: boolean = true;
  let opcodeOutputs: number[] = [];

  while(isRunning){

    let opcode = parseOpcode(input[i]);  // Builds a small array that contains the opcode, and the TYPE of parameters (0 or 1) it has.

    switch(opcode[0]){ // opcode[0] contains the type of opcode (1 for sum, 2 for multiplication, etc.)
      case 1:
        let sum1: number = 0, sum2: number = 0;

        if(opcode[1] === 0){ // first param
          sum1 = input[input[i+1]];
        }else {
          sum1 = input[i+1]
        }

        if (opcode[2] === 0) { // second param
          sum2 = input[input[i + 2]];
        } else {
          sum2 = input[i + 2]
        }
        
        input[input[i+3]] = sum1 + sum2; // third param is always in position mode
        i += 4;
        break;



      case 2:
        let mult1: number = 0, mult2: number = 0;

        if (opcode[1] === 0) {
          mult1 = input[input[i + 1]];
        } else {
          mult1 = input[i + 1]
        }

        if (opcode[2] === 0) {
          mult2 = input[input[i + 2]];
        } else {
          mult2 = input[i + 2]
        }

        input[input[i + 3]] = mult1 * mult2;
        i += 4;
        break;
  


      case 3: 
        // "Parameters that an instruction writes to will never be in immediate mode"   <-- so we don't have to check opcode[1] 
        if(opcodeInput){
          input[input[i+1]] = opcodeInput;
        } else{
          throw new Error("No input for opcode 3 was specified");
        }
        i += 2;
        break;



      case 4:
        // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
        if(opcode[1] === 0){
          opcodeOutputs.push(input[input[i+1]]);
        }else{
          opcodeOutputs.push(input[i+1]);
        }
        i += 2;
        break;



      case 99:
        isRunning = false;
        break;
      default:
        console.log("unexpected number found, error!");
        isRunning = false;
    }

    if(i >= input.length){
      isRunning = false;
    }
  }

  if(opcodeOutputs.length > 0 ){
    console.log("Opcode 4 output array: " + opcodeOutputs);
  }
  return input;
}



function runTests(){
  return getInput("day2input.txt").then((inputArray: number[]) => {
    let outputArray: number[] = runProgram(inputArray);
    if (outputArray[0] === 3760627) {
      console.log("SUCCESS!!! Day2part1 test succesfull");
    } else {
      console.log("ERROR!!! Day2part1 test value is " + outputArray[0] + " instead of 3760627")
    }
  })
}

advent();