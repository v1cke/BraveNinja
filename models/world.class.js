class World {
    level = level1;
    character = new Character(this);
    throwableObject = new ThrowableObject(this);
    canvas;
    ctx;
    keyboard = new Keyboard(this);
    camera_x = 0;
    statusBar = new Statusbar();
    bossHealthBar = new BossHealthBar();
    treasureChest = new Treasure(this);
    daggerBar = new Daggerbar();
    throwableDagger = [];
    soundsOn = true;
    audio = [
        new Audio('audio/music.mp3'),
        new Audio('audio/ninja_die.mp3'),
        new Audio('audio/ninja_hurt.mp3'),
        new Audio('audio/ninja_jump.mp3'),
        new Audio('audio/ninja_running.mp3'),
        new Audio('audio/enemy_dying.mp3'),
        new Audio('audio/enemy_scream.mp3'),
        new Audio('audio/endboss_die.mp3'),
        new Audio('audio/sword_pickup.mp3'),
        new Audio('audio/sword_throw.mp3'),
        new Audio('audio/keys_pick.mp3'),
        new Audio('audio/youLose.mp3'),
        new Audio('audio/youwon.mp3'),
    ];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runGame();
        this.keyboard.btnPressEvents();
        this.addMinotaur();
        this.addEndboss();
    };


    changeSoundSettings() {
        if (!this.soundsOn && this.keyboard.M) {
            this.playSounds();
        } else if (this.soundsOn && this.keyboard.M)
            this.muteSounds();
    }


    playSounds() {
        this.audio.forEach((sound) => {
            let i = this.audio.indexOf(sound);
            this.audio[i].volume = 1;
        });
        this.audio[0].volume = 0.5;
        this.soundsOn = true;
    }

    muteSounds() {
        this.audio.forEach((sound) => {
            let i = this.audio.indexOf(sound);
            this.audio[i].volume = 0;
        });
        this.soundsOn = false;
    }



    setWorld() {
        this.throwableObject.world = this;
        this.audio[0].play();
        this.audio[0].volume = 0.5;
    }


    addMinotaur() {
        this.level.enemies.push(
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this)
        )
    }

    addEndboss() {
        this.level.endboss.push(
            new Endboss(this))
    }


    runGame() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkKeysAvailable();
            this.spliceEnemiesEndboss();
            this.changeSoundSettings();
        }, 75);
    }

    checkKeysAvailable() {
        if (this.level.enemies.length < 1 && this.level.endboss.length > 0 && this.character.amount_keys < 1 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        } else if (this.level.endboss.length < 1 && this.level.enemies.length > 0 && this.character.amount_keys < 1 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        } else if (this.level.enemies.length < 1 && this.level.endboss.length < 1 && this.character.amount_keys < 2 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        }
    }

    checkThrowObjects() {
        if (this.keyboard.SPACE && !this.character.isDead()) {
            if (this.character.amount_daggers > 0) {
                this.character.amount_daggers--;
                this.daggerBar.setAmountDaggers(this.character.amount_daggers);
                let dagger = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDirection, this);
                this.throwableDagger.push(dagger);
            }
        }
    }


    spliceEnemiesEndboss() {
        this.level.endboss.forEach((endboss) => {
            let i = this.level.endboss.indexOf(endboss);
            if (this.level.endboss[i].y > 700) {
                this.level.endboss.splice(i, 1)
            }
        })
        this.level.enemies.forEach((enemy) => {
            let y = this.level.enemies.indexOf(enemy);
            if (this.level.enemies[y].y > 600) {
                this.level.enemies.splice(y, 1)
            }
        })
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.daggers);
        this.addObjectsToMap(this.level.keys);
        this.addToMap(this.treasureChest);
        this.ctx.translate(-this.camera_x, 0); //move camera back for statusbar not move with background
        this.addToMap(this.statusBar);
        this.addToMap(this.bossHealthBar);
        this.addToMap(this.daggerBar);
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableDagger);
        this.ctx.translate(-this.camera_x, 0);

        // draw wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
