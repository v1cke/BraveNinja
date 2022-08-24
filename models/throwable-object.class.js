class ThrowableObject extends MovableObject {

    world;
    acceleration = 0.05;
    speed = 13;
    width = 60;
    height = 30;
    direction;
    throwingDaggers;
    needDaggers;


    IMAGES_THROWDAGGER = [
        'img/daggers/PNG/dagger.png',
        'img/daggers/PNG/dagger2.png',
        'img/daggers/PNG/dagger3.png',
        'img/daggers/PNG/dagger4.png',
        'img/daggers/PNG/dagger5.png',
        'img/daggers/PNG/dagger6.png',
        'img/daggers/PNG/dagger7.png',
        'img/daggers/PNG/dagger8.png',
    ];

    IMAGES_DAGGERHIT = [
        'img/daggers/PNG/dagger9.png'
    ];


    /**
     * draw daggers in canvas
     * @param {number} x position on x-axis 
     * @param {number} y position on y-axis
     * @param {Function} direction direction of moving object
     * @param {class} world class of world
     */
    constructor(x, y, direction, world) {
        super().loadImage('img/daggers/PNG/dagger8.png');
        this.world = world;
        this.direction = direction;
        this.loadImages(this.IMAGES_THROWDAGGER);
        this.loadImages(this.IMAGES_DAGGERHIT);
        this.x = x;
        this.y = y;
        this.checkDaggerNeeded();
        this.throwDagger();
    }

    /**
     * query if dagger colliding with object
     * @param {class} mo - class of object wich is colliding with dagger
     * @returns true if dagger colliding with object
     */
    DaggerColliding(mo) {
        if (mo instanceof Minotaur) {
            return this.x + this.width > mo.x + mo.width / 2 &&
                this.x + this.width < mo.x + mo.width &&
                this.y + this.height > mo.y + 40 &&
                this.y < mo.y + mo.height
        } else if (mo instanceof Endboss) {
            return this.x + this.width > mo.x + mo.width / 2 &&
                this.x + this.width < mo.x + mo.width &&
                this.y + this.height > mo.y + 250 &&
                this.y < mo.y + mo.height
        }
    }

    /**
     * query if dagger colliding with objects head
     * @param {class} mo - class of object wich is colliding with dagger
     * @returns true if dagger colliding with objects head
     */
    DaggerCollidingHead(mo) {
        return this.x + this.width > mo.x + mo.width / 2.5 &&
            this.x + this.width < mo.x + mo.width &&
            this.y + this.height > mo.y + 120 &&
            this.y < mo.y + mo.height
    }

    /**
     * function to disable interval for throwing daggers
     */
    checkDaggerNeeded() {
        this.needDaggers = setInterval(() => {
            if (this.world.level.enemies.length < 1 && this.world.level.endboss.length < 1) {
                clearInterval(this.throwingDaggers);
                clearInterval(this.needDaggers);
            }
        }, 500);
    }


    /**
     * function for throwing dagger
     */
    throwDagger() {
        this.applyGravity();
        // this.world.audio[9].play();
        this.throwingDaggers = setInterval(() => {
            if (!this.direction) {
                this.checkDaggerCollision(this.moveRight())
            } else if (this.direction) {
                this.checkDaggerCollision(this.moveLeft());
            }
        }, 25)
    }

    /**
     * function to execute animations of enemies when hit by dagger
     * @param {Function} direction direction of moving of throwen dagger
     */
    checkDaggerCollision(direction) {
        direction;
        this.world.level.enemies.forEach((enemy) => {
            if (this.DaggerColliding(enemy)) {
                this.enemiesHit();
                enemy.energy = 0;
            }
        })
        this.world.level.endboss.forEach((endboss) => {
            if (this.DaggerColliding(endboss)) {
                this.enemiesHit();
                endboss.hitByDaggerBody();
            } else if (this.DaggerCollidingHead(endboss)) {
                this.enemiesHit();
                endboss.hitByDaggerHead();
            }
        })
    }

    /**
     * animates dagger with bloodsplash and stops enemy when hit by dagger
     */
    enemiesHit() {
        this.speed = 0;
        this.acceleration = 0.5;
        this.loadImage('img/daggers/PNG/dagger9.png');
    }

}