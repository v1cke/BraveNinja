class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    level_end_x = 2900;
    daggers;

    constructor(backgroundObjects, clouds, enemies, endboss, daggers) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.daggers = daggers;
    }
}