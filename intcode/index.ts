import { getInput } from "./helpers";
import runIntcodeTests from "./intcodeTests";
import computer from "./computer";

// Main function
function advent(){
  // runs any tests, then starts current challenge
  return runIntcodeTests()
    .then(() => getInput("input.txt")
    .then((program: bigint[]) => {
      console.log("starting day X")
    }))
}




advent();