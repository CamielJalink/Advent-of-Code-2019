import { getInput, Node } from "./helpers";



function advent(){
  return runTests().then(() => {
    return getInput("input.txt").then((input: string[]) => {
      console.log(findAllOrbits(input));
    })
  })
}



function findAllOrbits(orbits: string[]){
  let nodeArray: Node[] = [];
  let rootNode = new Node("_)COM");
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

    nodeArray.push(newNode);
  })

  return rootNode.countOrbits(0);
}



function runTests(){
  return getInput("test.txt").then((input: string[]) => {
    console.log(findAllOrbits(input));
    return;
  })
}

advent();