import Rectangle from "../shape/Rectangle"
import Point from "../shape/Point"
import { platformArray } from "../main"
import { platformHeight, platformWidth, platformImage, canvas, ctx } from "../constants"
import { getRandomInt } from "../utils/common"


export function generatePlatform(){
    for(let i =0; i< 6; i++){
    let platform = new Rectangle(
      platformWidth,
      platformHeight, 
      new Point(getRandomInt(0,canvas.width * 4/5), canvas.height - 123*i))
    platformArray.push(platform)
  }}
  
export function newPlatform(){
    let platform = new Rectangle(
      platformWidth,
      platformHeight, 
      new Point(getRandomInt(0,canvas.width * 4/5), -platformHeight))
    platformArray.push(platform)
  }
  
export function drawPlatform(platform:Rectangle){
    ctx.drawImage(platformImage, platform.center.x, platform.center.y, platform.width, platform.height);
  }
