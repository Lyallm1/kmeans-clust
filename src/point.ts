export type Point = number[];

export function arePointsEqual(a: Point, b: Point): boolean {
    if (a.length !== b.length) return false;
    a.forEach((val, i) => {
        if (val != b[i]) return false;
    })
    return true;
}
