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
    
    
    /**
     * function to execute 4 functions in interval to run the game
     */
    runGame() {
        setInterval(() => {
            this.checkThrowObjects();
            this.checkKeysAvailable();
            this.spliceEnemiesEndboss();
            this.changeSoundSettings();
        }, 75);
    }
    
    
    /**
     * check if to throw dagger after SPACE or throwing button is triggered
     */
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


    /**
     * check if to enable keys
     */
    checkKeysAvailable() {
        if (this.level.enemies.length < 1 && this.level.endboss.length > 0 && this.character.amount_keys < 1 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        } else if (this.level.endboss.length < 1 && this.level.enemies.length > 0 && this.character.amount_keys < 1 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        } else if (this.level.enemies.length < 1 && this.level.endboss.length < 1 && this.character.amount_keys < 2 && this.level.keys.length < 1) {
            this.level.keys.push(new Key(this));
        }
    }


    /**
     * function to splice killed enemies off their arrays
     */
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
    
    /**
     * set world to class throwableObject
     * start gamemusic on volume 50%
     */
    setWorld() {
        this.throwableObject.world = this;
        setTimeout(() => {
            this.audio[0].play();
            this.audio[0].volume = 0.5;
        }, 5000);
        // document.getElementById('volume').style.display = "none";
    }


    /**
     * function enable / disable sounds in game
     */
    changeSoundSettings() {
        if (this.soundsOn) {
            if (this.keyboard.M) {
                this.soundsOn = false;
                this.muteSounds();
                this.keyboard.M = false;
            }
        } else if (!this.soundsOn) {
            if (this.keyboard.M) {
                this.soundsOn = true;
                this.playSounds();
                this.keyboard.M = false;
            }
        }
    }


    /**
     * enable sounds
     */
    playSounds() {
        this.audio.forEach((sound) => {
            let i = this.audio.indexOf(sound);
            this.audio[i].volume = 1;
            this.audio[0].volume = 0.5;
        })
        document.getElementById('volume').style.display = "none";
        document.getElementById('mute').style.display = "block";
    }
    

    /**
     * mute sounds
     */
    muteSounds() {
        this.audio.forEach((sound) => {
            let i = this.audio.indexOf(sound);
            this.audio[i].volume = 0;
        });
        document.getElementById('mute').style.display = "none";
        document.getElementById('volume').style.display = "block";
    }


    /**
     * add enemies of class Minotaur to level
     */
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

    /**
     * add endboss of class Endboss to level
     */
    addEndboss() {
        this.level.endboss.push(
            new Endboss(this))
    }




    /**
     * draw whole canvas
     */
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

    /**
     * draw each object from an array
     * 
     * @param {array} objects - objects that occur multiple times in the world
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * object drawn in the world and turn it over
     * 
     * @param {class} mo - class to draw in the world
     */
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

    /**
     * function to turn arround image by 180 degrees
     * @param {class} mo class of object 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * function to turn image back by 180 degrees
     * @param {class} mo class of object 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
