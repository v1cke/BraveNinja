class Minotaur extends MovableObject {

    world;
    deadTimer = 13;
    otherDirection = false;
    enemyLife;


    IMAGES_WALKING = [
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_000.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_001.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_002.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_003.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_004.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_005.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_006.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_007.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_008.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_009.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_010.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_011.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_012.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_013.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_014.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_015.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_016.png',
        'img/minotaur/Minotaur_01/Walking/Minotaur_01_Walking_017.png',
    ];

    IMAGES_IDLE = [
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_000.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_001.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_002.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_003.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_004.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_005.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_006.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_007.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_008.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_009.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_010.png',
        'img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_011.png',
    ];

    IMAGES_DYING = [
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_000.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_001.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_002.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_003.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_004.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_005.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_006.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_007.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_008.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_009.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_010.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_011.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_012.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_013.png',
        'img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_014.png',
    ];

    IMAGES_ATTACK = [
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_000.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_001.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_002.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_003.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_004.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_005.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_006.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_007.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_008.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_009.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_010.png',
        'img/minotaur/Minotaur_01/Attacking/Minotaur_01_Attacking_011.png'
    ];


    constructor(world) {
        super().loadImage('img/minotaur/Minotaur_01/Idle Blink/Minotaur_01_Idle Blinking_000.png');
        this.x = 350 + Math.random() * 2500;  // math.random immer zwischen 0 und 1 (ohne 1), also in diesem Fall alles zwischen 0 und ca. 499
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_IDLE);
        this.world = world;
        this.animate();
    }


    /**
     * executes idle animation when character is dead or not closer than 500px to endboss
     * executes dying animation when character jumps on top of enemy or get hit by dagger
     * executes moving left or right (folowing character) when movement triggered by character
     */
    animate() {
        setTimeout(() => {
            this.enemyLife = setInterval(() => {
                if (this.world.character.isDead()) {
                    this.playAnimation(this.IMAGES_IDLE);
                } else if (!this.world.character.isDead()) {
                    if (this.characterLeft(this)) {
                        this.enemieMoving(this.moveLeft());
                    } else if (this.characterRight(this)) {
                        this.enemieMoving(this.moveRight());
                    }
                    this.checkEnemyDead();
                }
            }, 50);
        }, 7000);
    }


    /**
     * check if enemy is dead and play dead animation
     */
    checkEnemyDead() {
        if (this.isDead() && this.deadTimer > 0) {
            this.playAnimation(this.IMAGES_DYING);
            this.world.audio[5].play();
            this.deadTimer--;
        } else if (this.isDead() && this.deadTimer == 0) {
            this.world.audio[5].pause();
            this.gotKilled();
        }
    }


    /**
     * function for moving enemy left or right
     * attacking character when close enough to hit
     * @param {Function} move - moving function and animation to left or right
     */
    enemieMoving(move) {
        if (!this.isDead()) {
            if (!this.checkIfCharacterAttackable()) {
                this.speed = Math.floor(Math.random() * 5);
                move;
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.checkIfCharacterAttackable()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }
    }

    /**
     * function to check if character close enough to attack
     * @returns attackable or not attackable
     */
    checkIfCharacterAttackable() {
        if (this.characterLeft(this)) {
            if (this.world.character.x + this.world.character.width - 10 >= this.x) {
                return true;
            } else {
                return false;
            }
        } else if (this.characterRight(this)) {
            if (this.world.character.x + 10 <= this.x + this.width) {
                return true;
            } else {
                return false;
            }
        }
    }


    /**
     * executes dying animation 
     */
    gotKilled() {
        clearInterval(this.enemyLife);
        this.enemyLife = this.loadImage('img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_014.png');
        setTimeout(() => {
            this.speed = 0.03;
            this.acceleration = 0.01;
            this.applyGravity();
            clearInterval(this.enemyLife);
        }, 500);
    }
}