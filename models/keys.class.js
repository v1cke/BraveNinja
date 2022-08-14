class Key extends MovableObject {
    width = 60;
    height = 60;
    world;

    constructor(world) {
        super().loadImage('img/key.png');
        this.x = Math.random() * 2500;
        this.y = 400;
        this.world = world;
    }

}