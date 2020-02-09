class Moon{
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
  moons: Moon[] = [];
  timeSteps: number = 0;

  constructor(initMoons: number[][]){
    initMoons.forEach((initMoonLoc: number[]) => {
      this.moons.push(new Moon(initMoonLoc));
    })

    console.log(this.moons);
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