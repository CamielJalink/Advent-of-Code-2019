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
    

    if(this.y > yMin){ // visionline looking north
      this.visionLines.push([0,-1]);
    }
    // Create a tempary array for the first quarter of all visionlines, too make sorting them easier.
    let northEast: number[][] = [];
    // Check northeast for visionlines
    for(let yStep = -1; yStep > (yMin-1-this.y); yStep--){
      for(let xStep = 1; xStep < (xMax+1-this.x); xStep++){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          northEast.push(visionLine);
        }
      }
    }

    // Sort the northeast visionLines in preparation for firing the laser.
    northEast.sort((a: number[], b: number[]) => {
      // the north east attributes have a negative y that should be reversed. 
      let x1 = a[0];
      let y1 = -1 * a[1];
      let x2 = b[0];
      let y2 = -1 * b[1];

      if( (x1/y1) < (x2/y2)){
        return -1;
      } else if ((x1/y1) > (x2/y2)){
        return 1;
      } else{
        return 0;
      }
    })
    northEast.forEach((visionLine) => {
      this.visionLines.push(visionLine);
    })

    if(this.x < xMax){ // visionline looking east
      this.visionLines.push([1,0]);
    }



    // Check southeast for visionlines
    let southEast: number[][] = [];

    for(let yStep = 1; yStep < (yMax+1-this.y); yStep++){
      for(let xStep = 1; xStep < (xMax+1-this.x); xStep++){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);
        
        if(checkSimplerLines(visionLine)){
          southEast.push(visionLine);
        }
      }
    }

    southEast.sort((a: number[], b: number[]) => {
      // the south east attributes have only positive coordinates
      let x1 = a[0];
      let y1 = a[1];
      let x2 = b[0];
      let y2 = b[1];

      if( (y1/x1) < (y2/x2)){ // x and y are swapped here compared to the northeast quardrant
        return -1;
      } else if ((y1/x1) > (y2/x2)){
        return 1;
      } else{
        return 0;
      }
    })

    southEast.forEach((visionLine) => {
      this.visionLines.push(visionLine);
    })

    if(this.y < yMax){ // visionline looking south
      this.visionLines.push([0,1]);
    }



    // Check southwest for visionlines
    let southWest: number[][] = [];

    for(let yStep = 1; yStep < (yMax+1-this.y); yStep++){
      for(let xStep = -1; xStep > (xMin-1-this.x); xStep--){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          southWest.push(visionLine);
        }
      }
    }

    southWest.sort((a: number[], b: number[]) => {
      // the south west attributes have a negative x that should be reversed. 
      let x1 = -1 * a[0];
      let y1 = a[1];
      let x2 = -1 * b[0];
      let y2 = b[1];

      if( (x1/y1) < (x2/y2)){
        return -1;
      } else if ((x1/y1) > (x2/y2)){
        return 1;
      } else{
        return 0;
      }
    })

    southWest.forEach((visionLine) => {
      this.visionLines.push(visionLine);
    })

    if(this.x > xMin){ // visionline looking west
      this.visionLines.push([-1,0]);
    }



    // Check northwest for visionlines
    let northWest: number[][] = [];

    for(let yStep = -1; yStep > (yMin-1-this.y); yStep--){
      for(let xStep = -1; xStep > (xMin-1-this.x); xStep--){
        
        let visionLine: number[] = [];
        visionLine.push(xStep);
        visionLine.push(yStep);

        if(checkSimplerLines(visionLine)){
          northWest.push(visionLine);
        }
      }
    }

    northWest.sort((a: number[], b: number[]) => {
      // the north west attributes have both a negative x and y
      let x1 = -1 * a[0];
      let y1 = -1 * a[1];
      let x2 = -1 * b[0];
      let y2 = -1 * b[1];

      if( (y1/x1) < (y2/x2)){ 
        return -1;
      } else if ((y1/x1) > (y2/x2)){
        return 1;
      } else{
        return 0;
      }
    })

    northWest.forEach((visionLine) => {
      this.visionLines.push(visionLine);
    })
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



  fireOneDirection(visionLine: number[]){
    let blastedAsteroid: number[] = [];
    let xModifier: number = visionLine[0];
    let yModifier: number = visionLine[1];
    let xMin: number = 0;
    let xMax: number = this.map[0].length - 1;
    let yMin: number = 0;
    let yMax: number = this.map.length - 1;

    let x = this.x;
    let y = this.y;
    let withinMap: boolean = true;

    while (withinMap) {
      x += xModifier;
      y += yModifier;

      if (x > xMax || x < xMin || y > yMax || y < yMin) {
        withinMap = false;
      }
      else if (this.map[y][x] === '#') {
        // console.log("found asteroid on position " + x + "," + y + " using visionline " + xModifier + "," + yModifier);
        blastedAsteroid.push(x);
        blastedAsteroid.push(y);
        withinMap = false;
      }
    }
    return blastedAsteroid;
  }



  // First, get all the directions we are going to check, using a modified version of the getVisionLines method from part1
  fireLaser(totalAsteroids: number){
    this.getVisionLines();
    let destroyedAsteroids: number[][] = [];

    let stillFiring: boolean = true;
    
    while(stillFiring){
      this.visionLines.forEach((visionLine: number[]) => {
        let blastedAsteroid: number[] = this.fireOneDirection(visionLine);
        if (blastedAsteroid.length > 0) {
          destroyedAsteroids.push(blastedAsteroid);
          this.map = writeMap(this.map, blastedAsteroid);
        }
      })

      if(destroyedAsteroids.length >= totalAsteroids){
        stillFiring = false;
      }
    }

    return destroyedAsteroids;
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



function writeMap(map: string[], spot: number[]){
  let xlength = map.length
  let ylength = map[0].length
  let newMap: string[] = [];
  for (let y = 0; y < map.length; y++) {
    let newRow: string = "";
    for (let x = 0; x < map[y].length; x++) {
      if (x === spot[0] && y === spot[1]) {
        newRow += '.';
      } else{
        newRow += map[y][x];
      }
    }
    newMap.push(newRow);
  }
  return(newMap);
}