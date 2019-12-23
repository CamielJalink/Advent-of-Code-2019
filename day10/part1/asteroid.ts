// The asteroid class has an x coordinate, y coordinate, 
// and a map representation of the asteroid field
export default class Asteroid{
  x: number;
  y: number;
  map: string[];
  visionLines: number[] = []; // determines all directions this asteroid can 'look' 

  constructor(x: number, y: number, map: string[]){
    this.x = x;
    this.y = y;
    this.map = map;
  }

// Determines the number of asteroids that can be seen from this asteroid
  getVisionScore(){
    let visionScore = 0;
    this.getVisionLines();
    this.visionLines.forEach((visionLine) => {
      visionScore += this.checkForAsteroids(visionLine);
    })
    return visionScore;
  }


// Determines all directions in which the asteroid can 'look' to find neighbours.
// Directions are a x,y pair. 
  getVisionLines(){
    let xMin: number = 0;
    let xMax: number = this.map[0].length -1; //The -1 here feels semantically more correct
    let yMin: number = 0;
    let yMax: number = this.map.length -1;

    let visionLines: number[][] = [];
    // sneaky +1 to ensure that the border squares are also checked
    for(let yStep = 0; yStep < (yMax+1-this.y); yStep++){
      for(let xStep = 0; xStep < (xMax+1-this.x); xStep++){

        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);
        visionLines.push(visionLine);

      }
    }
    
    console.log(visionLines);
  }



// This method checks a single line of sight for an asteroid, returning 1 if there is one.
  checkForAsteroids(visionLine: number){
    let asteroidSeen: number = 0;

    return asteroidSeen;
  }
}