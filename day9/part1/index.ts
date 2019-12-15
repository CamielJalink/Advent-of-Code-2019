import { getInput, parseOpcode, multiTest, getAmpPermutations } from "./helpers";

// Main function
function advent(){
  // runs any tests, then starts current challenge
  return runTests()

    .then(() => getInput("input.txt")
    .then((programme: number[]) => {
      console.log("starting day7part1");
      let phaseSettings: number[] = [0,1,2,3,4];
      let startInput: number[] = [0];
      let maxThrusterSignal: number = tryAmplifiers(programme, phaseSettings, startInput);
      console.log(maxThrusterSignal);

    }))
}



function tryAmplifiers(programme: number[], phaseSettings: number[], input: number[]){

  // All permutations of the amplifiers: [0,1,2,3,4]
  let allAmpPermutations: number[][] = getAmpPermutations(phaseSettings);
  let maxThrusterSignal: number = 0; 

  allAmpPermutations.forEach((ampPermutation: number[]) => {
    let output: number[] = input;

    for(let i = 0; i < ampPermutation.length; i++){
      let newProgramme: number[] = JSON.parse(JSON.stringify(programme));
      let nextInput: number[] = [ampPermutation[i]].concat(output);
      output = runProgram(newProgramme, nextInput);
    }

    if(output[0] > maxThrusterSignal){
      maxThrusterSignal = output[0];  // I guess outputs should always be a single value, but an outputarray seems more futureproof
    }
  })

  return maxThrusterSignal;
}



// The main logic for this puzzle. Loops over the inputarray and modifies it.
function runProgram(input: number[], opcodeInput: number[]){

  let i = 0;
  let isRunning: boolean = true;
  let opcodeOutputs: number[] = [];
  opcodeInput = opcodeInput.reverse(); // reverse opcodeInput to enable the use of the pop methode later-on.

  while(isRunning){

    let opcode = parseOpcode(input[i]);  // Builds a small array that contains the opcode, and the TYPE of parameters (0 or 1) it has.

    switch(opcode[0]){ // opcode[0] contains the type of opcode (1 for sum, 2 for multiplication, etc.)
      case 1: // Summation opcode
        let sum1: number = 0, sum2: number = 0;

        if(opcode[1] === 0){ // first param
          sum1 = input[input[i+1]];
        }else {
          sum1 = input[i+1];
        }

        if (opcode[2] === 0) { // second param
          sum2 = input[input[i + 2]];
        } else {
          sum2 = input[i + 2];
        }
        
        input[input[i+3]] = sum1 + sum2; // third param is always in position mode
        i += 4;
        break;



      case 2: // Multiplication opcode
        let mult1: number = 0, mult2: number = 0;

        if (opcode[1] === 0) {
          mult1 = input[input[i + 1]];
        } else {
          mult1 = input[i + 1];
        }

        if (opcode[2] === 0) {
          mult2 = input[input[i + 2]];
        } else {
          mult2 = input[i + 2];
        }

        input[input[i + 3]] = mult1 * mult2;
        i += 4;
        break;
  


      case 3: // Input opcode
        // "Parameters that an instruction writes to will never be in immediate mode"   <-- so we don't have to check opcode[1] 
        if(opcodeInput.length > 0){
          input[input[i+1]] = opcodeInput.pop()!;
        } else{
          throw new Error("No input for opcode 3 was specified");
        }
        i += 2;
        break;



      case 4: // Output opcode
        // Add an output to the opcodeOutputs array, based on the parameter mode of opcode[1]
        if(opcode[1] === 0){
          opcodeOutputs.push(input[input[i+1]]);
        }else{
          opcodeOutputs.push(input[i+1]);
        }
        i += 2;
        break;



      case 5: //Jump-if-true opcode
        //changes the (i) instruction pointer if i+1 is not 0
        let i1IsNotZero: boolean = false;

        if(opcode[1] === 0){
          if(input[input[i+1]] !== 0){
            i1IsNotZero = true;
          }
        } else{
          if(input[i+1] !== 0){
            i1IsNotZero = true;
          }
        }

        if(i1IsNotZero){
          if(opcode[2] === 0){
            i = input[input[i+2]];
          } else{
            i = input[i+2];
          }
        } else{
          i += 3;
        }
        break;



      case 6: // jump-if-false opcode
      // Changes the (i) instruction pointer if the i+1 is 0
        let i1IsZero: boolean = false;

        if (opcode[1] === 0) {
          if (input[input[i + 1]] === 0) {
            i1IsZero = true;
          }
        } else {
          if (input[i + 1] === 0) {
            i1IsZero = true;
          }
        }

        if (i1IsZero) {
          if (opcode[2] === 0) {
            i = input[input[i + 2]];
          } else {
            i = input[i + 2];
          }
        } else{
          i += 3;
        }
        break;



      case 7: // less-than opcode
        let ltNum1: number = 0, ltNum2: number = 0;

        if (opcode[1] === 0) { // first param
          ltNum1 = input[input[i + 1]];
        } else {
          ltNum1 = input[i + 1];
        }

        if (opcode[2] === 0) { // second param
          ltNum2 = input[input[i + 2]];
        } else {
          ltNum2 = input[i + 2];
        }

        if (ltNum1 < ltNum2) { // third param is always in position mode
          input[input[i + 3]] = 1;
        } else{
          input[input[i + 3]] = 0;
        } 

        i += 4;
        break;

      
        
      case 8: // equals opcode

        let eqNum1: number = 0, eqNum2: number = 0;

        if (opcode[1] === 0) { // first param
          eqNum1 = input[input[i + 1]];
        } else {
          eqNum1 = input[i + 1];
        }

        if (opcode[2] === 0) { // second param
          eqNum2 = input[input[i + 2]];
        } else {
          eqNum2 = input[i + 2];
        }

        if (eqNum1 === eqNum2) { // third param is always in position mode
          input[input[i + 3]] = 1;
        } else {
          input[input[i + 3]] = 0;
        }

        i += 4;
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

  return opcodeOutputs;
}



function runTests(){
  return multiTest("day5tests.txt")
  .then((testProgrammes: number[][]) => {
    let day5inputs: number[][] = [[8],[6],[7],[3],[2],[4],[8],[1]];
    for(let i = 0; i < testProgrammes.length; i++){
      console.log(runProgram(testProgrammes[i], day5inputs[i]));
    }
  })
  .then(() => { return multiTest("day7tests.txt")
  .then((testProgrammes: number[][]) => {
    let amplifierPhases: number[] = [0,1,2,3,4];
    if(tryAmplifiers(testProgrammes[0], amplifierPhases, [0]) !== 43210){
      console.log("ERROR in first day7part1 tests!")
    }
    if(tryAmplifiers(testProgrammes[1], amplifierPhases, [0]) !== 54321){
      console.log("ERROR in second day7part1 tests!")
    }
    if(tryAmplifiers(testProgrammes[2], amplifierPhases, [0]) !== 65210){
      console.log("ERROR in third day7part1 tests!")
    }
  })
  })
}

advent();