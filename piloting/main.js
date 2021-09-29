import{update as updateSpaceship,draw as drawSpaceship,SPACESHIP_SPEED, getspaceshipHead,spaceshipIntersection}from'./spaceship.js'
import{update as updateAsteroid,draw as drawAsteroid}from'./asteroid.js'
import{outsideGrid}from'./grid.js'

let lastRenderTime=0;
let gameOver=false
const gameBoard=document.getElementById('game-board');

function main(currentTime){
  if(gameOver){
    if(confirm('You lost.Press ok to restart')){window.location="https://a12n4v.github.io/space_desk/piloting/index.html"}$
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender=(currentTime-lastRenderTime)/1000;
  if(secondsSinceLastRender<1/SPACESHIP_SPEED)return
  lastRenderTime=currentTime
  update()
  draw()
}

window.requestAnimationFrame(main)

function update(){
  updateSpaceship()
  updateAsteroid()
  checkDeath()
}

function draw(){
  gameBoard.innerHTML=''
  drawSpaceship(gameBoard)
  drawAsteroid(gameBoard)
}

function checkDeath(){
  gameOver=outsideGrid(getspaceshipHead())||spaceshipIntersection()
}
