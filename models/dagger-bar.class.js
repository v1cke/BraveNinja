class Daggerbar extends DrawableObject {
    
    IMAGES_DAGGERS = [
        'img/barelements/1_statusbar/1_statusbar_daggers/0.png',
        'img/barelements/1_statusbar/1_statusbar_daggers/20.png',
        'img/barelements/1_statusbar/1_statusbar_daggers/40.png',
        'img/barelements/1_statusbar/1_statusbar_daggers/60.png',
        'img/barelements/1_statusbar/1_statusbar_daggers/80.png',
        'img/barelements/1_statusbar/1_statusbar_daggers/100.png',
    ];
     
    constructor(){
        super();
        this.loadImages(this.IMAGES_DAGGERS);
        this.x = 20;
        this.y = 45;
        this.width = 200;
        this.height = 55;
        this.setAmountDaggers(0);
    }


    setAmountDaggers(amount_daggers){
        this.amount_daggers = amount_daggers;
        let path = this.IMAGES_DAGGERS[this.resolveImageDaggers()];
        this.img = this.imageCache[path];
    }

    resolveImageDaggers(){
        if(this.amount_daggers < 1) {
            return 0;
        } else if (this.amount_daggers < 3) {
            return 1;
        } else if (this.amount_daggers < 5) {
            return 2;
        } else if (this.amount_daggers < 7) {
            return 3;
        } else if (this.amount_daggers < 8) {
            return 4;
        } else {
            return 5;
        }
    }

}