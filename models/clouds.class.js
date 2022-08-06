class Cloud extends MovableObject {
    width = 780;
    height = 480;
    speed = 2;

    constructor(imagePath, x, y){
        super().loadImage(imagePath);
        this.y = y;
        this.x = Math.random() * 2500;
        this.animate();
    }

    animate() {
        setInterval(()=>{
            this.x -= 0.5;
        }, 3000/60)
    }
    
}