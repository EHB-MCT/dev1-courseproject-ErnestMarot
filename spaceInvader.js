"use strict";

//E R N E S T   M A R O T//

//canvas
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');
//background-color
context.fillStyle = "black";
context.fillRect(50, 50, 300, 300);

//left eye
signature(75,75);
signature(125,75)
//right eye
signature(225,75)
signature(275,75)
//left L
signature(75,225)
signature(75,275)
signature(125,275)
//right L
signature(225,275)
signature(275,275)
signature(275,225)

function signature(p1,p2) {
    let size = 50;
    context.fillStyle = "#d84754";
    context.fillRect(p1, p2, size, size);
}