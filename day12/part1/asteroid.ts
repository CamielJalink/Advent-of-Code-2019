export class Asteroid {
  location: number[];
  velocity: number[] = [0,0,0];

  constructor(initLocation: number[]){
    this.location = initLocation;
  }

  updateLocation(newLocation: number[]){
    this.location = newLocation;
  }

  updateVelocity(changeInVelocity: number[]){
    // Not sure about this one yet;
  }

}



export class JupiterSpace {
  asteroids: Asteroid[] = [];
  timeSteps: number = 0;

  constructor(initAsteroids: number[][]){
    initAsteroids.forEach((initAstLoc: number[]) => {
      this.asteroids.push(new Asteroid(initAstLoc));
    })
  }

  StepInTime(){
    // bereken velocities voor asteroids

    // bereken daarmee locations van asteroids

    // update de asteroids zelf

    // update jouw timeSteps
  }

  calculateTotalEnergy(){
    // bereken totale energie in het systeem
  }
}