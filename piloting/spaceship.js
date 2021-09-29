import{getInputDirection}from"./input.js"
export const SPACESHIP_SPEED=8

const spaceshipBody=[{x:11,y:11}]
let newSegments=0

export function update(){
  addSegments()
  const inputDirection=getInputDirection()
  for(let i=spaceshipBody.length-2;i>=0;i--){
    spaceshipBody[i+1]={...spaceshipBody[i]}
  }
  spaceshipBody[0].x+=inputDirection.x
  spaceshipBody[0].y+=inputDirection.y
}

export function draw(gameBoard){
  spaceshipBody.forEach(segment=>{
    const spaceshipElement=document.createElement('div')
    spaceshipElement.style.gridRowStart=segment.y;
    spaceshipElement.style.gridColumnStart=segment.x;
    spaceshipElement.classList.add('spaceship')
    gameBoard.appendChild(spaceshipElement)
  })
}

export function expandspaceship(amount){
  newSegments+=amount
}

export function onspaceship(position,{ignoreHead=false}={}){
  return spaceshipBody.some((segment,index)=>{
    if(ignoreHead&&index===0) return false
    return equalPositions(segment,position)
  })
}

export function getspaceshipHead(){
  return spaceshipBody[0]
}

export function spaceshipIntersection(){
  return onspaceship(spaceshipBody[0],{ignoreHead:true})
}

function equalPositions(pos1,pos2){
  return pos1.x===pos2.x&&pos1.y===pos2.y
}

function addSegments(){
  for(let i=0;i<newSegments;i++){
    spaceshipBody.push({...spaceshipBody[spaceshipBody.length-1]})
  }
  newSegments=0
}
