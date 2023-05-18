import { ICartesianCoordinates, IPolarCoordinates } from "./Coordinates";

export default class Point {
  x: number;
  y: number;

  constructor(point: IPolarCoordinates);
  constructor(point: ICartesianCoordinates);
  constructor(point: any) {
    if (typeof point.x === "number" && typeof point.y === "number") {
      this.x = point.x;
      this.y = point.y;
    }
    if (typeof point.ro === "number" && typeof point.a === "number") {
      this.x = point.ro * Math.cos((point.a * Math.PI) / 180);
      this.y = point.ro * Math.sin((point.a * Math.PI) / 180);
    }
    if (typeof this.x !== "number" || typeof this.y !== "number")
      throw new TypeError();
  }

  toCartesian() {
    return { x: this.x, y: this.y };
  }
  toPolar() {
    let tgA = this.y / this.x;
    return {
      ro: Math.sqrt(this.x * this.x + this.y * this.y),
      a: (Math.atan(tgA) * 180) / Math.PI,
    };
  }
}
