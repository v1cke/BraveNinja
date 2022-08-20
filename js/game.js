let canvas;
let world;
let keyboard = new Keyboard();
let game = document.documentElement;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function checkDevice() {
    setInterval(() => {
        if (isMobile()) {
            if (!landscape()) {
                devicePortrait();
            } else if (landscape()) {
                deviceLandscape();
                checkPanelcontainerNeeded();
            }
        } else if (!isMobile()) {
            closeFullscreen(game);
        }
        if (isAppleDevice()) {
            deviceLandscape();
            checkPanelcontainerNeeded();
        }
    }, 100);
}


function isMobile() {
    // credit to Timothy Huang for this regex test: 
    // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
    if (/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
    else {
        return false
    }
}

function isAppleDevice() {
    // credit to Timothy Huang for this regex test: 
    // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return true
    }
    else {
        return false
    }
}


function landscape() {
    let screenW = screen.width;
    let screenH = screen.height;
    if (screenW < screenH) {
        return false
    } else if (screenW > screenH) {
        return true
    }
}


function deviceLandscape() {
    document.getElementById('turnDevice').style.display = "none";
    document.getElementById('startBtn').style.display = "block";
    document.getElementById('panelcontainer').style.display = "flex";
    openFullscreen();
}

function devicePortrait() {
    document.getElementById('turnDevice').style.display = "block";
    document.getElementById('startBtn').style.display = "none";
    document.getElementById('panelcontainer').style.display = "none";
    closeFullscreen();
}


function checkPanelcontainerNeeded() {
    if (document.getElementById('GameOverScreen').style.display == "flex" || document.getElementById('wonGameScreen').style.display == "flex")
        document.getElementById('panelcontainer').style.display = "none";
}


function openFullscreen() {
    game;
    if (game.requestFullscreen) {
        game.requestFullscreen();
    } else if (game.webkitRequestFullscreen) { /* Safari */
        game.webkitRequestFullscreen();
    } else if (game.msRequestFullscreen) { /* IE11 */
        game.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (game.exitFullscreen) {
        game.exitFullscreen();
    } else if (game.webkitexitFullscreen) { /* Safari */
        game.webkitexitFullscreen();
    } else if (game.msexitFullscreen) { /* IE11 */
        game.msexitFullscreen();
    }
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
    if (e.keyCode == 77) {
        keyboard.M = true;
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
    if (e.keyCode == 77) {
        keyboard.M = false;
    }
})