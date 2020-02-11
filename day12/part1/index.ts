import { getInput } from "./helpers";
import { JupiterSpace } from "./space";

function advent(){

  return runTests().then(() => {
    console.log("Starting with Day 12 part 1");
    return getInput("input.txt").then((input: string[]) => {
      console.log(simulateSystem(input, 1000));
    })
  })
}



function simulateSystem(input: string[], numSteps: number){

  let moonsNumArray: number[][] = [];
      
  input.forEach((stringMoon) => {
    let moonStrArray: string[] = stringMoon.split(', ');
    let moonNumArray: number[] = moonStrArray.map((stringCoord: string) => {
      return Number(stringCoord.substring(2));
    })
    moonsNumArray.push(moonNumArray);
  })
  
  let jupiterSpace = new JupiterSpace(moonsNumArray);
  for(let i = 0; i < numSteps; i++){
    jupiterSpace.StepInTime();
  }

  return jupiterSpace.calculateTotalEnergy();
}



function runTests(){
  return getInput("test.txt").then((input: string[]) => {
    if(simulateSystem(input, 10) !== 179){
      console.log("The first testcased failed to return a system energy of 179");
    } else{
      console.log("Test succeeded");
    }
    return;
  })
}

advent();