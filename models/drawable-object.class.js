class DrawableObject {
    amount_daggers = 0;
    amount_keys = 0;
    x = 100;
    y = 360;
    img;
    width = 100;
    height = 100;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    // drawFrame(ctx) {
    //     if(this instanceof Endboss) {
    //     ctx.beginPath();
    //     ctx.lineWidth = '2';
    //     ctx.strokeStyle = 'blue'
    //     ctx.rect(this.x, this.y, this.width, this.height);
    //     ctx.stroke();
    // }
    // }

}