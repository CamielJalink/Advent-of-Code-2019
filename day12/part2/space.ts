class Moon{
  location: number[];
  velocity: number[] = [0,0,0];

  constructor(initLocation: number[]){
    this.location = initLocation;
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
    let prevState: Moon[] = JSON.parse(JSON.stringify(this.moons));

    for(let i = 0; i < this.moons.length; i++){
      let velChange: number[] = [0,0,0];

      for(let j = 0; j < prevState.length; j++){
        // Don't compare a moon with the copy of itself
        if(i !== j){ 
          for(let k = 0; k < velChange.length; k++){
            if (this.moons[i].location[k] < prevState[j].location[k]) {
              velChange[k] = velChange[k] + 1;
            } else if (this.moons[i].location[k] > prevState[j].location[k]) {
              velChange[k] = velChange[k] - 1;
            }
          }
        }
      }

      for(let l = 0; l < velChange.length; l++){
        this.moons[i].velocity[l] = this.moons[i].velocity[l] + velChange[l];
        this.moons[i].location[l] = this.moons[i].location[l] + this.moons[i].velocity[l];
      }
    }
  }



  calculateTotalEnergy(){
    let totalEnergy: number = 0;

    this.moons.forEach((moon: Moon) => {

      let moonPotential: number = 0;
      moon.location.forEach((potential: number) => {
        moonPotential += Math.abs(potential);
      })

      let moonVelocity: number = 0;
      moon.velocity.forEach((kinetic) => {
        moonVelocity += Math.abs(kinetic);
      })

      totalEnergy += (moonPotential * moonVelocity);
    })

    return totalEnergy;
  }
}