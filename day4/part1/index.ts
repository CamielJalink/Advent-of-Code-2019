import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);

function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let passwordRange: string = input; //  "138307-654504"
    let stringBounds: string[] = passwordRange.split("-");

    let passwords = validRange(stringBounds);
    
  })
}


function validRange(stringBounds: string[]){
  let lowerBound = parseInt(stringBounds[0]);
  let upperBound = parseInt(stringBounds[1]);
  let allPasswords: string[] = [];

  for(lowerBound; lowerBound <= upperBound; lowerBound++){
    allPasswords.push(lowerBound.toString());
  }
  return allPasswords;
}


function onlyIncrease(passwords: string[]){
  let validPasswords: string[] = [];

  for(let i = 0; i < passwords.length; i++){
    let isValid: boolean = true; 

    for(let j = 1; j < passwords[i].length; j++){

      if(parseInt(passwords[i][j]) < parseInt(passwords[i][j-1])){  // If current digit is smaller than previous digit, invalid!
        isValid = false;
      }
    }

    if(isValid){
      validPasswords.push(passwords[i]);
    }

  return validPasswords;
  }
}

advent();