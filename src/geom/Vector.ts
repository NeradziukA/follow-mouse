import Point from "./Point";

export interface IVector {
  toCartesian: () => { p1: Point; p2: Point };
}

export default class Vector implements IVector {
  p1: Point;
  p2: Point;
  r: number;
  a: number;

  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
  toPolar() {
    const r = Math.sqrt(
      (this.p2.x - this.p1.x) * (this.p2.x - this.p1.x) +
        (this.p2.y - this.p1.y) * (this.p2.y - this.p1.y)
    );
    const cosA =
      (this.p2.x - this.p1.x) /
      Math.sqrt(
        (this.p2.x - this.p1.x) * (this.p2.x - this.p1.x) +
          (this.p2.y - this.p1.y) * (this.p2.y - this.p1.y)
      );
    const phi =
      this.p1.y - this.p2.y > 0
        ? Math.PI + (Math.PI - Math.acos(cosA))
        : Math.acos(cosA);
    return { phi, r };
  }
  toCartesian() {
    return { p1: this.p1, p2: this.p2 };
  }
  toBasis() {
    return {
      x: this.p2.x - this.p1.x,
      y: this.p2.y - this.p1.y,
    };
  }
  translatePoint(p: Point) {
    let { x, y } = this.toBasis();
    return new Point({
      x: p.x + x,
      y: p.y + y,
    });
  }
  addVector(v: Vector) {
    let { p1: p1_1, p2: p2_1 } = this.toCartesian();
    let { p1: p1_2, p2: p2_2 } = v.toCartesian();
    return new Vector(
      new Point({ x: p1_1.x + p1_2.x, y: p1_1.y + p1_2.y }),
      new Point({ x: p2_1.x + p2_2.x, y: p2_1.y + p2_2.y })
    );
  }
}
