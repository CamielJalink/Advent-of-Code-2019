import { getInput, parseIntoLayers } from "./helpers";

// promisify the readFile node method to read our txt input files.

function advent(){

  return runTests().then(() => {
    return getInput("input.txt").then((input: string) => {
      let layerwidth = 25;
      let layers: string[] = parseIntoLayers(input, layerwidth, 6);
      let image = createImageFromLayers(layers);
      displayImage(image, layerwidth);
      return;
    })
  })
}



function createImageFromLayers(layers: string[]){

  let image: string = "";
  let layerLength: number = layers[0].length; 

  for(let i = 0; i < layerLength; i++){
    let pixel: string = "2";
    for(let j = 0; j < layers.length; j++){
      if(layers[j][i] === '0'){
        pixel = ' ';
        break;
      }else if(layers[j][i] === '1'){
        pixel = '1';
        break;
      }
    }
    image += pixel;
  }

  return image; 
}



function displayImage(image: string, horizontalSize: number){
  let row: string = "";

  for(let i = 0; i < image.length; i++){

    row += image[i];

    if((i+1) % horizontalSize === 0 && row.length > 0){
      console.log(row);
      row = "";
    }
  }
}



function runTests(){
  return getInput("test.txt").then((input: string) => {
    let layers: string[] = parseIntoLayers(input, 2, 2);
    let image = createImageFromLayers(layers);
    displayImage(image, 2);
    console.log(" ");
    return;
  })
}

advent();