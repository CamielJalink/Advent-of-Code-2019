import { readFile } from "fs";
import { promisify } from "util";

let readInput = promisify(readFile);

export function getInput(fileName: string){
  return readInput(fileName, "utf8").then((input: string) => {
    return input;
  })
}



// This array determines the size of a layer, and puts the data of each layer together.
export function parseIntoLayers(input: string, layerWidth: number, layerHight: number){
  let layerSize: number = layerWidth * layerHight;
  let layersArray: string[] = [];
  let nextLayer: string = "";

  for(let i = 0; i < input.length; i++){
    nextLayer += input[i];

    if(nextLayer.length === layerSize){
      layersArray.push(nextLayer);
      nextLayer = "";
    }
  }
  return layersArray;
}