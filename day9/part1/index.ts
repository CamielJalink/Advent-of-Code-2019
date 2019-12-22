import { getInput, parseInstruction, parseParameter, multiTest } from "./helpers";

// Main function
function advent(){
  // runs any tests, then starts current challenge
  return runTests()
    .then(() => getInput("input.txt")
    .then((program: bigint[]) => {
      console.log("starting day9 part1")
      console.log(runProgram(program, [1n]));
    }))
}


// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input: bigint[], opcodeInput: bigint[]){
  let i: number = 0;
  let relativeBase: bigint = 0n; 
  let isRunning: boolean = true;
  let opcodeOutputs: bigint[] = [];
  opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.


  while(isRunning){

    //instructions aren't bigintegers, so we cast them to Number before parsing them.
    let instruction: number[] = parseInstruction(Number(input[i]));
    // The instruction array contains both the intcode as well as the parameter modes
    
    switch(instruction[0]){
      case 1: // Summation opcode
        let sum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let sum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if (instruction[3] === 0){
          input[Number(input[i+3])] = sum1 + sum2; // third param is in position or relative mode.
        } 
        else if(instruction[3] === 2){
          input[Number(relativeBase + input[i+3])] = sum1 + sum2;
        }
        i += instruction.length;
        break;



      case 2: // Multiplication opcode

        let mult1: bigint = parseParameter(1, input, i , instruction[1], relativeBase);
        let mult2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if(instruction[3] === 0){
          input[Number(input[i + 3])] = mult1 * mult2;
        } 
        else if(instruction[3] === 2){
          input[Number(relativeBase + input[i + 3])] = mult1 * mult2;
        }
        i += instruction.length;
        break;
  


      case 3: // Input instruction
        console.log("arrived at an input");
        if(opcodeInput.length > 0){
          if(instruction[1] === 0){
            input[Number(input[i+1])] = opcodeInput.pop()!;
          } 
          else if(instruction[1] === 2){
            input[Number(relativeBase + input[i + 1])] = opcodeInput.pop()!;
          }
        } else{
          throw new Error("No input for opcode 3 was specified");
        }
        i += instruction.length;
        break;



      case 4: // Output opcode
        // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
        
        if(instruction[1] === 0){
          opcodeOutputs.push(input[Number(input[i+1])]);
        } 
        else if(instruction[1] === 2){
          opcodeOutputs.push(input[Number(relativeBase + input[i+1])])
        }
        else{
          opcodeOutputs.push(input[i+1]);
        }
        i += instruction.length;
        break;



      case 5: //Jump-if-true opcode:  Jumps if the parameter value IS NOT zero.

        if(parseParameter(1, input, i, instruction[1], relativeBase) !== 0n ){
          if(instruction[2] === 0){
            i = Number(input[Number(input[i + 2])]);
          } 
          else if(instruction[2] === 2){
            i = Number(input[Number(relativeBase + input[i + 2])]);
          } 
          else{
            i = Number(input[i+2]);
          }
        } else{
          i += instruction.length;
        }
        break;



      case 6: // jump-if-false instruction: Jumps if the parameter value IS zero

        if (parseParameter(1, input, i, instruction[1], relativeBase) === 0n) {
          if (instruction[2] === 0) {
            i = Number(input[Number(input[i+2])]);
          } 
          else if(instruction[2] === 2){
            i = Number(input[Number(relativeBase + input[i + 2])]);
          } 
          else {
            i = Number(input[i + 2]);
          }
        } else{
          i += instruction.length;
        }
        break;



      case 7: // less-than opcode

        let ltNum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let ltNum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if(instruction[3] === 0){
          input[Number(input[i+3])] = (ltNum1 < ltNum2) ? 1n : 0n;
        } 
        else if(instruction[3] === 2){
          input[Number(relativeBase + input[i + 3])] = (ltNum1 < ltNum2) ? 1n : 0n;
        }
        i += instruction.length;
        break;

      
        
      case 8: // equals opcode

        let eqNum1: bigint = parseParameter(1, input, i, instruction[1], relativeBase);
        let eqNum2: bigint = parseParameter(2, input, i, instruction[2], relativeBase);

        if(instruction[3] === 0){
          input[Number(input[i+3])] = eqNum1 === eqNum2 ? 1n : 0n;
        } 
        else if(instruction[3] === 2){
          input[Number(relativeBase + input[i + 3])] = eqNum1 === eqNum2 ? 1n : 0n;
        }

        i += instruction.length;
        break;
      


      case 9: //Adjusts the relativeBase number by the value of its only parameter
        if(instruction[1] === 0){ // in position mode
          relativeBase += input[Number(input[i+1])];
        } else if(instruction[1] === 2){ // in relative mode
          relativeBase += input[Number(relativeBase + input[i + 1])]
        } else{ // in immediate mode
          relativeBase += input[i+1];
        }
        i += instruction.length;
        break;



      case 99:
        isRunning = false;
        break;
      default:
        console.log("unexpected number found, error!");
        isRunning = false;
    }

    // if(i >= input.length){
    //   isRunning = false;
    // }
  }

  return opcodeOutputs;
}



function runTests(){
  return multiTest("day5tests.txt")
  .then((testPrograms: bigint[][]) => {
    let day5inputs: bigint[][] = [[8n],[6n],[7n],[3n],[2n],[0n],[8n],[1n]];
    let day5outputs: bigint[][] = [[1n],[1n],[0n],[1n],[1n],[0n],[1000n],[0n,0n,0n,0n,0n,0n,0n,0n,0n,5346030n]];

    for(let i = 0; i < testPrograms.length; i++){

      let output = runProgram(testPrograms[i], day5inputs[i]);
      if(output[0] !== day5outputs[i][0]){
        console.log("Error in day5 test number " + (i+1));
        console.log("Expected " + output[0] + " to be " + day5outputs[i][0]);
      }
    }
    console.log("Done with day5 tests");
  })
  .then(() => { return multiTest("day9tests.txt")
  .then((testPrograms: bigint[][]) => {

    let day9outputs: bigint[][] = [
      [109n,1n,204n,-1n,1001n,100n,1n,100n,1008n,100n,16n,101n,1006n,101n,0n,99n],
      [1219070632396864n],
      [1125899906842624n]
    ]

    for(let i = 0; i < testPrograms.length; i++){
      let output = runProgram(testPrograms[i], [0n]); // runprogram should still work without an input as well.
      let testValid: boolean = true;

      for(let j = 0; j < output.length; j++){
        if(output[j] !== day9outputs[i][j]){
          testValid = false;
        }
      }

      if(!testValid){
        console.log("Error in day9 test number " + (i + 1));
        console.log("Expected " + output + " to be " + day9outputs[i]);
      }
    }

    console.log("Done with day9 tests");
  })
  })
}

advent();