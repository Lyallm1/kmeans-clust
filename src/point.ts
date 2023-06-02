export type Point = number[];

export function arePointsEqual(a: Point, b: Point): boolean {
    if (a.length !== b.length) return false;
    for (const [i, val] of a.entries()) if (val !== b[i]) return false;
    return true;
}
