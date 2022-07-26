class Cloud extends MovableObject {
    width = 780;
    height = 480;
    speed = 2;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.y = y;
        this.x = x;
        this.animate();
    }

    /**
     * animates clouds move to left
     */
    animate() {
        setInterval(()=>{
            this.x -= 0.5;
        }, 50)
    }
    
}