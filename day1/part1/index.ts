import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);

function fuelForModule(mass: number){
  let fuel: number = Math.floor((mass / 3)) - 2;
  return fuel;
}


function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let inputStringArray: string[] = input.split("\n");
    let inputArray: number[] = [];

    inputStringArray.forEach((module) => {
      inputArray.push(parseInt(module))
    })

    let totalFuelNeeded: number = 0;
    inputArray.forEach((module) => {
      totalFuelNeeded += fuelForModule(module);
    })

    console.log(totalFuelNeeded);
  })
}

advent();