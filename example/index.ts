import * as d3 from "d3";

import { Cluster, kmeans } from "../";

import { Delaunay } from "d3-delaunay";
import { Point } from "../src/point";

let data: { pointCount: number, clusterCount: number, points: Point[], clusters: Cluster[], iterations: Cluster[][], iterationIdx: number, width: number, height: number, seeds: number[][] };
window.onload = () => {
    document.getElementById("resetData")!.onclick = seed;
    document.getElementById("recluster")!.onclick = clusterize;
    document.getElementById("points")!.onchange = document.getElementById("clusters")!.onchange = loadForm;
    document.getElementById("clusterSeeds")!.onchange = document.getElementById("voronoi")!.onchange = document.getElementById("iteration")!.oninput = render;
    loadForm();
};
const loadForm = () => {
    data.pointCount = parseInt(document.getElementById("points")!["value"]);
    data.clusterCount = parseInt(document.getElementById("clusters")!["value"]);
    seed();
}, seed = () => {
    const width = window.innerWidth - 200, height = window.innerHeight, { pointCount, clusterCount } = data,
    { points, seeds } = seedPoints(pointCount, clusterCount, width, height);
    data = Object.assign(data, { points, pointCount, clusterCount, width, height, seeds });
    clusterize();
}, clusterize = () => {
    const iterations: Cluster[][] = [];
    data.clusters = kmeans(data.points, data.clusterCount, { onIteration: iterations.push });
    data.iterations = iterations;
    data.iterationIdx = document.getElementById("iteration")!["max"] = document.getElementById("iteration")!["value"] = iterations.length - 1;
    render();
}, render = () => {
    const { width, height } = data, clusters = data.iterations[parseInt(document.getElementById("iteration")!["value"])];
    document.getElementById("graph")!.innerHTML = '';
    const svg = d3.select("#graph").append("svg").attr("width", width).attr("height", height);
    clusters.map((c, idx) => {
        const color = ["blue", "green", "yellow", "cyan", "magenta", "brown", "grey"][idx];
        c.points.map(p => svg.append("circle").attr("cx", p[0]).attr("cy", p[1]).attr("r", 3).attr("stroke", color).attr("fill", color));
        svg.append("rect").attr("x", c.centroid[0]).attr("y", c.centroid[1]).attr("height", 10).attr("width", 10).attr("stroke", "black").attr("fill", color);
    });
    if (document.getElementById("voronoi")!["checked"]) svg.append("path").attr("d", Delaunay.from(clusters.map(c => c.centroid)).voronoi([0, 0, width, height]).render()).attr("stroke", "black");
    if (document.getElementById("clusterSeeds")!["checked"]) data.seeds.map(p => svg.append("circle").attr("cx", p[0]).attr("cy", p[1]).attr("r", 5).attr("stroke", "red").attr("fill", "none"));
}, seedPoints = (pointCount: number, clusterCount: number, width: number, height: number) => {
    const clusterPrimers = Array.from({length: clusterCount}, () => [(1 + Math.random() * 6) * width / 8, (1 + Math.random() * 6) * height / 8]);
    return { points: Array.from({ length: pointCount }, (_, i) => [normalRand(width / 20, clusterPrimers[i % clusterCount][0]), normalRand(height / 20, clusterPrimers[i % clusterCount][1])]), seeds: clusterPrimers };
}, normalRand = (std = 1, mean = 0) => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return mean + std * (Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
};
