import { InitFunction } from "../types.js";
import { weightedPick } from "./weightedPick.js";

export const kmeansPlusPlusInit: InitFunction = (points, cnt, distanceFn) => {
    const picks = [points[Math.floor(Math.random() * points.length)]];
    for(let i = 1; i < cnt; i++) picks.push(points[weightedPick(points.map(p => picks.reduce((carry, centroid) => Math.min(carry, distanceFn(p, centroid)), Infinity)), Math.random())]);
    return picks;
};
