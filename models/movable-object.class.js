class MovableObject extends DrawableObject {

    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    speedX = 20;
    acceleration = 0.9;
    energy = 100;
    lastHit = 0;
    ninja_pickDagger = new Audio('audio/sword_pickup.mp3');
    ninja_pickKey = new Audio('audio/keys_pick.mp3');
    objectHurt = false;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 20)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        }
        if (this instanceof Minotaur) {
            return this.y < 700;
        }
        if (this instanceof Endboss) {
            return this.y < 800;
        }
        if (this instanceof Character) {
            return this.y < 345;
        }
    }


    jump() {
        this.speedY = 20;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;  // bewirkt CurrentImage nach einem IMAGES_IDLE Array Durchlauf nochmal von vorne durchläuft, also immer 0-9 bleibt
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    characterLeft(enemy) {
        return this.world.character.x + (this.world.character.width / 2) < (enemy.x + enemy.width / 2)
    }

    characterRight(enemy) {
        return this.world.character.x + (this.world.character.width / 2) > (enemy.x + enemy.width / 2)
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height
    }

    jumpsOnTop(mo) {
        return this.y + this.height > mo.y &&
            this.x + (this.width - 20) > mo.x &&
            this.x < (mo.x + mo.width)
    }

    hit(opponent) {
        if (!this.isHurt()) {
            if (opponent instanceof Minotaur) {
                this.energy -= 10;
            } else if (opponent instanceof Endboss) {
                this.energy -= 15;
            }
            if (this.energy < 0) {
                this.energy = 0;
            } else {
                this.lastHit = new Date().getTime();
            }
        }
    }

    hitByDaggerBody() {
        if (!this.objectHurt) {
            this.objectHurt = true;
            this.energy -= 10;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.world.bossHealthBar.setPercentage(this.energy);
            if (this.isDead()) {
                this.objectHurt = false;
            } else {
                setTimeout(() => {
                    this.objectHurt = false;
                }, 2000);
            }
        }
    }

    hitByDaggerHead() {
        if (!this.objectHurt) {
            this.objectHurt = true;
            this.energy -= 30;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.world.bossHealthBar.setPercentage(this.energy);
            if (this.isDead()) {
                this.objectHurt = false;
            } else {
                setTimeout(() => {
                    this.objectHurt = false;
                }, 2000);
            }
        }
    }

    isDead(mo) {
        return this.energy == 0;
    }


    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    }


    pickDaggers() {
        this.ninja_pickDagger.play();
        this.amount_daggers++;
    }

    pickKeys() {
        this.ninja_pickKey.play();
        this.amount_keys++;
    }

}