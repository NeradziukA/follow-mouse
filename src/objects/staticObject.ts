import * as PIXI from "pixi.js";
import Point from "../geom/Point";
import Vector from "../geom/Vector";

export default class StaticObject {
  obj;
  constructor(startPoint: Point) {
    const objTexture = PIXI.Texture.from("img/planet1.png");
    this.obj = PIXI.Sprite.from(objTexture);
    this.obj.anchor.set(0.5);
    this.obj.position.set(startPoint.x, startPoint.y);
    //@ts-ignore
    this.obj.hitArea = new PIXI.Circle(startPoint.x, startPoint.y, 100);
    //@ts-ignore
    this.obj.interactive = true;
  }
  getObject() {
    return this.obj;
  }
}
