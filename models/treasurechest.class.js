class Treasure extends MovableObject {

    getTreasure;
    currentImage = 0;

    IMAGES_CHEST_LOCKED = [
        'img/treasurebox/box_locked1.png',
        'img/treasurebox/box_locked2.png',
    ]
    IMAGES_CHEST_OPENED = [
        'img/treasurebox/box_opened1.png',
        'img/treasurebox/box_opened2.png'
    ]


    constructor(world) {
        super();
        this.world = world;
        this.loadImage('img/treasurebox/box_closed.png');
        this.loadImages(this.IMAGES_CHEST_LOCKED);
        this.loadImages(this.IMAGES_CHEST_OPENED);
        this.x = 2950;
        this.y = 360;
        this.checkTreasureChest();
    }

    checkTreasureChest() {
        this.getTreasure = setInterval(() => {
            if (this.world.character.x > 2550 && this.world.character.x < 2850) {
                this.playAnimation(this.IMAGES_CHEST_LOCKED);
            } else if (this.world.character.x > 2850 && 
                this.world.level.enemies.length < 1 && 
                this.world.level.endboss.length < 1) {
                    this.treasureFound();
                }
        }, 200);
    }

    treasureFound() {
        // setTimeout(() => {
            this.loadImage('img/treasurebox/box_opened1.png')
        // }, 500);
        setTimeout(() => {
            this.loadImage('img/treasurebox/box_opened2.png')
        }, 1500);
        clearInterval(this.getTreasure)
    }

}