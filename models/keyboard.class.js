class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    world;


    // constructor(world) {
    //     this.world = world;
    //     this.keyPressEvents();
    //     this.btnPressEvents();
    // }


    // keyPressEvents() {
    //     window.addEventListener("keydown", (e) => {
    //         if (e.keyCode == 37) {
    //             keyboard.LEFT = true;
    //         }
    //         if (e.keyCode == 38) {
    //             keyboard.UP = true;
    //         }
    //         if (e.keyCode == 39) {
    //             keyboard.RIGHT = true;
    //         }
    //         if (e.keyCode == 40) {
    //             keyboard.DOWN = true;
    //         }
    //         if (e.keyCode == 32) {
    //             keyboard.SPACE = true;
    //         }
    //     })


    //     window.addEventListener("keyup", (e) => {
    //         if (e.keyCode == 37) {
    //             keyboard.LEFT = false;
    //         }
    //         if (e.keyCode == 38) {
    //             keyboard.UP = false;
    //         }
    //         if (e.keyCode == 39) {
    //             keyboard.RIGHT = false;
    //         }
    //         if (e.keyCode == 40) {
    //             keyboard.DOWN = false;
    //         }
    //         if (e.keyCode == 32) {
    //             keyboard.SPACE = false;
    //         }
    //     })
    // }




    btnPressEvents() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
        document.getElementById('btnUp').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.UP = true;
        });
        document.getElementById('btnUp').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.UP = false;
        });
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }


    // // btnPressEvents(){
    // //     window.addEventListener("touchstart", (e) => {
    // //         if (document.getElementById('btnLeft')) {
    // //             keyboard.LEFT = true;
    // //         }
    // //         if (document.getElementById('btnUp')) {
    // //             keyboard.UP = true;
    // //         }
    // //         if (document.getElementById('btnRight')) {
    // //             keyboard.RIGHT = true;
    // //         }
    // //         if (document.getElementById('btnThrow')) {
    // //             keyboard.SPACE = true;
    // //         }
    // //     })


    // //     window.addEventListener("touchend", (e) => {
    // //         if (document.getElementById('btnLeft')) {
    // //             keyboard.LEFT = false;
    // //         }
    // //         if (document.getElementById('btnUp')) {
    // //             keyboard.UP = false;
    // //         }
    // //         if (document.getElementById('btnRight')) {
    // //             keyboard.RIGHT = false;
    // //         }
    // //         if (document.getElementById('btnThrow')) {
    // //             keyboard.SPACE = false;
    // //         }
    // //     })
    // // }


}
