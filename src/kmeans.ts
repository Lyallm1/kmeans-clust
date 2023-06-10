import { Cluster, KMeansOptions } from "./types.js";
import { Point, arePointsEqual } from "./point.js";

import { assembleClusters } from "./assembleClusters.js";

export function optimizeCentroids(centroids: Point[], points: Point[], options: KMeansOptions): Cluster[] {
    let clusters: Cluster[] = [], anyCentroidChanged = false;
    do {
        clusters = assembleClusters(centroids, points, options.distanceFunction);
        if (options.onIteration) options.onIteration(clusters);
        anyCentroidChanged = false;
        centroids = [];
        for (const cluster of clusters) {
            const centroid = clusterCentroid(cluster);
            centroids.push(centroid);
            if (!arePointsEqual(centroid, cluster.centroid)) anyCentroidChanged = true;
        }
    } while (anyCentroidChanged);
    return clusters;
}
function clusterCentroid(cluster: Cluster): Point {
    if (cluster.points.length === 0) return cluster.centroid;
    const centroid = cluster.points[0].concat();
    for (let i = 1; i < cluster.points.length; i++) centroid.forEach((c, d) => c += cluster.points[i][d]);
    centroid.forEach(c => c /= cluster.points.length);
    return centroid;
}
