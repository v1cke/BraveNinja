class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    M = false;
    world;


    /**
    * query whether button on mobile device was pressed
    */
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

}
