class ThrowableObject extends MovableObject {

    world;
    acceleration = 0.05;
    speed = 13;
    width = 60;
    height = 30;
    ninja_ThrowDagger = new Audio('audio/sword_throw.mp3');
    direction;


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


    constructor(x, y, direction, world) {
        super().loadImage('img/daggers/PNG/dagger8.png');
        this.world = world;
        this.direction = direction;
        this.loadImages(this.IMAGES_THROWDAGGER);
        this.loadImages(this.IMAGES_DAGGERHIT);
        this.x = x;
        this.y = y;
        this.checkDaggerCollision();
    }

    DaggerColliding(mo) {
        return this.x + this.width > mo.x &&
            this.x + this.width < mo.x + mo.width &&
            this.y + this.height > mo.y + 50 &&
            this.x >= mo.x + (mo.width / 5) &&
            this.y < mo.y + mo.height
    }

    DaggerCollidingBody(mo) {
        return this.x + this.width > mo.x &&
            this.x + this.width < mo.x + mo.width &&
            this.y + this.height > mo.y + 250 &&
            this.x >= mo.x + (mo.width / 5) &&
            this.y < mo.y + mo.height
    }

    DaggerCollidingHead(mo) {
        return this.x + this.width > mo.x &&
            this.x + this.width < mo.x + mo.width &&
            this.y + this.height > mo.y + 120 &&
            this.x >= mo.x + (mo.width / 5) &&
            this.y < mo.y + mo.height
    }


    checkDaggerCollision() {
        this.applyGravity();
        this.ninja_ThrowDagger.play();
        setInterval(() => {
            if (!this.direction) {
                this.throwDaggerRight()
            } else if (this.direction) {
                this.throwDaggerLeft();
            }
        }, 25)
    }


    throwDaggerRight() {
        this.moveRight();
        this.world.level.enemies.forEach((enemy) => {
            if (this.DaggerColliding(enemy)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                enemy.dyingEnemy();
            }
        })
        this.world.level.endboss.forEach((endboss) => {
            if (this.DaggerCollidingBody(endboss)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                endboss.hitByDaggerBody();
            } else if (this.DaggerCollidingHead(endboss)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                endboss.hitByDaggerHead();
            }
        })
    }


    throwDaggerLeft() {
        this.moveLeft();
        this.world.level.enemies.forEach((enemy) => {
            if (this.DaggerColliding(enemy)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                enemy.dyingEnemy();
            }
        })
        this.world.level.endboss.forEach((endboss) => {
            if (this.DaggerCollidingBody(endboss)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                endboss.hitByDaggerBody();
            } else if (this.DaggerCollidingHead(endboss)) {
                this.speed = 0;
                this.loadImage('img/daggers/PNG/dagger9.png');
                endboss.hitByDaggerHead();
            }
        })
    }

}