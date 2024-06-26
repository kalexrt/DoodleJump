import './style.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx, canvas, jumpvelocity, gravity, platformImage } from './constants';
import { Doodler } from './elements/Doodler';
import Point from './shape/Point';
import Rectangle from './shape/Rectangle';
import { leftImage } from './elements/Doodler';
import { detectCollision } from './utils/collision';
import platformImg from './assets/platform.png'
import { generatePlatform,newPlatform, drawPlatform } from './elements/platform';
import { gameOverScreen } from './elements/gameover';
import { drawScore } from './elements/score';
import { moveDoodler, stopDoodler } from './elements/events';
import { clickPLay, hoverPlay, mainMenu } from './elements/mainmenu';
import { drawEnemy, tryGenerateEnemy } from './elements/enemy';

export let platformArray:Rectangle[] = [];
export let enemyArray:Rectangle[]=[];
export let menu = true;
export let score = 0;
export let gameOver = true;
export const player = new Doodler(50,50,new Point(canvas.width/2 - 25, canvas.height*3/4 - 25))

const collisionSound = document.getElementById('collisionSound') as HTMLAudioElement;
const loseSound = document.getElementById('loseSound') as HTMLAudioElement;

player.image = leftImage;
player.dy = jumpvelocity;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

platformImage.src = platformImg;

//load images before calling main menu
window.onload = function() {
  mainMenu();
};

function draw() {
  if (gameOver) return gameOverScreen();
  //clear background
  ctx.clearRect(0,0,canvas.width,canvas.height);

  //move player in x and y direction according to input
  updatePlayer();

  //iterate through each platform
  platformArray.forEach(platform => {
    updatePlatform(platform);
    //detect collision only if the player is coming down i.e. dy is positive
    if (detectCollision(player, platform) && player.dy >= 0){
      collisionSound.currentTime = 0; // Rewind to the start
      collisionSound.play();
      player.dy = jumpvelocity;
    }; 
    drawPlatform(platform);
  });
  
  //iterate thorugh each enemy
  enemyArray.forEach(enemy =>{
    updateEnemy(enemy);

    if (detectCollision(player,enemy)){
      gameOver = true;
      loseSound.currentTime = 0; 
      loseSound.play();
    }

    drawEnemy(enemy);
  })

  tryGenerateEnemy(score); //enemy generation chance increases with score

  drawScore();
  requestAnimationFrame(draw);
}

export function startGame(){
  //initialize condition
  gameOver = false;
  menu = false;
  score = 0;
  enemyArray = [];
  platformArray = [];
  player.dy = jumpvelocity;
  player.center.x = canvas.width/2 - 25;
  player.center.y = canvas.height*3/4 - 25
  generatePlatform();
  draw();
}


function updatePlayer(){
  //move player
  player.center.x += player.dx;
  player.dy += gravity;
  player.center.y += player.dy;
  //warp screen code
  if(player.center.x > canvas.width){
    player.center.x = 0;
  }
  else if(player.center.x < 0){
    player.center.x = canvas.width;
  }
  //  lose condition
  if(player.center.y > canvas.height) {
    gameOver = true;
    loseSound.currentTime = 0; 
    loseSound.play();
  };
  ctx.drawImage(player.image,player.center.x ,player.center.y,player.width,player.height)
}

function updatePlatform(platform:Rectangle){
  if(player.dy < 0 && player.center.y < canvas.height * 3/5){
    platform.center.y -= jumpvelocity;
    score += Math.abs(jumpvelocity)/100;
  }
  //platform goes out of screen
  if(platform.center.y >= canvas.height){
    platformArray.shift();
    newPlatform();
  }
}

function updateEnemy(enemy:Rectangle){
  if(player.dy < 0 && player.center.y < canvas.height * 3/5){
    enemy.center.y -= jumpvelocity;
  }
  if(enemy.center.y >= canvas.height){
    enemyArray.shift();
  }
}

// events for main menu
canvas.addEventListener('click', clickPLay);
canvas.addEventListener('mousemove', hoverPlay);
//events for game playing
document.addEventListener("keydown", moveDoodler);
document.addEventListener("keyup", stopDoodler);