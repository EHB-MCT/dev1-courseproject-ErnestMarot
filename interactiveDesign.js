"use strict";

let context;
const squareSize = 30;
let width, height;
let isPlaying = true;

let foregroundPieces = [];
let backgroundPieces = [];
let mouseX = 0, mouseY = 0; // Store mouse position
let scaleFactor = 1; // Default scaling factor for pieces and text

window.addEventListener("load", drawInteractiveDesign);
window.addEventListener("resize", drawInteractiveDesign);
window.addEventListener("mousemove", updateMousePosition); // Listen for mouse movement
window.addEventListener("wheel", handleScroll); // Listen for scroll event

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

// Update mouse position
function updateMousePosition(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
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
    // Create foreground pieces
    for (let i = 0; i < 25; i++) {
        let piece = createRandomPiece();
        piece.speed = 2 + Math.random() * 2; // Foreground pieces are faster
        foregroundPieces.push(piece);
    }

    // Create background pieces
    for (let i = 0; i < 15; i++) {
        let piece = createRandomPiece();
        piece.speed = 1 + Math.random() * 1.5; // Background pieces are slower
        piece.color = adjustLightness(piece.color, -40); // Darken the color
        backgroundPieces.push(piece);
    }

    animate();
}

// Handle scroll event
function handleScroll(event) {
    if (event.deltaY > 0) {
        // Scroll down - decrease scaling
        scaleFactor = Math.max(0.5, scaleFactor - 0.05); // Limit scale factor to a minimum
    } else {
        // Scroll up - increase scaling
        scaleFactor = Math.min(2, scaleFactor + 0.05); // Limit scale factor to a maximum
    }

    // Re-render with new scale factor
    drawInteractiveDesign();
}

// Helper function to create a random Tetris piece
function createRandomPiece() {
    let option = Math.floor(Math.random() * 7);
    return {
        option: option,
        x: Math.random() * (width - squareSize * 3),
        y: Math.random() * -200, // Random starting height above the screen
        speed: 2 + Math.random() * 2, // Default speed, unaffected by scale
        width: calculatePieceWidth(option),
        height: squareSize * 2,
        color: getPieceColor(option),
    };
}

// Animation
function animate() {
    if (isPlaying) {
        // Clear the canvas
        context.fillStyle = "darkblue";
        context.fillRect(0, 0, width, height);

        // Draw second layer of Tetris pieces (background layer)
        drawPieces(backgroundPieces, scaleFactor);

        // Draw background text
        drawBackgroundText(scaleFactor);

        // Draw main layer of Tetris pieces (foreground layer)
        drawPieces(foregroundPieces, scaleFactor);

        // Update positions of all pieces
        updatePiecePositions(foregroundPieces);
        updatePiecePositions(backgroundPieces);

        requestAnimationFrame(animate);
    }
}

// Helper function to draw Tetris pieces
function drawPieces(pieces, scale) {
    for (let i = 0; i < pieces.length; i++) {
        let piece = pieces[i];

        // Calculate temporary position shift based on mouse position
        let offsetX = (mouseX / width - 0.5) * 50; // Subtle horizontal shift
        let offsetY = (mouseY / height - 0.5) * 50; // Subtle vertical shift

        // Apply temporary shift to piece position
        let tempX = piece.x + offsetX;
        let tempY = piece.y + offsetY;

        // Draw Tetris piece with scaling applied
        drawTetrisPiece({ ...piece, x: tempX, y: tempY, scale });
    }
}

// Helper function to update piece positions
function updatePiecePositions(pieces) {
    for (let i = 0; i < pieces.length; i++) {
        let piece = pieces[i];

        // Move piece downwards, unaffected by scaling
        piece.y += piece.speed;

        // Reset piece when it falls off-screen
        if (piece.y >= height) {
            piece.y = Math.random() * -200; // Reset above the screen
            piece.x = Math.random() * (width - piece.width); // Randomize horizontal position
        }
    }
}

// Adjust lightness of a color (HSL)
function adjustLightness(color, lightnessAdjustment) {
    let hsl = color.match(/\d+/g).map(Number);
    hsl[2] = Math.max(0, Math.min(100, hsl[2] + lightnessAdjustment));
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
}

// Calculate Piece width
function calculatePieceWidth(option) {
    switch (option) {
        case 0: // T piece
        case 1: // L1 piece
        case 2: // L2 piece
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

// Piece default colors (HSL format)
function getPieceColor(option) {
    switch (option) {
        case 0: return "hsl(280, 100%, 50%)";  // Purple
        case 1: return "hsl(30, 100%, 50%)";   // Orange
        case 2: return "hsl(220, 100%, 50%)";  // Blue
        case 3: return "hsl(120, 100%, 50%)";  // Green
        case 4: return "hsl(0, 100%, 50%)";    // Red
        case 5: return "hsl(60, 100%, 50%)";   // Yellow
        case 6: return "hsl(180, 100%, 50%)";  // Cyan
        default: return "hsl(220, 100%, 50%)"; // Default Blue
    }
}

// Draw 1 Tetris Piece
function drawTetrisPiece(piece) {
    let startX = piece.x;
    let startY = piece.y;
    let scale = piece.scale || 1;

    if (piece.option == 0) {
        drawPieceT(startX, startY, piece.color, scale);
    } else if (piece.option == 1) {
        drawPieceL1(startX, startY, piece.color, scale);
    } else if (piece.option == 2) {
        drawPieceL2(startX, startY, piece.color, scale);
    } else if (piece.option == 3) {
        drawPieceStair1(startX, startY, piece.color, scale);
    } else if (piece.option == 4) {
        drawPieceStair2(startX, startY, piece.color, scale);
    } else if (piece.option == 5) {
        drawPieceBlock(startX, startY, piece.color, scale);
    } else if (piece.option == 6) {
        drawPieceLine(startX, startY, piece.color, scale);
    }
}

// Draw background text with scaling
function drawBackgroundText(scale) {
    // Calculate offset for reverse movement
    let offsetX = (0.5 - mouseX / width) * 30; // Reverse horizontal shift
    let offsetY = (0.5 - mouseY / height) * 30; // Reverse vertical shift

    context.fillStyle = "rgba(255, 255, 255, 0.7)";
    context.font = `${80 * scale}px Arial`; // Apply scale to text size
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText("ERNEST MAROT", width / 2 + offsetX, height / 2 + offsetY);
}

// Example Piece Drawing Functions (adjusted for scaling)
function drawPieceT(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX + s * 2, startY, s, color);
    drawSquare(startX + s, startY + s, s, color);
}

// L1 Piece
function drawPieceL1(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX + s * 2, startY, s, color);
    drawSquare(startX, startY + s, s, color);
}

// L2 Piece
function drawPieceL2(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX + s * 2, startY, s, color);
    drawSquare(startX + s * 2, startY + s, s, color);
}

// Stair 1 Piece
function drawPieceStair1(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX + s, startY + s, s, color);
    drawSquare(startX + s, startY + s * 2, s, color);
}

// Stair 2 Piece
function drawPieceStair2(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX, startY + s, s, color);
    drawSquare(startX, startY + s * 2, s, color);
}

// Block Piece
function drawPieceBlock(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX, startY + s, s, color);
    drawSquare(startX + s, startY + s, s, color);
}

// Line Piece
function drawPieceLine(startX, startY, color, scale) {
    const s = squareSize * scale;
    drawSquare(startX, startY, s, color);
    drawSquare(startX + s, startY, s, color);
    drawSquare(startX + s * 2, startY, s, color);
    drawSquare(startX + s * 3, startY, s, color);
}
