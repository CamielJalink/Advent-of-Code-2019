import { getInput } from "./helpers";

// promisify the readFile node method to read our txt input files.

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
      // console.log(input);
      console.log("starting with real input");
    })
  })
}



function runTests(){
  return getInput("test1.txt").then((testInput: string[]) => {
    console.log(testInput);
  });
}

advent();