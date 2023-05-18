import * as PIXI from "pixi.js";

const SCREEN_WIDTH = document.body.clientWidth;
const SCREEN_HEIGHT = document.body.clientHeight;
const SCREEN_CENTER_COORD = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
};

export default class Menu {
  container: PIXI.Container;
  constructor(onStart: Function) {
    const startButtonTexture = PIXI.Texture.from("img/start.png");
    const startButton = PIXI.Sprite.from(startButtonTexture);
    startButton.anchor.set(0.5);
    startButton.scale.x = 0.2;
    startButton.scale.y = 0.2;
    startButton.x = SCREEN_CENTER_COORD.x;
    startButton.y = SCREEN_CENTER_COORD.y;
    //@ts-ignore
    startButton.buttonMode = true;
    //@ts-ignore
    startButton.interactive = true;
    //@ts-ignore
    startButton.on("mouseup", onStart);
    let menuContainer = new PIXI.Container();
    menuContainer.addChild(startButton);
    this.container = menuContainer;
  }
  getContainer() {
    return this.container;
  }
}
