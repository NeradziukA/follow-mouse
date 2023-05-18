import * as PIXI from "pixi.js";

import Point from "../geom/Point";
import Vector from "../geom/Vector";
import Missile from "../objects/missile";
import StaticObject from "../objects/staticObject";

const SPEED = 1000 / 50;
const SPEED_FACTOR = 50;
const SCREEN_WIDTH = document.body.clientWidth;
const SCREEN_HEIGHT = document.body.clientHeight;
const SCREEN_CENTER_COORD = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
};

export default class Main {
  private timer;
  private pointerCoord: Point;
  private lastPointerCoord: Point;
  private speedVector: Vector;
  private sceneContainer: PIXI.Container;
  private onGameOver;
  private missiles?: Array<Missile> = [];
  private staticObject: StaticObject;

  constructor(app: PIXI.Application, onGameOver: Function) {
    this.sceneContainer = new PIXI.Container();
    this.onGameOver = onGameOver;
    this.pointerCoord = new Point({
      x: SCREEN_CENTER_COORD.x / SPEED_FACTOR,
      y: SCREEN_CENTER_COORD.y / SPEED_FACTOR,
    });
    this.lastPointerCoord = new Point({
      x: SCREEN_CENTER_COORD.x / SPEED_FACTOR,
      y: SCREEN_CENTER_COORD.y / SPEED_FACTOR,
    });
    this.speedVector = new Vector(
      new Point({ x: 0, y: 0 }),
      new Point({ x: 0, y: 0 })
    );

    let background = PIXI.Sprite.from("img/space.jpg");
    this.sceneContainer.addChild(background);
    background.width = SCREEN_WIDTH;
    background.height = SCREEN_WIDTH * 0.63;

    const sprite = PIXI.Sprite.from("img/spaceship.png");
    sprite.anchor.set(0.5);
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    sprite.x = SCREEN_CENTER_COORD.x;
    sprite.y = SCREEN_CENTER_COORD.y;

    this.sceneContainer.addChild(sprite);

    //@ts-ignore
    app.stage.interactive = true;
    //@ts-ignore
    app.stage.on("mousemove", (e) => this.moveSprite(e));
    //@ts-ignore
    app.stage.on("pointerdown", (e) =>
      this.fire(new Point({ x: sprite.x, y: sprite.y }), this.speedVector)
    );

    this.timer = setInterval(() => {
      let p = new Point({ x: sprite.x, y: sprite.y });
      let newSpeed = new Vector(this.lastPointerCoord, this.pointerCoord);
      this.speedVector = this.speedVector.addVector(newSpeed);
      let newPoint = this.speedVector.translatePoint(p);
      if (this.outOfBoundaries(newPoint)) {
        clearInterval(this.timer);
        return this.onGameOver();
      }
      this.checkCollides();
      requestAnimationFrame(() => {
        sprite.x = newPoint.x;
        sprite.y = newPoint.y;
        sprite.rotation = this.speedVector.toPolar().phi || 0;
      });

      this.lastPointerCoord = this.pointerCoord;
    }, SPEED);

    ///
    this.staticObject = new StaticObject(new Point({ x: 300, y: 300 }));
    this.sceneContainer.addChild(this.staticObject.getObject());
  }
  getContainer() {
    return this.sceneContainer;
  }
  fire(startPoint: Point, speedVector: Vector) {
    let missile = new Missile(startPoint, speedVector);
    this.missiles.push(missile);
    this.sceneContainer.addChild(missile.getObject());
  }
  checkCollides() {
    let planet = this.staticObject.getObject();
    this.missiles = this.missiles.filter((m) => {
      let missile = m.getObject();
      //@ts-ignore
      if (planet.hitArea.contains(missile.x, missile.y)) {
        this.sceneContainer.removeChild(missile);
        return false;
      }
      return true;
    });
  }
  moveSprite(e: any) {
    let pos = e.data.global;
    this.pointerCoord = new Point({
      x: pos.x / SPEED_FACTOR,
      y: pos.y / SPEED_FACTOR,
    });
  }
  outOfBoundaries(newPoint: Point) {
    if (
      newPoint.x > SCREEN_WIDTH ||
      newPoint.x < 0 ||
      newPoint.y > SCREEN_HEIGHT ||
      newPoint.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
