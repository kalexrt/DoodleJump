import './style.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { Doodler } from './elements/Doodler';
import Point from './shape/Point';
import Rectangle from './shape/Rectangle';
import { leftImage,rightImage } from './elements/Doodler';
import { detectCollision } from './utils/collision';

import platformImg from './assets/platform.png'
import { getRandomInt } from './utils/common';

const jumpvelocity = -12; 
const gravity = 0.4

let score = 0;
let gameOver = false;

function drawScore(){
  ctx.fillStyle ="black";
  ctx.font = '30px Gloria Hallelujah';
  ctx.fillText(`${Math.floor(score)}`, 5,30);
}

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player = new Doodler(50,50,new Point(canvas.width/2 - 25, canvas.height*3/4 - 25))
player.image = leftImage;
player.dy = jumpvelocity;

//platform
let platformArray:Rectangle[] = [];
const platformWidth = 60;
const platformHeight = 18;
const platformImage = new Image();
platformImage.src = platformImg;




function generatePlatform(){
  for(let i =0; i< 7; i++){
  let platform = new Rectangle(
    platformWidth,
    platformHeight, 
    new Point(getRandomInt(0,canvas.width * 4/5), canvas.height - 120*i - 100))

  platformArray.push(platform)
}}



function newPlatform(){
  let platform = new Rectangle(
    platformWidth,
    platformHeight, 
    new Point(getRandomInt(0,canvas.width * 4/5), -platformHeight))
  platformArray.push(platform)
}



function drawPlatform(platform:Rectangle){
  ctx.drawImage(platformImage, platform.center.x, platform.center.y, platform.width, platform.height);
}



function updatePlayer(){
  player.center.x += player.dx;

  player.dy += gravity;
  player.center.y += player.dy;


  if(player.center.x > canvas.width){
    player.center.x = 0;
  }
  else if(player.center.x < 0){
    player.center.x = canvas.width;
  }
  if(player.center.y > canvas.height) {
    gameOver = true;
  };
  ctx.drawImage(player.image,player.center.x ,player.center.y,player.width,player.height)
}

function gameOverScreen(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#bd0924";
  ctx.font = '70px "Gloria Hallelujah", sans-serif';
  ctx.fillText('Game Over', canvas.width / 8, canvas.height / 4);
  ctx.font = '30px "Gloria Hallelujah", sans-serif';
  ctx.fillText(`Previous Highscore is `,canvas.width / 8 - 30, canvas.height/2 - 50)
  ctx.fillText(`Your score was ${Math.floor(score)}`, canvas.width / 5, canvas.height/2 + 50);
  ctx.fillText(`Press Space to restart`, canvas.width / 6, canvas.height *  3/4);
}


function draw() {
  if(gameOver) {
    gameOverScreen();
    return;
  };

  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  updatePlayer();

  platformArray.forEach(platform => {
    if(player.dy < 0 && player.center.y < canvas.height * 3/5){
      platform.center.y -= jumpvelocity
      score += Math.abs(jumpvelocity)/100;
    }
    if(platform.center.y >= canvas.height){
      platformArray.shift();
      newPlatform();
    }
    if(detectCollision(player,platform) && player.dy >= 0 ){
      player.dy = jumpvelocity;
    }
    drawPlatform(platform);
  });
  drawScore();
  requestAnimationFrame(draw);
}

function startGame(){
  gameOver = false;
  score = 0;
  platformArray = [];
  player.dy = jumpvelocity;
  player.center.x = canvas.width/2 - 25;
  player.center.y = canvas.height*3/4 - 25
  generatePlatform();
  draw();
}

startGame();

document.addEventListener("keydown", moveDoodler);
document.addEventListener("keyup", stopDoodler);

function moveDoodler(e: KeyboardEvent) {
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    player.dx = 4;
    player.image = rightImage;
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
    player.dx = -4;
    player.image = leftImage;
  } else if(e.code === 'Space' && gameOver){
    startGame();
  }
}

function stopDoodler(e: KeyboardEvent) {
  if (e.code === "ArrowRight" || e.code === "KeyD" || e.code === "ArrowLeft" || e.code === "KeyA") {
    player.dx = 0;
  }
}