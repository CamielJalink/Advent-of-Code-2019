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

  constructor(initMoons: number[][]){
    initMoons.forEach((initMoonLoc: number[]) => {
      this.moons.push(new Moon(initMoonLoc));
    })
  }



  StepInTime(){

    this.moons.forEach((moon: Moon) => {
      let velChange: number[] = [0,0,0];

      this.moons.forEach((otherMoon: Moon) => {
        if(moon !== otherMoon){
          for(let i = 0; i < velChange.length; i++){
            if (moon.location[i] < otherMoon.location[i]) {
              velChange[i] = velChange[i] + 1;
            } else if (moon.location[i] > otherMoon.location[i]) {
              velChange[i] = velChange[i] - 1;
            }
          }
        }
      })

      for(let i = 0; i < velChange.length; i++){
        moon.velocity[i] = moon.velocity[i] + velChange[i];
        moon.location[i] = moon.location[i] + moon.velocity[i];
      }
    })

    console.log("One step done")
    console.log(this.moons);
  }


  calculateTotalEnergy(){
    // bereken totale energie in het systeem
  }
}