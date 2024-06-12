import Point from "../shape/Point";
import Rectangle from "../shape/Rectangle";
import leftImg from "../assets/doodler-left.png";
import rightImg from "../assets/doodler-right.png";


export const leftImage = new Image();
leftImage.src = leftImg;
export const rightImage =  new Image();
rightImage.src = rightImg;

export class Doodler extends Rectangle {
    dx: number;
    dy: number;
    image: HTMLImageElement;

    constructor(width: number, height: number, center: Point) {
        super(width, height, center);
        this.dx = 0;
        this.dy = 0;
        this.image = rightImage;
    }
}

