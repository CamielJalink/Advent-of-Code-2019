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
  name: string;
  parentName: string;
  parent: any;
  children: Node[] = [];
  
  constructor(orbit: string){
    this.name = orbit.split(")")[1];
    this.parentName = orbit.split(")")[0];
  }

  countOrbits(step: number){
    let orbits: number = step;

    this.children.forEach((child:Node) => {
      orbits += child.countOrbits(step+1);
    })

    return orbits;
  }
}