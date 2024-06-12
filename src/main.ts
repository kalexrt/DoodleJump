import './style.css'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from './constants';
import { Doodler } from './elements/Doodler';
import Point from './shape/Point';
import { leftImage,rightImage } from './elements/Doodler';

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const player = new Doodler(50,50,new Point(canvas.width/2 - 25, canvas.height*7/8 - 25))
player.image = rightImage;

function draw() {
  ctx.drawImage(player.image,player.center.x - 25,player.center.y -25)

  requestAnimationFrame(draw);
}

draw();
