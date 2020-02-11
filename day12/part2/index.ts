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

// Mijn idee voor part twee:

// Een array met arrays. Elke subarray stelt alle states voor met dezelfde total energy.
//      Dus: Ik heb totalenergy 144. Ik zoek in de array met totalenergy 144 of er eentje is met exact dezelfde state.
//           De states ga ik als een string bijhouden voor een simpele check? 
//
//  En daarmee dus:
//    Na het doen van een StepInTime moet ik nog twee dingen doen:
//      1 Een string bouwen van deze state.
//      2 
// 

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