import { getInput, parseOpcode } from "./helpers";

// Main function
function advent(){
  // runs any tests, then starts current challenge
    return runTests()
      .then(() => getInput("input.txt")
      .then((inputArray: number[]) => {
        


        //console.log(runProgram(inputArray));
      }))
  }



  
// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input: number[]){
  let i = 0;
  let isRunning: boolean = true;

  while(isRunning){

    let opcode = parseOpcode(input[i]);

    switch(opcode[0]){
      case 1:
        input[opcode[3]] = input[opcode[1]] + input[opcode[2]]
        break;
      case 2:
        input[opcode[3]] = input[opcode[1]] + input[opcode[2]]
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