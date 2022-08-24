class Treasure extends MovableObject {

    getTreasure;
    currentImage = 0;
    width = 150;
    height = 220;


    IMAGES_CHEST_LOCKED = [
        'img/treasurebox/box_locked1.png',
        'img/treasurebox/box_locked2.png',
    ]


    /**
     * draw treasure chest in canvas
     * @param {class} world class of world
     */
    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/treasurebox/box_closed.png');
        this.loadImages(this.IMAGES_CHEST_LOCKED);
        this.x = 2950;
        this.y = 240;
        this.checkTreasureChest();
    }

    /**
     * query if chest gets opened or not
     * executes animation of closed chest
     */
    checkTreasureChest() {
        this.getTreasure = setInterval(() => {
            if (this.world.character.x > 2550 && this.world.character.x < 2900) {
                this.playAnimation(this.IMAGES_CHEST_LOCKED);
            } else if (this.world.character.x > 2850 && 
                this.world.level.enemies.length < 1 && 
                this.world.level.endboss.length < 1 &&
                this.world.character.amount_keys == 2) {
                this.treasureFound();
            }
        }, 200);
    }

    /**
     * executes animation of opened chest
     * afterwards finishes game by closing canvas and open winner screen
     */
    treasureFound() {
        this.loadImage('img/treasurebox/box_opened1.png')
        setTimeout(() => {
            this.loadImage('img/treasurebox/box_opened2.png')
            this.world.audio[12].play();
        }, 1500);
        clearInterval(this.getTreasure);
        setTimeout(() => {
            document.getElementById('wonGameScreen').style.display = "flex";
            document.getElementById('canvas').style.display = "none";
            document.getElementById('headline').style.display = "block";
        }, 3000);
    }

}