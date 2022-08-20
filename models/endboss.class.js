class Endboss extends MovableObject {
    x = 2700;
    y = 55;
    speed = 6;
    currentImage = 0;
    width = 300;
    height = 400;
    world;
    endbossMove = false;
    lastHit;
    deadTimer = 8;


    IMAGES_IDLE = [
        'img/troll/Troll_01_1_IDLE_000.png',
        'img/troll/Troll_01_1_IDLE_001.png',
        'img/troll/Troll_01_1_IDLE_002.png',
        'img/troll/Troll_01_1_IDLE_003.png',
        'img/troll/Troll_01_1_IDLE_004.png',
        'img/troll/Troll_01_1_IDLE_005.png',
        'img/troll/Troll_01_1_IDLE_006.png',
        'img/troll/Troll_01_1_IDLE_007.png',
        'img/troll/Troll_01_1_IDLE_008.png',
        'img/troll/Troll_01_1_IDLE_009.png',
    ];

    IMAGES_HURT = [
        'img/troll/Troll_01_1_HURT_000.png',
        'img/troll/Troll_01_1_HURT_001.png',
        'img/troll/Troll_01_1_HURT_002.png',
        'img/troll/Troll_01_1_HURT_003.png',
        'img/troll/Troll_01_1_HURT_004.png',
        'img/troll/Troll_01_1_HURT_005.png',
        'img/troll/Troll_01_1_HURT_006.png',
        'img/troll/Troll_01_1_HURT_007.png',
        'img/troll/Troll_01_1_HURT_008.png',
        'img/troll/Troll_01_1_HURT_009.png',
    ];

    IMAGES_WALKING = [
        'img/troll/Troll_01_1_WALK_000.png',
        'img/troll/Troll_01_1_WALK_001.png',
        'img/troll/Troll_01_1_WALK_002.png',
        'img/troll/Troll_01_1_WALK_003.png',
        'img/troll/Troll_01_1_WALK_004.png',
        'img/troll/Troll_01_1_WALK_005.png',
        'img/troll/Troll_01_1_WALK_006.png',
        'img/troll/Troll_01_1_WALK_007.png',
        'img/troll/Troll_01_1_WALK_008.png',
        'img/troll/Troll_01_1_WALK_009.png',
    ];

    IMAGES_DYING = [
        'img/troll/Troll_01_1_DIE_000.png',
        'img/troll/Troll_01_1_DIE_001.png',
        'img/troll/Troll_01_1_DIE_002.png',
        'img/troll/Troll_01_1_DIE_003.png',
        'img/troll/Troll_01_1_DIE_004.png',
        'img/troll/Troll_01_1_DIE_005.png',
        'img/troll/Troll_01_1_DIE_006.png',
        'img/troll/Troll_01_1_DIE_007.png',
        'img/troll/Troll_01_1_DIE_008.png',
        'img/troll/Troll_01_1_DIE_009.png',
    ];

    IMAGES_ATTACKING = [
        'img/troll/Troll_01_1_ATTACK_000.png',
        'img/troll/Troll_01_1_ATTACK_001.png',
        'img/troll/Troll_01_1_ATTACK_002.png',
        'img/troll/Troll_01_1_ATTACK_003.png',
        'img/troll/Troll_01_1_ATTACK_004.png',
        'img/troll/Troll_01_1_ATTACK_005.png',
        'img/troll/Troll_01_1_ATTACK_006.png',
        'img/troll/Troll_01_1_ATTACK_007.png',
        'img/troll/Troll_01_1_ATTACK_008.png',
        'img/troll/Troll_01_1_ATTACK_009.png',
    ];

   
    constructor(world) {
        super()
        this.loadImage('img/troll/Troll_01_1_WALK_000.png');
        this.world = world;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.checkIfCharacterAttackable();
        this.animate();
    }


    /**
     * executes idle animation when character is dead or not closer than 500px to endboss
     * executes hurting animation when hit by dagger
     * executes dying animation when energy drops to 0
     * executes moving left or right (folowing character) when movement triggered by character
     */
    animate() {
        this.animationTimer = setInterval(() => {
            if (this.world.character.isDead()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
            if (!this.world.character.isDead()) {
                if (this.x - this.world.character.x < 500) {
                    this.endbossMove = true;
                }
                if (this.objectHurt) {
                    this.world.audio[6].play();
                    this.playAnimation(this.IMAGES_HURT);
                } else if (this.isDead() && this.deadTimer > 0) {
                    this.playAnimation(this.IMAGES_DYING);
                    this.world.audio[7].play();
                    this.deadTimer--;
                } else if (this.isDead() && this.deadTimer == 0) {
                    this.gotKilled();
                } else if (this.characterLeft(this)) {
                    this.endbossMoving(this.moveLeft());
                } else if (this.characterRight(this)) {
                    this.endbossMoving(this.moveRight());
                }
            }
        }, 100);
    }


    /**
     * function for moving endboss left or right
     * attacking character when close enough to hit
     * @param {Function} move - moving function and animation to left or right
     */
    endbossMoving(move) {
        if (!this.isDead() && !this.objectHurt &&
         this.endbossMove) {
            if (!this.checkIfCharacterAttackable()) {
                this.speed = 6;
                move;
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.checkIfCharacterAttackable()) {
                this.speed = 0;
                this.playAnimation(this.IMAGES_ATTACKING);
                this.world.audio[6].play();
                setTimeout(() => {
                    this.world.audio[6].pause();
                }, 1500);
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
        this.animationTimer = this.loadImage('img/troll/Troll_01_1_DIE_009.png');
        setTimeout(() => {
            this.speed = 0.1;
            this.acceleration = 0.01;
            this.applyGravity();
        }, 2500);
        clearInterval(this.animationTimer);
    }


}