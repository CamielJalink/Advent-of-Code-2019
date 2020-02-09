import { getInput } from "./helpers";
import { JupiterSpace } from "./space";

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
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