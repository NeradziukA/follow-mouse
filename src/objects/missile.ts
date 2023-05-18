import * as PIXI from "pixi.js";
import Point from "../geom/Point";
import Vector from "../geom/Vector";

const SPEED = 1000 / 50;
const MISSILE_SPEED = 3;

export default class Missile {
  timer;
  missile;
  ownSpeed: Vector;

  constructor(startPoint: Point, speedVector: Vector) {
    const missileTexture = PIXI.Texture.from("img/missile.png");
    this.missile = PIXI.Sprite.from(missileTexture);
    this.missile.anchor.set(0.5);
    this.missile.scale.x = 0.02;
    this.missile.scale.y = 0.02;
    this.missile.x = startPoint.x;
    this.missile.y = startPoint.y;

    let speed = speedVector.toPolar();
    speed.r = speed.r + MISSILE_SPEED;
    this.missile.rotation = speed.phi || 0;

    this.ownSpeed = new Vector(
      new Point({ x: 0, y: 0 }),
      new Point({
        x: speed.r * Math.cos(speed.phi),
        y: speed.r * Math.sin(speed.phi),
      })
    );
    this.timer = setInterval(() => {
      let newPoint = this.ownSpeed.translatePoint(
        new Point({ x: this.missile.x, y: this.missile.y })
      );
      requestAnimationFrame(() => {
        this.missile.x = newPoint.x;
        this.missile.y = newPoint.y;
      });
    }, SPEED);
  }
  getObject() {
    return this.missile;
  }
}
