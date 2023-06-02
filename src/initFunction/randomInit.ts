import { InitFunction } from "../types.js";
import { Point } from "../point.js";

export const randomInit: InitFunction = (arr, cnt) => {
    const copy = arr.concat(), picks: Point[] = [];
    for(let i = 0; i < cnt; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        picks.push(copy[idx]);
        copy.splice(idx, 1);
    }
    return picks;
};
