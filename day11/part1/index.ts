import { getInput } from "./helpers";
import runIntcodeTests from "./intcodeTests";
import Computer from "./computer";

// Main function
function advent(){
  // runs any tests, then starts current challenge
  return runIntcodeTests()
    .then(() => getInput("input.txt")
    .then((program: bigint[]) => {
      console.log("starting day 11")
      let computer = new Computer(program);
      paintShip(computer);
    }))
}



function paintShip(computer: Computer){

  let robotLocation: number[] = [0,0];
  let robotDirection: string = "up";

  console.log(computer.runProgram([0n]));
}



advent();