import { getInput } from "./helpers";
import { JupiterSpace } from "./space";

function advent(){

  return runTests().then(() => {
    console.log("Starting with Day 12 part 1");
    // return getInput("input.txt").then((input: string[]) => {
    //   simulateSystem(input);
    // })
  })
}



function simulateSystem(input: string[]){

  let moonsNumArray: number[][] = [];
      
  input.forEach((stringMoon) => {
    let moonStrArray: string[] = stringMoon.split(', ');
    let moonNumArray: number[] = moonStrArray.map((stringCoord: string) => {
      return Number(stringCoord.substring(2));
    })
    moonsNumArray.push(moonNumArray);
  })
  
  let jupiterSpace = new JupiterSpace(moonsNumArray);
  for(let i = 0; i < 10; i++){
    jupiterSpace.StepInTime();
  }
}



function runTests(){
  return getInput("test.txt").then((input: string[]) => {
    simulateSystem(input);
    return;
  })
}

advent();