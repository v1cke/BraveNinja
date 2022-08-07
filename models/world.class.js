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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.keyboard.btnPressEvents();
        this.addMinotaur();
        this.addEndboss();
    };

    setWorld() {
        this.throwableObject.world = this;
    }


    addMinotaur(){
        this.level.enemies.push(
            new Minotaur(this), 
            new Minotaur(this), 
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this),
            new Minotaur(this)
            )
    }
    
    addEndboss(){
        this.level.endboss.push(
            new Endboss(this))
    }


    run() {
        setInterval(() => {
            this.checkThrowObjects();
            this.spliceEnemiesEndboss();
        }, 100);
    }


    checkThrowObjects() {
        if (this.keyboard.SPACE) {
            if (this.character.amount_daggers > 0) {
                this.character.amount_daggers--;
                this.daggerBar.setAmountDaggers(this.character.amount_daggers);
                let dagger = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDirection, this);
                this.throwableDagger.push(dagger);
            }
        }
    }


    spliceEnemiesEndboss(){
        this.level.endboss.forEach((endboss) => {
            let i = this.level.endboss.indexOf(endboss);
            if (this.level.endboss[i].y > 700) {
                this.level.endboss.splice(i, 1)
            }
        })
        this.level.enemies.forEach((enemy) => {
            let y = this.level.enemies.indexOf(enemy);
            if (this.level.enemies[y].y > 600) {
                this.level.enemies.splice(y, 6)
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
        mo.drawFrame(this.ctx);
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
