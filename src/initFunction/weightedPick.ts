export function weightedPick(weights: number[], pick: number): number {
    let sum = 0;
    weights.forEach((weight, idx) => {
        sum += weight;
        if (sum > weights.reduce((carry, w) => carry + w, 0) * pick) return idx;
    });
    return 0;
}
