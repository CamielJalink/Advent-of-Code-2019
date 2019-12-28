import { getInput, multiTest } from "./helpers";
import runProgram from "./intcodeComputer";



export default function runIntcodeTests() {
  
  

  return multiTest("day5tests.txt")
    .then((testPrograms: bigint[][]) => {
      let day5inputs: bigint[][] = [[8n], [6n], [7n], [3n], [2n], [0n], [8n], [1n]];
      let day5outputs: bigint[][] = [[1n], [1n], [0n], [1n], [1n], [0n], [1000n], [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 5346030n]];

      for (let i = 0; i < testPrograms.length; i++) {

        let output = runProgram(testPrograms[i], day5inputs[i]);
        if (output[0] !== day5outputs[i][0]) {
          console.log("Error in day5 test number " + (i + 1));
          console.log("Expected " + output[0] + " to be " + day5outputs[i][0]);
        }
      }
      console.log("Done with day5 tests");
    }).then(() => {


      
      return multiTest("day9tests.txt")
        .then((testPrograms: bigint[][]) => {

          let day9outputs: bigint[][] = [
            [109n, 1n, 204n, -1n, 1001n, 100n, 1n, 100n, 1008n, 100n, 16n, 101n, 1006n, 101n, 0n, 99n],
            [1219070632396864n],
            [1125899906842624n],
            [3235019597n],
            [80274n]
          ]
          let day9inputs: bigint[][] = [[0n], [0n], [0n], [1n], [2n]];

          for (let i = 0; i < testPrograms.length; i++) {
            let output = runProgram(testPrograms[i], day9inputs[i]); // runprogram should still work without an input as well.
            let testValid: boolean = true;

            for (let j = 0; j < output.length; j++) {
              if (output[j] !== day9outputs[i][j]) {
                testValid = false;
              }
            }

            if (!testValid) {
              console.log("Error in day9 test number " + (i + 1));
              console.log("Expected " + output + " to be " + day9outputs[i]);
            }
          }

          console.log("Done with day9 tests");
        })
    })
}