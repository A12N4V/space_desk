import{onspaceship,expandspaceship}from'./spaceship.js'
import{getRandomGridPosition}from'./grid.js'

let asteroid=getRandomasteroidPosition()
const EXPANSION_RATE=1

export function update(){
  if(onspaceship(asteroid)){
    expandspaceship(EXPANSION_RATE)
    asteroid=getRandomasteroidPosition()
  }
}

export function draw(gameBoard){
  const asteroidElement=document.createElement('div')
  asteroidElement.style.gridRowStart=asteroid.y;
  asteroidElement.style.gridColumnStart=asteroid.x;
  asteroidElement.classList.add('asteroid')
  gameBoard.appendChild(asteroidElement)
}

function getRandomasteroidPosition(){
  let newasteroidPosition
  while(newasteroidPosition==null||onspaceship(newasteroidPosition)){
    newasteroidPosition=getRandomGridPosition()
  }
  return newasteroidPosition
}
