import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);

function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let wireArray: string[] = input.split("\n");

    let wire1 = wireArray[0].split(",");
    let wire2 = wireArray[1].split(",");

    findClosestCrossing(wire1, wire2);
  })
}


interface Coord {
  x: number,
  y: number
}


function findClosestCrossing(wire1: string[], wire2: string[]){

  findWireCoordinates(wire1);
  findWireCoordinates(wire2);
}


function findWireCoordinates(wire: string[]){
  let wireCoords: Coord[] = [];
  let currentCoord: Coord = {x: 0, y: 0}

  for(let i = 0; i < wire.length; i++){
    let operation: string = wire[i]; // R105
    let direction: string = operation[0];  // R
    let distance: number = parseInt(operation.substring(1)); // 105

    doOperation(direction, distance, currentCoord, wireCoords);
     }
  
  return wireCoords;
}


function doOperation(direction: string, distance: number, currentCoord: Coord, wireCoords: Coord[]){
  
  switch(direction) {
    case 'R':
      for(let j = 0; j < distance; j++){
        currentCoord.x = currentCoord.x + 1;
        wireCoords.push(currentCoord);
      }
      break;
    case 'D':
      for(let j = 0; j < distance; j++){
        currentCoord.y = currentCoord.y - 1;
        wireCoords.push(currentCoord);
      }
      break;
    case 'L':
      for(let j = 0; j < distance; j++){
        currentCoord.x = currentCoord.x - 1; 
        wireCoords.push(currentCoord);
      }
      break;
    case 'U':
      for(let j = 0; j < distance; j++){
        currentCoord.y = currentCoord.y + 1;
        wireCoords.push(currentCoord);
      }
      break;
  }
  return 
}


advent();


// Twee tests