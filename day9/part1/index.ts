import { getInput, parseInstruction, multiTest } from "./helpers";

// Main function
function advent(){
  // runs any tests, then starts current challenge
  return runTests()

    .then(() => getInput("input.txt")
    .then((program: number[]) => {
      console.log("starting day9part1");
      console.log(parseInstruction(204));
    }))
}



// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input: number[], opcodeInput: number[]){
  let j = 0;
  let i = 0;
  let relativeBase: number = 0;
  let isRunning: boolean = true;
  let opcodeOutputs: number[] = [];
  opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.

  while(isRunning && j < 15){

    let instruction = parseInstruction(input[i]);  // Builds a small array that contains the opcode, and the TYPE of parameters (0 or 1) it has.
    // The instruction array contains both the intcode as well as the parameter modes
    switch(instruction[0]){
      case 1: // Summation opcode
        let sum1: number = 0, sum2: number = 0;

        if(instruction[1] === 0){ // position mode
          sum1 = input[input[i+1]];
        } else if(instruction[1] === 2){ // relative mode
          sum1 = input[input[i+1+relativeBase]];
        } else{
          sum1 = input[i+1]; // immediate mode
        }

        if (instruction[2] === 0) {
          sum2 = input[input[i + 2]];
        } else if(instruction[2] === 2){
          sum2 = input[input[i+2+relativeBase]];
        } else {
          sum2 = input[i + 2];
        }
        
        if (instruction[3] === 0){
          input[input[i+3]] = sum1 + sum2; // third param is in position or relative mode.
        } else if(instruction[3] === 2){
          input[input[i+3+relativeBase]] = sum1 + sum2;
        }
        i += 4;
        break;



      case 2: // Multiplication opcode
        let mult1: number = 0, mult2: number = 0;

        if (instruction[1] === 0) {
          mult1 = input[input[i + 1]];
        } else if(instruction[1] === 2){
          mult1 = input[input[i + 1 + relativeBase]]
        } else {
          mult1 = input[i + 1];
        }

        if (instruction[2] === 0) {
          mult2 = input[input[i + 2]];
        } else if(instruction[2] === 2){
          mult2 = input[input[i + 2 + relativeBase]]
        } else {
          mult2 = input[i + 2];
        }

        if(instruction[3] === 0){
          input[input[i + 3]] = mult1 * mult2;
        } else if(instruction[3] === 2){
          input[input[i + 3 + relativeBase]] = mult1 * mult2;
        }
        i += 4;
        break;
  


      case 3: // Input instruction
        // The input instruction now also cares about position or relative mode
        if(opcodeInput.length > 0){
          if(instruction[1] === 0){
            input[input[i+1]] = opcodeInput.pop()!;
          } else if(instruction[1] === 2){
            input[input[i+1 + relativeBase]] = opcodeInput.pop()!;
          }
        } else{
          throw new Error("No input for opcode 3 was specified");
        }
        i += 2;
        break;



      case 4: // Output opcode
        // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
        
        if(instruction[1] === 0){
          opcodeOutputs.push(input[input[i+1]]);
        } else if(instruction[1] === 2){
          let output = relativeBase + input[i+1];
          opcodeOutputs.push(input[output])
        }
        else{
          opcodeOutputs.push(input[i+1]);
        }
        i += 2;
        break;



      case 5: //Jump-if-true opcode
        //changes the (i) instruction pointer if i+1 is not 0
        let i1IsNotZero: boolean = false;

        if(instruction[1] === 0){
          if(input[input[i+1]] !== 0){
            i1IsNotZero = true;
          }
        } else if(instruction[1] === 2){
          if(input[input[i+1 + relativeBase]] !== 0){
            i1IsNotZero = true;
          }
        }
        else{
          if(input[i+1] !== 0){
            i1IsNotZero = true;
          }
        }

        if(i1IsNotZero){
          if(instruction[2] === 0){
            i = input[input[i+2]];
          } else if(instruction[2] === 2){
            i = input[input[i+2 + relativeBase]];
          } else{
            i = input[i+2];
          }
        } else{
          i += 3;
        }
        break;



      case 6: // jump-if-false instruction
      // Changes the (i) instruction pointer if the i+1 is 0
        let i1IsZero: boolean = false;

        if (instruction[1] === 0) {
          if (input[input[i + 1]] === 0) {
            i1IsZero = true;
          }
        } else if(instruction[1] === 2){
          if(input[input[i+1 + relativeBase]] === 0){
            i1IsZero = true;
          }
        } else {
          if (input[i + 1] === 0) {
            i1IsZero = true;
          }
        }

        if (i1IsZero) {
          if (instruction[2] === 0) {
            i = input[input[i+2]];
          } else if(instruction[2] === 2){
            i = input[input[i+2 + relativeBase]]
          } else {
            i = input[i + 2];
          }
        } else{
          i += 3;
        }
        break;



      case 7: // less-than opcode
        let ltNum1: number = 0, ltNum2: number = 0;

        if (instruction[1] === 0) { // first param
          ltNum1 = input[input[i+1]];
        } else if(instruction[1] === 2){
          ltNum1 = input[input[i+1 + relativeBase]]
        } else {
          ltNum1 = input[i+1];
        }

        if (instruction[2] === 0) { // second param
          ltNum2 = input[input[i+2]];
        } else if(instruction[2] === 2){
          ltNum2 = input[input[i+2 + relativeBase]]
        } else {
          ltNum2 = input[i+2];
        }

        if(instruction[3] === 0){
          input[input[i+3]] = (ltNum1 < ltNum2) ? 1 : 0;
        } else if(instruction[3] === 2){
          input[input[i+3+ relativeBase]] = (ltNum1 < ltNum2) ? 1 : 0;
        }
        i += 4;
        break;

      
        
      case 8: // equals opcode
        let eqNum1: number = 0, eqNum2: number = 0;

        if (instruction[1] === 0) {
          eqNum1 = input[input[i+1]];
        } else if(instruction[1] === 2){
          eqNum1 = input[input[i+1 + relativeBase]];
        } else {
          eqNum1 = input[i+1];
        }

        if (instruction[2] === 0) { // second param
          eqNum2 = input[input[i+2]];
        } else if(instruction[2] === 2){
          eqNum2 = input[input[i+2 + relativeBase]];
        } else {
          eqNum2 = input[i+2];
        }

        if(instruction[3] === 0){
          input[input[i+3]] = eqNum1 === eqNum2 ? 1 : 0;
        } else if(instruction[3] === 2){
          input[input[i+3 + relativeBase]] = eqNum1 === eqNum2 ? 1 : 0;
        }

        i += 4;
        break;
      


      case 9: //Adjusts the relativeBase number by the value of it's only parameter
        if(instruction[1] === 0){ // in position mode
          relativeBase += input[input[i+1]];
        } else if(instruction[1] === 2){ // in relative mode
          relativeBase += input[input[i+1 + relativeBase]]
        } else{ // in immediate mode
          relativeBase += input[i+1];
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
    j++;

    if(i >= input.length){
      isRunning = false;
    }
  }

  return opcodeOutputs;
}



function runTests(){
  return multiTest("day5tests.txt")
  // .then((testPrograms: number[][]) => {
  //   let day5inputs: number[][] = [[8],[6],[7],[3],[2],[0],[8],[1]];
  //   let day5outputs: number[][] = [[1],[1],[0],[1],[1],[0],[1000],[0,0,0,0,0,0,0,0,0,5346030]];

  //   for(let i = 0; i < testPrograms.length; i++){

  //     let output = runProgram(testPrograms[i], day5inputs[i]);
  //     if(output[0] !== day5outputs[i][0]){
  //       console.log("Error in day5 test number " + (i+1));
  //       console.log("Expected " + output[0] + " to be " + day5outputs[i][0]);
  //     }
  //   }
  //   console.log("done with day5 tests");
  // })
  .then(() => { return multiTest("day9tests.txt")
  .then((testPrograms: number[][]) => {
    let day9outputs: number[][] = [
      [109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99],
    ]
    for(let i = 0; i < testPrograms.length; i++){

      let output = runProgram(testPrograms[i], [0]); // runprogram should still work without an input as well.
      console.log(output);
      if(output !== day9outputs[i]){
        console.log("Error in day9 test number " + (i+1));
        console.log("Expected " + output[0] + " to be " + day9outputs[i][0]);
      }
    }
  })
  })
}

advent();