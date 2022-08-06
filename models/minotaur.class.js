class Minotaur extends MovableObject {

    world;
    enemy_dying = new Audio('audio/enemy_dying.mp3');
    enemyDead = false;
    deadTimer = 13;
    attack = false;
    characterAttackable = false;
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
        super().loadImage('img/minotaur/Minotaur_01/Idle/Minotaur_01_Idle_000.png');
        this.x = 350 + Math.random() * 2000;  // math.random immer zwischen 0 und 1 (ohne 1), also in diesem Fall alles zwischen 0 und ca. 499
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DYING);
        this.loadImages(this.IMAGES_ATTACK);
        this.world = world;
        this.speed = 1 + Math.random() * 0.4;
        this.checkPositionCharacter();
        this.animate();
    }

    animate() {
        this.enemyLife = setInterval(() => {
            if (!this.enemyDead && !this.attack && this.x >= this.world.character.x) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else if (!this.enemyDead && this.attack && this.x >= this.world.character.x) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (!this.enemyDead && !this.attack && this.x <= this.world.character.x) {
                this.moveRight();
                this.playAnimation(this.IMAGES_WALKING)
            } else if (!this.enemyDead && this.attack && this.x <= this.world.character.x) {
                this.moveRight();
                this.playAnimation(this.IMAGES_ATTACK)
            } else if (this.enemyDead && this.deadTimer > 0) {
                this.playAnimation(this.IMAGES_DYING);
                this.enemy_dying.play();
                this.deadTimer--;
            } else if (this.enemyDead && this.deadTimer == 0) {
                this.enemy_dying.pause();
                this.gotKilled();
            }
        }, 50);
    }


    checkPositionCharacter() {
        setInterval(() => {
            this.checkIfCharacterAttackable();
            if (!this.enemyDead && this.characterAttackable) {
                this.attack = true;
            } else { this.attack = false }
        }, 100);
    }

    checkIfCharacterAttackable() {
        if (this.x - this.world.character.x < 150 &&
            this.x > this.world.character.x &&
            !this.world.character.isDead()) {
            this.characterAttackable = true;
        } else if (this.world.character.x - this.x < 150 &&
            this.world.character.x > this.x &&
            !this.world.character.isDead()) {
            this.characterAttackable = true;
        } else if (this.world.character.isDead()) {
            clearInterval(this.enemyLife);
        } else {
            this.characterAttackable = false;
        }
    }

    dyingEnemy() {
        this.enemyDead = true;
    }


    gotKilled() {
        // loadImage('img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_014.png')
        this.enemyLife = this.loadImage('img/minotaur/Minotaur_01/Dying/Minotaur_01_Dying_014.png');
        setTimeout(() => {
            this.speed = 0.03;
            this.acceleration = 0.01;
            this.applyGravity();
            clearInterval(this.enemyLife);
        }, 500);
    }
}