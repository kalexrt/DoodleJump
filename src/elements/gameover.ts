import { canvas,ctx } from "../constants";
import { score } from "../main";
import { setHighScore, getHighScore } from "./score";
export function gameOverScreen(){
    setHighScore(score);
    let highScr = getHighScore();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#bd0924";
    ctx.font = '70px "Gloria Hallelujah", sans-serif';
    ctx.fillText('Game Over', canvas.width / 8, canvas.height / 4);
    ctx.font = '30px "Gloria Hallelujah", sans-serif';
    ctx.fillText(`Previous Highscore is ${highScr}`,canvas.width / 8, canvas.height/2 - 50)
    ctx.fillText(`Your score was ${Math.floor(score)}`, canvas.width / 5, canvas.height/2 + 50);
    ctx.fillText(`Press Space to restart`, canvas.width / 6, canvas.height *  3/4);
  }