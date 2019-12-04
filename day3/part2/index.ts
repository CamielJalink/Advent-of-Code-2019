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


  // part two code start: an array is added for crossings that have been considered before.
  let visitedCrossings: Coord[] = [];
  let shortestCombinedWire: number = 999999999;

  for(let i = 0; i < allcrossings.length; i++){
    let wire1length: number = 999999999;
    let wire2length: number = 999999999;
    
    let allreadyChecked: boolean = false;
    for(let l = 0; l < visitedCrossings.length; l++){
      if(allcrossings[i].x == visitedCrossings[l].x && allcrossings[i].y == visitedCrossings[l].y){
        allreadyChecked = true;
      }
    }

    if(!allreadyChecked){
      for(let j = 0; j < wire1coords.length; j++){
        if(wire1coords[j].x == allcrossings[i].x && wire1coords[j].y == allcrossings[i].y){
          wire1length = j + 1;
        }
      }
      for(let k = 0; k < wire2coords.length; k++){
        if(wire2coords[k].x == allcrossings[i].x && wire2coords[k].y == allcrossings[i].y){
          wire2length = k;
        }
      }
  
      if((wire1length + wire2length) < shortestCombinedWire){
        shortestCombinedWire = wire1length + wire2length;
      }
      visitedCrossings.push(JSON.parse(JSON.stringify(allcrossings[i])))
    }
  }

  console.log(shortestCombinedWire);
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


// Ik heb een array met alle stappen die hij nam
// Ik heb een array met alle knopen waar hij langs kwam

// Voor elke knoop:
  // Als die knoop al aan bod is geweest, negeer 'm (een 'al gedaan' array maken?)
  // Hoeveel stappen kost het wire1 om daar te komen?
  // Hoeveel stappen kost het wire2 om daar te komen?
  // Is dat aantal stappen lager dan totdantoe laagste? 