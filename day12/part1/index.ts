import { getInput } from "./helpers";


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