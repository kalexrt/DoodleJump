import './style.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { Doodler } from './elements/Doodler';
import Point from './shape/Point';
import Rectangle from './shape/Rectangle';
import { leftImage,rightImage } from './elements/Doodler';
import { detectCollision } from './utils/collision';

import platformImg from './assets/platform.png'
import { getRandomInt } from './utils/common';

const jumpvelocity = -13; 
const gravity = 0.4

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player = new Doodler(50,50,new Point(canvas.width/2 - 25, canvas.height*3/4 - 25))
player.image = leftImage;

//platform
const platformArray:Rectangle[] = [];
const platformWidth = 60;
const platformHeight = 18;
const platformImage = new Image();
platformImage.src = platformImg;
player.dy = jumpvelocity;

let platform1 = new Rectangle(platformWidth, platformHeight, new Point(canvas.width/2,canvas.height-150));
platformArray.push(platform1);
for(let i =0; i< 6; i++){
  let platform = new Rectangle(
    platformWidth,
    platformHeight, 
    new Point(getRandomInt(0,canvas.width * 4/5), canvas.height - 75*i - 300))

  platformArray.push(platform)
}

function newPlatform(){
  let platform = new Rectangle(
    platformWidth,
    platformHeight, 
    new Point(getRandomInt(0,canvas.width * 4/5), -platformHeight))
  platformArray.push(platform)
}



function drawPlatform(platform:Rectangle){
  ctx.drawImage(platformImage, platform.center.x, platform.center.y, platform.width, platform.height);
  ctx.strokeStyle = 'red';  // Set the border color
  ctx.lineWidth = 2;  // Set the border width
  ctx.strokeRect(platform.center.x, platform.center.y, platform.width, platform.height);
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

  ctx.drawImage(player.image,player.center.x ,player.center.y,player.width,player.height)

  ctx.strokeStyle = 'blue';  // Set the border color
  ctx.lineWidth = 2;  // Set the border width
  ctx.strokeRect(player.center.x, player.center.y, player.width, player.height);
}

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  updatePlayer();
  
  platformArray.forEach(platform => {
    if(detectCollision(player,platform) && player.dy >= 0 ){
      player.dy = jumpvelocity;
    }
    drawPlatform(platform);
  });

  requestAnimationFrame(draw);
}

draw();


document.addEventListener("keydown", moveDoodler);
document.addEventListener("keyup", stopDoodler);

function moveDoodler(e: KeyboardEvent) {
  if (e.code === "ArrowRight" || e.code === "KeyD") {
    player.dx = 4;
    player.image = rightImage;
  } else if (e.code === "ArrowLeft" || e.code === "KeyA") {
    player.dx = -4;
    player.image = leftImage;
  }
}

function stopDoodler(e: KeyboardEvent) {
  if (e.code === "ArrowRight" || e.code === "KeyD" || e.code === "ArrowLeft" || e.code === "KeyA") {
    player.dx = 0;
  }
}