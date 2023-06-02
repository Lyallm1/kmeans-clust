import { Cluster, KMeansOptions } from "./types.js";
import { Point, arePointsEqual } from "./point.js";

import { kmeansPlusPlusInit as defaultInitFunction } from "./initFunction/index.js";
import { euclideanDistance } from "./euclideanDistance.js";
import { merge } from "typescript-object-utils";
import { optimizeCentroids } from "./kmeans.js";
import { unique } from "./array.js";

export { Cluster, KMeansOptions };

export function kmeans(points: Point[], k: number, options?: Partial<KMeansOptions>): Cluster[] {
    const mergedOptions = merge({ distanceFunction: euclideanDistance, initFunction: defaultInitFunction }, options);
    return optimizeCentroids(initCentroids(points, k, mergedOptions), points, mergedOptions);
}
function initCentroids(points: Point[], k: number, options: KMeansOptions): Point[] {
    const uniquePoints = unique(points, arePointsEqual);
    if (uniquePoints.length < k) throw new Error("Not enough unique points");
    return options.initFunction(uniquePoints, k, options.distanceFunction);
}
