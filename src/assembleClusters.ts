import { Cluster, DistanceFunction } from "./types.js";

import { Point } from "./point.js";

export function assembleClusters(centroids: Point[], points: Point[], distanceFunction: DistanceFunction): Cluster[] {
    const map = Array.from(centroids, centroid => Array.from(points, point => distanceFunction(centroid, point))), clusters: Cluster[] = [];
    centroids.forEach((centroid, c) => clusters[c] = { centroid, points: [], error: 0 });
    points.forEach((point, p) => {
        let idx = 0, d = map[0][p];
        for (let c = 1; c < centroids.length; c++) if (map[c][p] < d) [d, idx] = [map[c][p], c];
        clusters[idx].points.push(point);
        clusters[idx].error += d;
    });
    return clusters;
}
