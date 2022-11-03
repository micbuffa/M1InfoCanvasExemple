import Obstacle from "./obstacle.js";

export default class ObstacleAnime extends Obstacle {
    constructor(canvasWidth, canvasHeight, vitesse) {
        super(canvasWidth, canvasHeight);
        this.canvasWidth = canvasWidth;
        
        this.vitesse = vitesse;
    }

    update() {
        if(((this.x+this.width) > this.canvasWidth) || (this.x < 0)) {
            this.vitesse = -this.vitesse;
        }

        this.x += this.vitesse;
    }
}