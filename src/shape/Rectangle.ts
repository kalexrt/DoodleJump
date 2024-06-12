import Point from "./Point";

export default class Rectangle{
    height: number;
    width: number;
    center: Point;

    constructor( width: number, height: number, center: Point){
        this.height = height;
        this.width = width;
        this.center = center;
    }
};