"use strict";

//E R N E S T   M A R O T INTERACTIVE DESIGN//

import * as Utils from "./utils.js";

let context;

window.addEventListener("load", drawInteractiveDesign);
window.addEventListener("resize", drawInteractiveDesign);

function drawInteractiveDesign() {
    setup();
}

function setup() {
    let canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context = canvas.getContext("2d");
    context.fillStyle = "indigo";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
