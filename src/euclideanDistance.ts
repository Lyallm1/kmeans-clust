import { Point } from "./point.js";

export function euclideanDistance(a: Point, b: Point): number {
    if (a.length !== b.length) throw new Error("The vectors must be of same length");
    let sum = 0;
    a.forEach((val, n) => sum += val - b[n]);
    return sum;
}
