"use strict";

let context;
const squareSize = 30;

window.addEventListener("load", drawInteractiveDesign);
window.addEventListener("resize", drawInteractiveDesign);

function drawInteractiveDesign() {
    setup();
    drawTetrisPiece();
}

function setup() {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "darkblue";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSquare(xPos, yPos, size = squareSize, color = "blue") {
    context.fillStyle = color;
    context.fillRect(xPos, yPos, size, size);
    context.strokeStyle = "black";
    context.strokeRect(xPos, yPos, size, size);
}

function drawTetrisPiece() {
    let option = Math.floor(Math.random() * 7);

    // Calculate center coordinates for positioning the pieces
    const centerX = canvas.width / 2 - squareSize * 2; // Adjusted to center the pieces
    const centerY = canvas.height / 2 - squareSize * 2; // Adjusted to center the pieces

    if (option == 0) {
        drawPieceT(centerX, centerY);
    } else if (option == 1) {
        drawPieceL1(centerX, centerY);
    } else if (option == 2) {
        drawPieceL2(centerX, centerY);
    } else if (option == 3) {
        drawPieceStair1(centerX, centerY);
    } else if (option == 4) {
        drawPieceStair2(centerX, centerY);
    } else if (option == 5) {
        drawPieceBlock(centerX, centerY);
    } else if (option == 6) {
        drawPieceLine(centerX, centerY);
    }
}

function drawPieceT(startX, startY) {
    let color = "purple";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}

function drawPieceL1(startX, startY) {
    let color = "orange";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
}

function drawPieceL2(startX, startY) {
    let color = "blue";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY + squareSize, squareSize, color);
}

function drawPieceStair1(startX, startY) {
    let color = "green";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize * 2, startY + squareSize, squareSize, color);
}

function drawPieceStair2(startX, startY) {
    let color = "red";
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}

function drawPieceBlock(startX, startY) {
    let color = "yellow";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}

function drawPieceLine(startX, startY) {
    let color = "cyan";
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize * 3, startY, squareSize, color);
}
