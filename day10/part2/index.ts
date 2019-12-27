import { getInput } from "./helpers";
import { Asteroid } from "./asteroid";

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
      console.log("starting with day 9 part 2 input");
      let destroyedAsteroids: number[][] = fireLaser(input, 23, 20) // The base is placed on asteroid 23,20 which can see 334 asteroids
      console.log("Destroyed asteroid #200 is " + destroyedAsteroids[199]);
    })
  })
}



function fireLaser(asteroidMap: string[], x: number, y: number){
  
  // Determine the amount of asteroids to be destroyed, so that the station knows when to stop firing
  let totalAsteroids: number = 0; 
  for(let i = 0; i < asteroidMap.length; i++){
    for(let j = 0; j < asteroidMap[i].length; j++){
      if(asteroidMap[i][j] === '#'){
        totalAsteroids++;
      }
    }
  }
  // Of course, the station itself is also on an asteroid:
  totalAsteroids -= 1;

  let station: Asteroid = new Asteroid(x, y, asteroidMap);
  let destroyedAsteroids: number[][] = station.fireLaser(totalAsteroids);
  return destroyedAsteroids;
}



// This function checks the asteroid map and returns all Asteroids, with a x and y coordinate
function parseMap(stringMap: string[]){
  let allAsteroids: Asteroid[] = [];
  
  for(let y = 0; y < stringMap.length; y++){
    for(let x = 0; x < stringMap[y].length; x++){
      if(stringMap[y][x] === "#"){
        let asteroid = new Asteroid(x, y, JSON.parse(JSON.stringify(stringMap)));
        allAsteroids.push(asteroid);
      }
    }
  }

  return allAsteroids;
}


// Asks each asteroid to determine how many other asteroids it can see,
// and returns the best one.
function findBestLocation(allAsteroids: Asteroid[]){
  let bestVisionScore: number = 0;
  let bestAsteroid: Asteroid = allAsteroids[0];

  allAsteroids.forEach((asteroid: Asteroid) => {
    let visionScore = asteroid.getVisionScore();
    if(visionScore > bestVisionScore){
      bestVisionScore = visionScore;
      bestAsteroid = asteroid;
    }
  })

  return bestAsteroid;
}



function runTests(){
  return getInput("test1.txt").then((testInput: string[]) => {
    let allAsteroids: Asteroid[] = parseMap(testInput);
    let bestAsteroid = findBestLocation(allAsteroids);
    if(bestAsteroid.x !== 3 || bestAsteroid.y !== 4 || bestAsteroid.visionScore !== 8){
      console.log("Test 1 failed!");
    };
  }).then(()=>{
    return getInput("test5.txt").then((testInput: string[]) => {
      let allAsteroids: Asteroid[] = parseMap(testInput);
      let bestAsteroid = findBestLocation(allAsteroids);
      if(bestAsteroid.x !== 11 || bestAsteroid.y !== 13 || bestAsteroid.visionScore !== 210){
        console.log("Test 5 failed!");
      };
    })
  })

  .then(() => {
    console.log("Done with the part 1 tests");
    return getInput("test1.txt").then((testInput: string[]) => {
      // The base is placed on asteroid 3,4
      let destroyedAsteroids: number[][] = fireLaser(testInput, 3,4);
      console.log("Destroyed " + destroyedAsteroids.length + " asteroids");
      console.log(destroyedAsteroids);
    })
  })

  .then(() => {
    return getInput("test5.txt").then((testInput: string[]) => {
      // The base is placed on asteroid 11,23
      let destroyedAsteroids: number[][] = fireLaser(testInput, 11, 13);
      console.log("Destroyed " + destroyedAsteroids.length + " asteroids");
      console.log(destroyedAsteroids[0]);
      console.log(destroyedAsteroids[1]);
      console.log(destroyedAsteroids[2]);
      console.log(destroyedAsteroids[9]);
      console.log(destroyedAsteroids[19]);
      console.log(destroyedAsteroids[49]);
      console.log(destroyedAsteroids[99]);
      console.log(destroyedAsteroids[198]);
      console.log(destroyedAsteroids[199]);
      console.log(destroyedAsteroids[200]);
      console.log(destroyedAsteroids[298]);
    })
  })
}

advent();