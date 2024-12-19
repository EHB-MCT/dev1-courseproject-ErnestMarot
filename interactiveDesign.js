"use strict";

let context;
const squareSize = 30;
const horizontalSpacing = 10;

let width, height;
let isPlaying = true;

let pieces = [];

window.addEventListener("load", drawInteractiveDesign);
window.addEventListener("resize", drawInteractiveDesign);

function drawInteractiveDesign() {
    setup();
    drawTetrisPieces();
}
// Setup
function setup() {
    let canvas = document.querySelector("canvas");
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
}
// Draw 1 square
function drawSquare(xPos, yPos, size = squareSize, color = "blue") {
    context.fillStyle = color;
    context.fillRect(xPos, yPos, size, size);
    context.strokeStyle = "black";
    context.strokeRect(xPos, yPos, size, size);
}
// Draw multiple Tetris Pieces
function drawTetrisPieces() {
    for (let i = 0; i < 25; i++) {
        let option = Math.floor(Math.random() * 7);

        let piece = {
            option: option,
            x: Math.random() * (width - squareSize * 3),
            y: -50,
            speed: 2 + Math.random() * 2,
            width: calculatePieceWidth(option),
            height: squareSize * 2,
            color: getPieceColor(option)
        };

        pieces.push(piece);
    }
    animate();
}
// Animation
function animate() {
    if (isPlaying) {
        context.fillStyle = "darkblue";
        context.fillRect(0, 0, width, height);

        // Draw background text
        drawBackgroundText();

        for (let i = 0; i < pieces.length; i++) {
            let piece = pieces[i];
            // Draw tetris piece
            drawTetrisPiece(piece);
            // Move piece downwards
            piece.y += piece.speed;
            // Looping effect
            if (piece.y >= height) {
                piece.y = -50;  // Reset to the top
                piece.x = Math.random() * (width - piece.width);
            }
        }
        requestAnimationFrame(animate);
    }
}
// Calc Piece width
function calculatePieceWidth(option) {
    switch(option) {
        case 0: // T piece
            return squareSize * 3;
        case 1: // L1 piece
        case 2: // L2 piece
            return squareSize * 3;
        case 3: // Stair1 piece
        case 4: // Stair2 piece
            return squareSize * 3;
        case 5: // Block piece
            return squareSize * 2;
        case 6: // Line piece
            return squareSize * 4;
        default:
            return squareSize * 2;
    }
}
//Piece default colors
function getPieceColor(option) {
    switch(option) {
        case 0: return "purple";  // T piece
        case 1: return "orange";  // L1 piece
        case 2: return "blue";    // L2 piece
        case 3: return "green";   // Stair1 piece
        case 4: return "red";     // Stair2 piece
        case 5: return "yellow";  // Block piece
        case 6: return "cyan";    // Line piece
        default: return "blue";   // Default color
    }
}
// Draw 1 Tetris Piece
function drawTetrisPiece(piece) {
    let startX = piece.x;
    let startY = piece.y;

    if (piece.option == 0) {
        drawPieceT(startX, startY, piece.color);
    } else if (piece.option == 1) {
        drawPieceL1(startX, startY, piece.color);
    } else if (piece.option == 2) {
        drawPieceL2(startX, startY, piece.color);
    } else if (piece.option == 3) {
        drawPieceStair1(startX, startY, piece.color);
    } else if (piece.option == 4) {
        drawPieceStair2(startX, startY, piece.color);
    } else if (piece.option == 5) {
        drawPieceBlock(startX, startY, piece.color);
    } else if (piece.option == 6) {
        drawPieceLine(startX, startY, piece.color);
    }
}
// Name in middle of canvas
function drawBackgroundText() {
    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.font = "80px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("ERNEST MAROT", width / 2, height / 2 );

}
// T Piece
function drawPieceT(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}
// L1 Piece
function drawPieceL1(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
}
// L2 Piece
function drawPieceL2(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY + squareSize, squareSize, color);
}
// Stair 1 Piece
function drawPieceStair1(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize * 2, startY + squareSize, squareSize, color);
}
// Stair 2 Piece
function drawPieceStair2(startX, startY, color) {
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}
// Block Piece
function drawPieceBlock(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX, startY + squareSize, squareSize, color);
    drawSquare(startX + squareSize, startY + squareSize, squareSize, color);
}
// Line Piece
function drawPieceLine(startX, startY, color) {
    drawSquare(startX, startY, squareSize, color);
    drawSquare(startX + squareSize, startY, squareSize, color);
    drawSquare(startX + squareSize * 2, startY, squareSize, color);
    drawSquare(startX + squareSize * 3, startY, squareSize, color);
}
