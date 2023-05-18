import * as PIXI from "pixi.js";
import Menu from "./stages/menu";
import Main from "./stages/main";

const SCREEN_WIDTH = document.body.clientWidth;
const SCREEN_HEIGHT = document.body.clientHeight;

let app = new PIXI.Application({
  antialias: true,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
});
document.body.appendChild(app.view);

const menu = new Menu(onStart);

app.stage.addChild(menu.getContainer());

function onStart() {
  const main = new Main(app, onGameOver);
  app.stage.removeChildren();
  app.stage.addChild(main.getContainer());
}

function onGameOver() {
  app.stage.removeChildren();
  app.stage.addChild(menu.getContainer());
}
