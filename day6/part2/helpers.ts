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


  // Check if you or one of your children has Santa.
  // If not, recursively ask your parent to do the same.
  checkParentsForSanta(jumps: number){
    let myJumps: number = this.checkChildrenForSanta(jumps);
    if(myJumps > -1){
      return myJumps;
    } else{
      return this.parent.checkParentsForSanta(jumps+1);
    }
  }


  checkChildrenForSanta(jumps: number){

    if(this.children.length > 0){ // Only try if you have children nodes
      // First, check if one of your direct children is Santa
      let childIsSanta: boolean = false;
      this.children.forEach((child) => {
        if(child.name === "SAN"){
          childIsSanta = true;
        }
      })
  
      if(childIsSanta){
        return jumps; 
      }
      // If none of your direct children is Santa, ask them to resursively check their children
      else{
        let aChildHasSanta: boolean = false;
        this.children.forEach((child) => {
          let childResult = child.checkChildrenForSanta(jumps + 1);
          if(childResult > -1){
            aChildHasSanta = true;
            jumps = childResult;
          }
        })

        if(aChildHasSanta){ // If one of your children has Santa, return it's jumps
          return jumps;
        } else{
          return -1; // If none of your children have Santa, return -1
        }
      }
    }
    else{ // If you have no children, return -1
      return -1;
    }
  }
}