import { DistanceFunction, InitFunction } from "../types.js";

import { Point } from "../point.js";
import { weightedPick } from "./weightedPick.js";

export const kmeansPlusPlusInit: InitFunction = (points: Point[], cnt: number, distanceFn: DistanceFunction): Point[] => {
    const picks = [points[Math.floor(Math.random() * points.length)]];
    for(let i = 1; i < cnt; i++) picks.push(points[weightedPick(points.map(p => picks.reduce((carry, centroid) => Math.min(carry, distanceFn(p, centroid)), Infinity)), Math.random())]);
    return picks;
};
