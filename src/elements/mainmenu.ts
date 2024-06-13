import menuImg from '../assets/start.png';
import playBtn from '../assets/play.png';
import { canvas,ctx } from '../constants';
import { startGame, menu  } from '../main';

const mainMenuImg = new Image();
mainMenuImg.src = menuImg
const playButton = new Image();
playButton.src = playBtn;

export function mainMenu(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(mainMenuImg,0,0,canvas.width,canvas.height);
    ctx.drawImage(playButton,30,200,222,80);
  }

export function clickPLay(event:MouseEvent){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 30 && x <= 252 && y >= 200 && y <= 280 && menu) {
    startGame();
    }
}
  
export function hoverPlay(event:MouseEvent){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x >= 30 && x <= 252 && y >= 200 && y <= 280 && menu) {
        canvas.style.cursor = 'pointer';
    } else {
        canvas.style.cursor = 'default';
    }
}