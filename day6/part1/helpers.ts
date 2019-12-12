import { readFile } from "fs";
import { promisify } from "util";

let readInput = promisify(readFile);

export function getInput(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {

    let inputStringArray: string[] = input.split("\r\n");
    return inputStringArray;

  })
}



export class Node {
  name: string = "";
  parent: string = "";
  children: string[] = [];

  constructor(orbit: string){
    this.name = orbit.split(")")[1];
    this.parent = orbit.split(")")[0];
  }

  countOrbits(){
    let orbits: number = 1;
    orbits += this.children.length * 2;
    return orbits;
  }
}