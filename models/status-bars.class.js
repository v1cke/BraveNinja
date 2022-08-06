class Statusbar extends DrawableObject {
    
    IMAGES_HEALTH = [
        'img/barelements/bar_health/0.png',
        'img/barelements/bar_health/20.png',
        'img/barelements/bar_health/40.png',
        'img/barelements/bar_health/60.png',
        'img/barelements/bar_health/80.png',
        'img/barelements/bar_health/100.png',
    ];

    
    percentage = 100;


    constructor(){
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 1;
        this.width = 200;
        this.height = 60
        this.setPercentage(100);
    }


    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    resolveImageIndex(){
        if(this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }

}