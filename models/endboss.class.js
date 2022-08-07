class Endboss extends MovableObject {
    x = 2500;
    y = 65;
    speed = 4;
    currentImage = 0;
    width = 300;
    height = 400;
    EndbossScream = new Audio('audio/enemy_scream.mp3');
    EndbossDying = new Audio('audio/endboss_die.mp3');
    world;
    energy = 100;
    characterAttackable = false;
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


    animate() {
        this.animationTimer = setInterval(() => {
            if (!this.isDead() && !this.objectHurt && !this.characterAttackable && (this.x + this.width) > this.world.character.x) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else if (!this.isDead() && !this.objectHurt && this.characterAttackable && (this.x + this.width) > this.world.character.x) {
                this.speed = 7;
                this.moveLeft();
                this.playAnimation(this.IMAGES_ATTACKING);
                setTimeout(() => {
                    this.EndbossScream.play();
                }, 3000);
            } else if (!this.isDead() && !this.objectHurt && !this.characterAttackable && this.x < this.world.character.x) {
                !this.otherDirection;
                this.moveRight();
                this.playAnimation(this.IMAGES_IDLE)
            } else if (!this.isDead() && !this.objectHurt && this.characterAttackable && this.x < this.world.character.x) {
                this.speed = 7;
                this.moveRight();
                this.playAnimation(this.IMAGES_ATTACKING);
                setTimeout(() => {
                    this.EndbossScream.play();
                }, 3000);
            } else if (this.objectHurt) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isDead() && this.deadTimer > 0) {
                this.playAnimation(this.IMAGES_DYING);
                this.EndbossDying.play();
                this.deadTimer--;
            } else if (this.isDead() && this.deadTimer == 0) {
                this.gotKilled();
            } else {
                if (this.world.character.x < 1600) {
                    this.speed = 0;
                    this.playAnimation(this.IMAGES_IDLE)
                } else {
                    this.speed = 3;
                }
            }
        }, 100);
    }


    checkIfCharacterAttackable() {
        setInterval(() => {
            if (this.x - this.world.character.x < 200 && !this.world.character.isDead()) {
                this.characterAttackable = true;
            } else if (this.world.character.isDead()) {
                clearInterval(this.animationTimer);
            } else {
                this.characterAttackable = false;
            }
        }, 50);
    }


    gotKilled() {
        this.loadImage('img/troll/Troll_01_1_DIE_009.png');
        setTimeout(() => {
            this.speed = 0.01;
            this.acceleration = 0.01;
            this.applyGravity();
        }, 3000);
        clearInterval(this.animationTimer);
    }


}