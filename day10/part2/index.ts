import { getInput } from "./helpers";
import { Asteroid } from "./asteroid";

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
      console.log("starting with real input");
      fireLaser(input, 23, 20) // The base is place on asteroid 23,20 wich can see 334 asteroids
    })
  })
}



function fireLaser(asteroidMap: string[], x: number, y: number){
  let station: Asteroid = new Asteroid(x, y, asteroidMap);
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
    console.log(bestAsteroid); // x3 y4 with 8 asteroids in sight
  }).then(()=>{
    return getInput("test5.txt").then((testInput: string[]) => {
      let allAsteroids: Asteroid[] = parseMap(testInput);
      let bestAsteroid = findBestLocation(allAsteroids);
      if(bestAsteroid.x !== 11 || bestAsteroid.y !== 13 || bestAsteroid.visionScore !== 210){
        console.log("Test 5 failed!");
      };
      // at 11,13 with 210 asteroids in sight
    })
  })
}

advent();