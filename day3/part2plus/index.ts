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
  y: number,
  steps: number
}

interface CoordPair{
  wire1: Coord;
  wire2: Coord;
}


function findClosestCrossing(wire1: string[], wire2: string[]){

  let wire1coords: Coord[] = findWireCoordinates(wire1);
  let wire2coords: Coord[] = findWireCoordinates(wire2);

  wire1coords = wire1coords.sort(coordsCompare);
  wire2coords = wire2coords.sort(coordsCompare);

  let allcrossings: CoordPair[] = findCrossings(wire1coords, wire2coords);

  let closestCrossingDistance: number = -1;


  for(let i = 0; i < allcrossings.length; i++){
    let totalsteps = allcrossings[i].wire1.steps + allcrossings[i].wire2.steps;

    if( totalsteps < closestCrossingDistance || closestCrossingDistance === -1){
      closestCrossingDistance = totalsteps;
    }
  }

  console.log(closestCrossingDistance);
}


function coordsCompare(first: Coord, second: Coord){
  if(first.x < second.x){
    return -1; 
  }
  if(first.x > second.x){
    return 1;
  }
  if(first.x === second.x){
    return first.y - second.y;
  }
  return 0;
}

function findWireCoordinates(wire: string[]){
  let wireCoords: Coord[] = [];

  let x: number = 0;
  let y: number = 0;
  let steps: number = 0;

  for(let i = 0; i < wire.length; i++){
    let operation: string = wire[i]; // e.g. R105
    let direction: string = operation[0];  //e.g. R
    let distance: number = parseInt(operation.substring(1)); //e.g. 105

    switch (direction) {
      case 'R':
        for (let j = 0; j < distance; j++) {
          x++;
          steps++;
          let newCoord: Coord = {x: x, y: y, steps: steps}
          wireCoords.push(newCoord);
        }
        break;
      case 'D':
        for (let j = 0; j < distance; j++) {
          y--;
          steps++;
          let newCoord: Coord = {x: x, y: y, steps: steps}
          wireCoords.push(newCoord);
        }
        break;
      case 'L':
        for (let j = 0; j < distance; j++) {
          x--;
          steps++;
          let newCoord: Coord = {x: x, y: y, steps: steps}
          wireCoords.push(newCoord);
        }
        break;
      case 'U':
        for (let j = 0; j < distance; j++) {
          y++;
          steps++;
          let newCoord: Coord = {x: x, y: y, steps: steps}
          wireCoords.push(newCoord);
        }
        break;
    }
  }
  
  return wireCoords;
}


function findCrossings(wire1coords: Coord[], wire2coords: Coord[]){
  
  let crossings: CoordPair[] = [];
  let i = 0;
  let j = 0;

  while(wire1coords.length > i && wire2coords.length > j){

    if(coordsCompare(wire1coords[i], wire2coords[j]) > 0){
      j += 1;
    } 
    else if(coordsCompare(wire1coords[i], wire2coords[j]) < 0 ){
      i += 1;
    }
    else{
      crossings.push( { wire1: wire1coords[i], wire2: wire2coords[j]} )
      i += 1;
      j += 1; 
    }
  }

  return crossings;
}




//findcrossings oud
// function findCrossings(wire1coords: Coord[], wire2coords: Coord[]){

//   let crossings: Coord[] = [];

//   for (let i = 0; i < wire1coords.length; i++) {
//     for (let j = 0; j < wire2coords.length; j++) {

//       let wire1C: Coord = wire1coords[i];
//       let wire2C: Coord = wire2coords[j];

//       if (wire1C.x == wire2C.x && wire1C.y == wire2C.y) {
//         crossings.push(JSON.parse(JSON.stringify(wire1C)));
//       }
//     }
//   }

//   return crossings;
// }

function determineDistance(x: number, y: number){
  return Math.abs(x) + Math.abs(y);
}


advent();


// Twee tests