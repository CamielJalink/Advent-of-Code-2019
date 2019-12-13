import { getInput, parseIntoLayers } from "./helpers";

// promisify the readFile node method to read our txt input files.

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string) => {
      let layers: string[] = parseIntoLayers(input, 25, 6);
      let shortestLayer: string = searchShortestLayer(layers);
      console.log(shortestLayer);
      console.log(calculateOutput(shortestLayer));
      return;
    })
  })
}



function searchShortestLayer(layers: string[]){

  let layerWithFewest0s: string = "";
  let least0sOnLayer: number = Number.MAX_SAFE_INTEGER;

  for(let i = 0; i < layers.length; i++){
    let numOf0s: number = 0;

    for(let j = 0; j < layers[i].length; j++){
      if(layers[i][j] === "0"){
        numOf0s++;
      }
    }
    if(numOf0s < least0sOnLayer){
      least0sOnLayer = numOf0s;
      layerWithFewest0s = layers[i];
    }
  }

  return layerWithFewest0s;
}



function calculateOutput(layer:string){
  let numOf1s: number = 0;
  let numOf2s: number = 0; 

  for(let i = 0; i < layer.length; i++){
    if(layer[i] === "1"){
      numOf1s++;
    }
    if(layer[i] === "2"){
      numOf2s++;
    }
  }
  console.log(numOf1s);
  console.log(numOf2s);
  return numOf1s * numOf2s;
}


function runTests(){
  return getInput("test.txt").then((input: string) => {
    let layers: string[] = parseIntoLayers(input, 3, 2);
    let shortestLayer: string = searchShortestLayer(layers);
    console.log(calculateOutput(shortestLayer));
    return;
  })
}

advent();