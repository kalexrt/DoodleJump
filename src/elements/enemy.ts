import Rectangle from "../shape/Rectangle";
import Point from "../shape/Point";
import { enemyHeight, enemyWidth } from "../constants";
import { canvas,ctx } from "../constants";
import { platformArray, enemyArray } from "../main";
import { detectCollision } from "../utils/collision";
import enemySheet from '../assets/enemySheet.png'



const enemyImg = new Image();
enemyImg.src = enemySheet;


export function drawEnemy(enemy:Rectangle){
    ctx.drawImage(enemyImg, 296,1,152,90, enemy.center.x,enemy.center.y,enemyWidth,enemyHeight);
}

export function generateEnemy() {
    let position;
    let newEnemy;
    do {
        let x = Math.random() * (canvas.width - enemyWidth);
        let y = -60;
        position = new Point(x, y);
        newEnemy = new Rectangle(enemyWidth, enemyHeight, position);
    } while (isCollidingWithAnyPlatform(newEnemy));
    enemyArray.push(newEnemy);
}

function isCollidingWithAnyPlatform(rect:Rectangle) {
    for (let platform of platformArray) {
        if (detectCollision(platform,rect)) {
            return true;
        }
    }
    return false;
}

export function tryGenerateEnemy(score: number): void {
    const initialProbability = 0.00001; // Initial probability is 0.5%
    const incrementRate = 0.00001; // Adjust this value to control how fast the probability increases

    // Calculate the current probability based on the score
    let currentProbability = initialProbability + (incrementRate * score);

    currentProbability = Math.min(currentProbability, 1.0);

    const randomValue = Math.random();

    if (randomValue < currentProbability) {
        generateEnemy();
    }
}