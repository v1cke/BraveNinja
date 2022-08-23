let canvas;
let world;
let keyboard = new Keyboard();
canvasFullscreen = false;
game = document.documentElement;

/**
 * initiate the game
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


/**
 * hide everything except canvas (the game)
 */
function hideStartScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "none";
    init();
    document.getElementById('introContainer').style.display = "block";
    setTimeout(() => {
        document.getElementById('introContainer').style.display = "none";
        document.getElementById('canvas').style.display = "block";
        if (isMobile()) {
            // document.getElementById('panelcontainer').style.display = "flex";
        }
    }, 8000);
}


/**
 * check if a mobile or apple device is used AND if it is hold on portrai or landscape mode
 */
function checkDevice() {
    setInterval(() => {
        if (isMobile()) {
            if (!landscape()) {
                devicePortrait();
                canvasFullscreen = false;
            } else if (landscape() && !canvasFullscreen) {
                deviceLandscape(game);
                canvasFullscreen = true;
                // checkPanelcontainerNeeded();
            }
        if (isAppleDevice() && !canvasFullscreen) {
            deviceLandscape(game);
            canvasFullscreen = true;
        }
        } else if (!isMobile()) {
            !landscape();
        }
    }, 100);
}


/**
 * 
 * @returns if user uses a mobile (except apple devices)
 */
function isMobile() {
    // credit to Timothy Huang for this regex test: 
    // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
    if (/Android|webOS|BlackBerry|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
    }
}

function isAppleDevice() {
    // credit to Timothy Huang for this regex test: 
    // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        return true
    }
}


/**
 * 
 * @returns if device is hold in landscape mode
 */
function landscape() {
    let screenW = screen.width;
    let screenH = screen.height;
    if (screenW < screenH) {
        return false
    } else if (screenW > screenH) {
        return true
    }
}


/**
 * enable start button and controlling buttons and disable "turn device" text
 */
function deviceLandscape(game) {
    document.getElementById('turnDevice').style.display = "none";
    document.getElementById('startBtn').style.display = "block";
    document.getElementById('panelcontainer').style.display = "flex";
    game.requestFullscreen();
}

/**
 * disable start button and controlling buttons and enable "turn device" text
 */
function devicePortrait() {
    document.getElementById('turnDevice').style.display = "block";
    document.getElementById('startBtn').style.display = "none";
    document.getElementById('panelcontainer').style.display = "none";
}


/**
 * disable controlling buttons after finish game
 */
function checkPanelcontainerNeeded() {
    if (document.getElementById('GameOverScreen').style.display == "flex" || document.getElementById('wonGameScreen').style.display == "flex")
        document.getElementById('panelcontainer').style.display = "none";
}


/**
 * hide everything except startscreen
 */
function showStartScreen() {
    document.getElementById('startScreen').style.display = "flex";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "none";
    document.getElementById('canvas').style.display = "none";
}

/**
 * hide everything except helpscreen
 */
function showHelpScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "block";
    document.getElementById('btnScreen').style.display = "none";
    document.getElementById('canvas').style.display = "none";
}

/**
 * hide everything except button-explantation screen
 */
function showButtonScreen() {
    document.getElementById('startScreen').style.display = "none";
    document.getElementById('helpScreen').style.display = "none";
    document.getElementById('btnScreen').style.display = "block";
}


/**
 * query whether key was pressed
 */
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

/**
 * query whether key was released
 */
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