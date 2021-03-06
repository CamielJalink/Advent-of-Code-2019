import { readFile } from "fs";
import { promisify } from "util";

// promisify the readFile node method to read our txt input files.
let readInput = promisify(readFile);

function advent(){

  return readInput("input.txt", "utf8").then((input: string) => {
    let passwordRange: string = input; //  "138307-654504"
    let stringBounds: string[] = passwordRange.split("-");

    let passwords: string[] = validRange(stringBounds);
    passwords = validIncrease(passwords);
    passwords = validSamePair(passwords);
    console.log(passwords.length);
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



function validIncrease(passwords: string[]): string[]{
  let validPasswords: string[] = [];

  for(let i = 0; i < passwords.length; i++){
    let isValid: boolean = true; 

    for(let j = 1; j < passwords[i].length; j++){
      // If current digit is smaller than previous digit, password is invalid!
      if(passwords[i][j] < passwords[i][j-1]){  
        isValid = false;
        break;
      }
    }

    if(isValid){
      validPasswords.push(passwords[i]);
    }
  }
  return validPasswords;
}



function validSamePair(passwords: string[]){
  let validPasswords: string[] = []

  for(let i = 0; i < passwords.length; i++){
    let isValid: boolean = false; 
    // If current digit is the same as previous digit, the password could be legit.
    for(let j = 1; j < passwords[i].length; j++){
      if(passwords[i][j] === passwords[i][j-1]){
        isValid = true;
      }
    }

    if(isValid){
      validPasswords.push(passwords[i]);
    }
  }

  return validPasswords;
}

advent();