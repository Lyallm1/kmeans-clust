export function unique<T>(arr: T[], cmp: <T>(a: T, b: T) => boolean): T[] {
    return arr.reduce((prev, value) => {
        if (-1 === prev.findIndex(p => cmp(p, value))) prev.push(value);
        return prev;
    }, [] as T[]);
}
