// The asteroid class has an x coordinate, y coordinate, 
// and a map representation of the asteroid field
export class Asteroid{
  x: number;
  y: number;
  map: string[];
  visionLines: number[][] = []; // determines all directions this asteroid can 'look'
  visionScore: number = 0; 

  constructor(x: number, y: number, map: string[]){
    this.x = x;
    this.y = y;
    this.map = map;
  }

// Determines the number of asteroids that can be seen from this asteroid
  getVisionScore(){
    this.getVisionLines();
    this.visionLines.forEach((visionLine) => {
      this.visionScore += this.checkForAsteroids(visionLine);
    })
    return this.visionScore;
  }


// Determines all directions in which the asteroid can 'look' to find neighbours.
// Directions are a x,y pair.
  getVisionLines(){
    let xMin: number = 0;
    let xMax: number = this.map[0].length -1;
    let yMin: number = 0;
    let yMax: number = this.map.length -1;
    
    // First, check the four axis vision lines (1,0  0,1  -1,0 and 0,-1)
    if(this.x < xMax){
      this.visionLines.push([1,0]);
    }
    if(this.x > xMin){
      this.visionLines.push([-1,0]);
    }
    if(this.y < yMax){
      this.visionLines.push([0,1]);
    }
    if(this.y > yMin){
      this.visionLines.push([0,-1]);
    }


    // These first two forloops check for all vision lines going to the east and south.
    for(let yStep = 1; yStep < (yMax+1-this.y); yStep++){
      for(let xStep = 1; xStep < (xMax+1-this.x); xStep++){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);
        
        if(checkSimplerLines(visionLine)){
          this.visionLines.push(visionLine);
        }
      }
    }

    // Same principle for vision lines going west and south
    for(let yStep = 1; yStep < (yMax+1-this.y); yStep++){
      for(let xStep = -1; xStep > (xMin-1-this.x); xStep--){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          this.visionLines.push(visionLine);
        }
      }
    }

    // And for east and north
    for(let yStep = -1; yStep > (yMin-1-this.y); yStep--){
      for(let xStep = 1; xStep < (xMax+1-this.x); xStep++){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          this.visionLines.push(visionLine);
        }
      }
    }

    // And finally for north and west
    for(let yStep = -1; yStep > (yMin-1-this.y); yStep--){
      for(let xStep = -1; xStep > (xMin-1-this.x); xStep--){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          this.visionLines.push(visionLine);
        }
      }
    }
  }



// This method checks a single line of sight for an asteroid, returning 1 if there is one.
  checkForAsteroids(visionLine: number[]){
    let asteroidSeen: number = 0;

    let xModifier: number = visionLine[0];
    let yModifier: number = visionLine[1];
    let xMin: number = 0;
    let xMax: number = this.map[0].length -1;
    let yMin: number = 0;
    let yMax: number = this.map.length -1;

    let x = this.x;
    let y = this.y;
    let withinMap: boolean = true;
    
    while(withinMap){
      x += xModifier;
      y += yModifier;

      if(x > xMax || x < xMin || y > yMax || y < yMin){
        withinMap = false;
      }
      else if(this.map[y][x] === '#'){
        // console.log("found asteroid on position " + x + "," + y + " using visionline " + xModifier + "," + yModifier);
        asteroidSeen = 1;
        withinMap = false;
      }
    }

    return asteroidSeen;
  }
}



// If the x and y of this vision line are both divisable by the same non-0 or non-1 integer, 
// there already exists a simpler description of this visionLine   (for example: 1,2 is a simpler version of 2,4);
export function checkSimplerLines(visionLine: number[]){
  let isNewLine: boolean = true;
  let x = Math.abs(visionLine[0]);
  let y = Math.abs(visionLine[1]);

  // If x or y is 0, than the other coordinate must be 1 or else there exists a simpler line
  // for example: 2,0 is a duplicate of the simpler 1,0
  if((x === 0 && y > 1) || (y === 0 && x > 1)){
    isNewLine = false;
  }

  let lowestXorY: number = Math.min(x, y);
  // If the lowest value for x or y, is a 0 or 1, the x and y won't be divisable by a higher integer.
  if(lowestXorY > 1){
    for(let i = 2; i <= lowestXorY; i++){
      if(x % i === 0 && y % i === 0){
        isNewLine = false;
      }
    }
  }
  return isNewLine;
}