import { getInput } from "./helpers";

// promisify the readFile node method to read our txt input files.

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {




      console.log(input);
    })
  })
}



function runTests(){
  return getInput("input.txt").then((input: string[]) => {
    console.log("no tests currently made")
    return;
  })
}

advent();