let canvas;
let world;
let keyboard = new Keyboard();
let gamemusic = new Audio('audio/music.mp3');
let musicOn = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function hideStartScreen() {
    document.getElementById('startScreen').style.display = "none";
    checkIfInitGame()
}

function showStartScreen() {
    document.getElementById('startScreen').style.display = "flex";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "none";
    checkIfInitGame()
}

function showHelpScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "block";
    document.getElementById('btnScreen').style.display = "none";
    checkIfInitGame()
}

function showButtonScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "block";
    checkIfInitGame()
}


function checkIfInitGame() {
    if (document.getElementById('startScreen').style.display == "none" &&
        document.getElementById('helpScreen').style.display == "none" &&
        document.getElementById('btnScreen').style.display == "none") {
        document.getElementById('canvas').style.display = "block";
        init()
    }
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
})


window.addEventListener("keyup", (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
})