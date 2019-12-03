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

  let wire1coords: Coord[] = findWireCoordinates(wire1);
  let wire2coords: Coord[] = findWireCoordinates(wire2);
  let allcrossings = findCrossings(wire1coords, wire2coords);

  let closestCrossingDistance: number = determineDistance(allcrossings[0].x, allcrossings[0].y)

  for(let i = 0; i < allcrossings.length; i++){
    if( determineDistance(allcrossings[i].x, allcrossings[i].y) < closestCrossingDistance){
      closestCrossingDistance = determineDistance(allcrossings[i].x, allcrossings[i].y);
    }
  }

  console.log(closestCrossingDistance);
  // console.log(closest)
}



function findWireCoordinates(wire: string[]){
  let wireCoords: Coord[] = [];
  let currentCoord: Coord = {x: 0, y: 0}

  for(let i = 0; i < wire.length; i++){
    let operation: string = wire[i]; // e.g. R105
    let direction: string = operation[0];  //e.g. R
    let distance: number = parseInt(operation.substring(1)); //e.g. 105

    switch (direction) {
      case 'R':
        for (let j = 0; j < distance; j++) {
          currentCoord.x = currentCoord.x + 1;
          wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
        }
        break;
      case 'D':
        for (let j = 0; j < distance; j++) {
          currentCoord.y = currentCoord.y - 1;
          wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
        }
        break;
      case 'L':
        for (let j = 0; j < distance; j++) {
          currentCoord.x = currentCoord.x - 1;
          wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
        }
        break;
      case 'U':
        for (let j = 0; j < distance; j++) {
          currentCoord.y = currentCoord.y + 1;
          wireCoords.push(JSON.parse(JSON.stringify(currentCoord)));
        }
        break;
    }
  }
  
  return wireCoords;
}


function findCrossings(wire1coords: Coord[], wire2coords: Coord[]){

  let crossings: Coord[] = [];

  for (let i = 0; i < wire1coords.length; i++) {
    for (let j = 0; j < wire2coords.length; j++) {

      let wire1C: Coord = wire1coords[i];
      let wire2C: Coord = wire2coords[j];

      if (wire1C.x == wire2C.x && wire1C.y == wire2C.y) {
        crossings.push(JSON.parse(JSON.stringify(wire1C)));
      }
    }
  }

  return crossings;
}


function determineDistance(x: number, y: number){
  return Math.abs(x) + Math.abs(y);
}


advent();


// Twee tests