class Dagger extends MovableObject {
    width = 60;
    height = 60;

    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = (x-200) + Math.random() * 190; // math.random immer zwischen 0 und 1 (ohne 1), also in diesem Fall alles zwischen 0 und ca. 1999
        this.y = 80 + Math.random() * 150; // math.random immer zwischen 0 und 1 (ohne 1), also in diesem Fall alles zwischen 0 und ca. 199
    }

}