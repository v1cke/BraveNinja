class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    level_end_x = 2950;
    daggers;
    keys;

    constructor(backgroundObjects, clouds, enemies, endboss, daggers, keys) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.daggers = daggers;
        this.keys = keys;
    }
}