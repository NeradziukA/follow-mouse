import Point from "./Point";
import Vector from "./Vector";

describe("Point object", () => {
  it("Create from Cartesian coordinates { x: 0, y: 0 }", () => {
    let p = new Point({ x: 0, y: 0 });
    expect(p.toCartesian()).toEqual({ x: 0, y: 0 });
  });
  it("Create from Cartesian coordinates { x: 10, y: -10 }", () => {
    let p = new Point({ x: 10, y: -10 });
    expect(p.toCartesian()).toEqual({ x: 10, y: -10 });
  });
  it("Create from Polar coordinates { ro: 10, a: 0 }", () => {
    let p = new Point({ ro: 10, a: 0 });
    expect(p.toCartesian()).toEqual({ x: 10, y: 0 });
  });
  it("Create from Polar coordinates { ro: 10, a: -30 }", () => {
    let p = new Point({ ro: 10, a: -30 });
    let { ro, a } = p.toPolar();
    expect({ ro: ro, a: Math.round(a) }).toEqual({ ro: 10, a: -30 });
  });
  it("Create from Polar coordinates { ro: 10, a: 30 }", () => {
    let p = new Point({ ro: 10, a: 30 });
    let { ro, a } = p.toPolar();
    expect({ ro: ro, a: Math.round(a) }).toEqual({ ro: 10, a: 30 });
  });
  it("Generate an exception if no parameters are provided", () => {
    expect(() => {
      new Point(null);
    }).toThrow();
  });
});

describe("Vector object", () => {
  it("Create from Cartesian coordinates", () => {
    let p1 = new Point({ x: 0, y: 0 });
    let p2 = new Point({ x: 1, y: 2 });
    expect(new Vector(p1, p2).toBasis()).toEqual({ x: 1, y: 2 });
  });
  it("Add vector", () => {
    let p1_1 = new Point({ x: 5, y: 5 });
    let p2_1 = new Point({ x: 5, y: 5 });
    let p1_2 = new Point({ x: 10, y: 10 });
    let p2_2 = new Point({ x: 5, y: 5 });
    expect(
      new Vector(p1_1, p2_1).addVector(new Vector(p1_2, p2_2)).toBasis()
    ).toEqual({ x: 0, y: 0 });
  });
});
