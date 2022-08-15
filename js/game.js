let canvas;
let world;
let keyboard = new Keyboard();
let gamemusic = new Audio('audio/music.mp3');
let musicOn = true;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function checkDevice(){
    setInterval(() => {
        let screenW = screen.width;
        let screenH = screen.height;
        let turnDevice = document.getElementById('turnDevice');
        if (screenW < 500 && screenH > 500) {
            turnDevice.style.display = "block";
            document.getElementById('startBtn').style.display = "none";
            document.getElementById('panelcontainer').style.display = "none";
        } else {
            turnDevice.style.display = "none";
            document.getElementById('startBtn').style.display = "block";
            document.getElementById('panelcontainer').style.display = "flex";
        }
    }, 100);
}


function hideStartScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "none";
    document.getElementById('canvas').style.display = "block";
    init();
}

function showStartScreen() {
    document.getElementById('startScreen').style.display = "flex";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "none";
    document.getElementById('canvas').style.display = "none";
}

function showHelpScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "block";
    document.getElementById('btnScreen').style.display = "none";
    document.getElementById('canvas').style.display = "none";
}

function showButtonScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "block";
}


function checkIfInitGame() {
    if (document.getElementById('startScreen').style.display == "none" &&
        document.getElementById('helpScreen').style.display == "none" &&
        document.getElementById('btnScreen').style.display == "none") {
        document.getElementById('canvas').style.display = "block";
        init();
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