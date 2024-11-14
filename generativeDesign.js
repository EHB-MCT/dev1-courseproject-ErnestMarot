"use strict";

//E R N E S T   M A R O T GENERATIVE DESIGN//

import * as Utils from "./utils.js";

let context;

function drawGenerativeDesign() {
    setup();
    generateRandomLines();
    generateRandomConcentricCircles();
    generateRandomClusters();
}

function setup() {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawDot(x, y, size) {
    let hue = Utils.randomNumber(0, 360);
    context.fillStyle = Utils.hsl(hue, 100, 50);
    Utils.fillCircle(x, y, size);  
}

function drawCluster(x, y, clusterSize, maxSize) {
    for (let i = 0; i < clusterSize; i++) {
        let offsetX = x + Math.random() * maxSize - maxSize / 2;
        let offsetY = y + Math.random() * maxSize - maxSize / 2;
        let size = Math.random() * (maxSize / 4);
        drawDot(offsetX, offsetY, size);
    }
}

function generateRandomClusters() {
    let clusterAreaWidth = 800;
    let clusterAreaHeight = 800; 

    for (let i = 0; i < 10; i++) {
        let x = Utils.randomNumber(100, clusterAreaWidth);
        let y = Utils.randomNumber(100, clusterAreaHeight);
        drawCluster(x, y, 10, 50);
    }
}

function generateRandomLines() {
    for (let i = 0; i < 10; i++) {
        let x1 = Utils.randomNumber(0, context.canvas.width);
        let y1 = Utils.randomNumber(0, context.canvas.height);
        let x2 = Utils.randomNumber(0, context.canvas.width);
        let y2 = Utils.randomNumber(0, context.canvas.height);

        let color = Utils.hsl(Utils.randomNumber(0, 360), 100, 50);
        Utils.drawLine(x1, y1, x2, y2, color);
    }
}

function generateRandomConcentricCircles() {
    let centerX = context.canvas.width / 2;
    let centerY = context.canvas.height / 2;

    let numCircles = 100;
    let maxRadius = 150;
    let increment = maxRadius / numCircles;

    for (let i = 0; i < numCircles; i++) {
        let radius = increment * (i + 1);
        let hue = Utils.randomNumber(0, 360);
        
        context.strokeStyle = Utils.hsl(hue, 100, 50);
        context.lineWidth = 4;
        Utils.strokeCircle(centerX, centerY, radius);
    }
}

window.addEventListener("load", drawGenerativeDesign);
window.addEventListener("resize", drawGenerativeDesign);
