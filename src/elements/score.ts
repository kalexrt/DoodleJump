import { ctx } from "../constants";
import { score } from "../main";

export function drawScore(){
  ctx.fillStyle ="black";
  ctx.font = '30px Gloria Hallelujah';
  ctx.fillText(`${Math.floor(score)}`, 5,30);
}