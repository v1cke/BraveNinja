class MovableObject extends DrawableObject {

    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    speedX = 20;
    acceleration = 0.9;
    energy = 100;
    lastHit = 0;
    objectHurt = false;


    /**
     * falling of an object when it is about ground
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 20)
    }

    /**
     * query wether object is about ground
     * @returns - true if y-value is above ground
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true
        }
        if (this instanceof Endboss || this instanceof Minotaur) {
            return this.y < 800;
        }
        if (this instanceof Character) {
            return this.y < 335;
        }
    }


    /**
     * object moved up on y-axis
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * object moved right on x-axis
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * object moved left on x-axis
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * run through individual images of an animation
     * @param {path} images - array of all images from one animation
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;  // bewirkt CurrentImage nach einem IMAGES_IDLE Array Durchlauf nochmal von vorne durchläuft, also immer 0-9 bleibt
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * check if character is left from enemy
     * @param {class} enemy - class of enemy
     * @returns true if character left from enemy
     */
    characterLeft(enemy) {
        return this.world.character.x + (this.world.character.width / 2) < (enemy.x + enemy.width / 2)
    }

    /**
     * check if character is right from enemy
     * @param {class} enemy - class of enemy
     * @returns true if character right from enemy
     */
    characterRight(enemy) {
        return this.world.character.x + (this.world.character.width / 2) > (enemy.x + enemy.width / 2)
    }

    /**
     * query if one objects colliding with an other
     * @param {class} mo - class of object wich is colliding with this.object
     * @returns true if objects colliding
     */
    isColliding(mo) {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x + mo.width &&
                this.y < mo.y + mo.height
    }

    /**
     * query character is colliding with enemy from top
     * @param {class} mo - class of object wich is colliding with character
     * @returns true if character colliding from top
     */
    jumpsOnTop(mo) {
        return this.y + this.height > mo.y &&
            this.x + this.width > mo.x + 20 &&
            this.x < mo.x + mo.width - 20
    }

    /**
     * query if character hit by attacking enemy
     * @param {class} opponent 
     */
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

    /**
     * query if endboss hit by dagger in body
     */
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

    /**
    * query if endboss hit by dagger in head
    */
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


    /**
    * returns true when energy of object is 0
    */
    isDead() {
        return this.energy == 0;
    }


    /**
     * query when object was hit last time
     * @returns true when last hit was less than 1 second ago
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in sec
        return timepassed < 1;
    }


    /**
     * adding +1 to amount of throwable dagger from character
     */
    pickDaggers() {
        this.world.audio[8].play();
        this.amount_daggers++;
    }


    /**
     * adding +1 key to character
     */
    pickKeys() {
        this.world.audio[10].play();
        this.amount_keys++;
    }

}