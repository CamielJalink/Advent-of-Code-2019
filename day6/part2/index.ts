import { getInput, Node } from "./helpers";

function advent(){
  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
      console.log(findSanta(input));
    })
  })
}



function findSanta(orbits: string[]){
  let nodeArray: Node[] = [];
  let rootNode = new Node("_)COM");
  let youNode: Node; 
  nodeArray.push(rootNode);

  orbits.forEach((orbit: string) => {  
    let newNode = new Node(orbit);
  
    nodeArray.forEach((existingNode: Node) => {

      if(newNode.name === existingNode.parentName){
        newNode.children.push(existingNode);
        existingNode.parent = newNode;
      } 
      else if(existingNode.name === newNode.parentName){
        existingNode.children.push(newNode);
        newNode.parent = existingNode;
      }
    })

    if(newNode.name === "YOU"){
      youNode = newNode; 
    }
    nodeArray.push(newNode);
  })

  return youNode!.parent.checkParentsForSanta(0);
}



function runTests(){
  return getInput("test.txt").then((input: string[]) => {
    let testResult = findSanta(input);
    if(testResult !== 4){
      console.log("Testinput failed! Test gave back " + testResult + " instead of 4");
    }
    return;
  })
}

advent();