class Character extends MovableObject {
    width = 60;
    height = 120
    y = 0;
    world;
    speed = 9;
    characterMovement;
    ninja_running = new Audio('audio/ninja_running.mp3');
    ninja_jump = new Audio('audio/ninja_jump.mp3');
    ninja_hurt = new Audio('audio/ninja_hurt.mp3');
    ninja_die = new Audio('audio/ninja_die.mp3');
    looseGame = new Audio('audio/youLose.mp3');


    IMAGES_IDLE = [
        'img/ninja/Idle__000.png',
        'img/ninja/Idle__001.png',
        'img/ninja/Idle__002.png',
        'img/ninja/Idle__003.png',
        'img/ninja/Idle__004.png',
        'img/ninja/Idle__005.png',
        'img/ninja/Idle__006.png',
        'img/ninja/Idle__007.png',
        'img/ninja/Idle__008.png',
        'img/ninja/Idle__009.png',
    ];

    IMAGES_WALKING = [
        'img/ninja/Run__000.png',
        'img/ninja/Run__001.png',
        'img/ninja/Run__002.png',
        'img/ninja/Run__003.png',
        'img/ninja/Run__004.png',
        'img/ninja/Run__005.png',
        'img/ninja/Run__006.png',
        'img/ninja/Run__007.png',
        'img/ninja/Run__008.png',
        'img/ninja/Run__009.png',
    ];

    IMAGES_JUMP = [
        'img/ninja/Jump__000.png',
        'img/ninja/Jump__001.png',
        'img/ninja/Jump__002.png',
        'img/ninja/Jump__003.png',
        'img/ninja/Jump__004.png',
        'img/ninja/Jump__005.png',
        'img/ninja/Jump__006.png',
        'img/ninja/Jump__007.png',
        'img/ninja/Jump__008.png',
        'img/ninja/Jump__009.png',
    ];

    IMAGES_DEAD = [
        'img/ninja/Dead__000.png',
        'img/ninja/Dead__001.png',
        'img/ninja/Dead__002.png',
        'img/ninja/Dead__003.png',
        'img/ninja/Dead__004.png',
        'img/ninja/Dead__005.png',
        'img/ninja/Dead__006.png',
        'img/ninja/Dead__007.png',
        'img/ninja/Dead__008.png',
        'img/ninja/Dead__009.png',
    ];


    constructor(world) {
        super().loadImage('img/ninja/Idle__000.png');
        this.world = world;
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }


    /**
     * This function executes movement with Running animation to side when pushing LEFT or RIGHT on Keyboard aslong, as character is not at the end of the level
     * Also executes jumping with Jumping animation and jumping sound when pushing UP on Keyboard
     * when moving right or left a 'moving-sound' is played
     */
    animate() {
        setInterval(() => {
            this.ninja_running.pause();
            this.checkRunRight();
            this.checkRunLeft();
            this.world.camera_x = - this.x + 250;
            if (this.y > 345) {
                this.y = 345
            }
        }, 20);

        this.characterMovement = setInterval(() => {
            this.checkCollisions();
            if (!this.isDead()) {
                this.playingCharacter();
            } else if (this.isDead()) {
                this.characterKilled();
            }
        }, 75);
    }


    characterKilled() {
        this.playAnimation(this.IMAGES_DEAD);
        // this.ninja_die.play();
        this.loadImage('img/ninja/Dead__009.png');
        clearInterval(this.characterMovement);
        setTimeout(() => {
            this.looseGame.play();
            document.getElementById('GameOverScreen').style.display = "flex";
            document.getElementById('canvas').style.display = "none";
        }, 5000);
    }


    playingCharacter() {
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_DEAD);
            // this.ninja_hurt.play();
        } else if (!this.world.keyboard.RIGHT || !this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_IDLE);
        }
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMP);
        } else {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.world.keyboard.UP && !this.isAboveGround() && !this.isHurt() && !this.isDead()) {
                // this.ninja_jump.play();
                this.jump();
            }
        }
    }


    checkRunRight() {
        if (this.world.keyboard.RIGHT &&
            this.x < level1.level_end_x &&
            !this.isDead()) {
            this.moveRight();
            // this.ninja_running.play();
        }
    }

    checkRunLeft() {
        if (this.world.keyboard.LEFT &&
            this.x > -500 &&
            !this.isDead()) {
            this.moveLeft();
            // this.ninja_running.play();
        }
    }

    checkCollisions() {
        this.checkCollisionEnemies();
        this.checkCollisionEndboss();
        this.checkPickDaggers();
    }


    checkPickDaggers() {
        this.world.level.daggers.forEach((dagger) => {
            let i = this.world.level.daggers.indexOf(dagger);
            if (this.isColliding(dagger)) {
                this.pickDaggers(dagger);
                this.removeDagger(dagger, i);
                this.world.daggerBar.setAmountDaggers(this.amount_daggers);
            }
        })
    }

    removeDagger(dagger, i) {
        this.world.level.daggers.splice(i, 1);
    }

    checkCollisionEndboss() {
        this.world.level.endboss.forEach((endboss) => {
            if (this.isColliding(endboss) && !endboss.isDead() && !endboss.objectHurt) {
                this.hit(endboss);
                this.world.statusBar.setPercentage(this.energy);
            }
        })
    }

    checkCollisionEnemies() {
        this.world.level.enemies.forEach((enemy) => {
            let i = world.level.enemies.indexOf(enemy);
            if (this.isColliding(enemy) && !enemy.isDead()) {
                if (this.jumpsOnTop(enemy) && this.speedY < 0 && this.isAboveGround()) {
                    enemy.energy = 0;
                } else {
                    this.hit(enemy);
                    this.world.statusBar.setPercentage(this.energy);
                }
            }
        })
    }

}