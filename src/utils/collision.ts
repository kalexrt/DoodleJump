import { Doodler } from "../elements/Doodler";
import Rectangle from "../shape/Rectangle";

export function detectCollision(a:Doodler|Rectangle, b:Rectangle) {
    return a.center.x < b.center.x + b.width &&   
           a.center.x + a.width > b.center.x &&   
           a.center.y < b.center.y + b.height &&  
           a.center.y + a.height > b.center.y;    
}