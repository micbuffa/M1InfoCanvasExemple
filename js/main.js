import Obstacle from "./obstacle.js";

let canvas, ctx;

// ici première manière de définir des objets, pas besoin de new ni de classes
// utile pour des objets "uniques" (singleton)
let player = {
    x: 10,
    y: 10,
    width: 10,
    height: 10,
    draw : function (ctx) {
        // bonne pratique : quand on dessine, on sauvegarde le contexte
        ctx.save();

        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    }
}

// bonne pratique : on définit une fonction appelée quand la page index.html
// et toutes ses ressources sont chargées

window.onload = init; // la fonction init sera appelée par le navigateur quand la page sera chargée

function init() {
    // ici on a accès au DOM !!!! Tous les éléments HTML sont définis
    console.log("Page chargée, j'ai accès à tous les éléments de la page");

    // On accède au canvas dans le DOM, via DOM API ou Selector API
    // let canvas = document.getElementById("canvas");
    // query selector utilise la syntaxe des selecteurs CSS
    canvas = document.querySelector("#myCanvas");

    // Pour dessiner : on utilise le contexte 2D du canvas
    ctx = canvas.getContext("2d");

    // définir les écouteur
    let button = document.querySelector("#myButton");
    button.addEventListener("click", (evt) =>{
        console.log("click sur le bouton");
    });

    // On démarre la boucle d'animation
    requestAnimationFrame(mainloop);
}

function mainloop() {
    // boucle d'animation
    // 1 on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 on dessine les objets
      player.draw(ctx)
      drawObstacles();

       // Finalement : on demande au navigateur de rappeler mainloop
       // L'API s'appelle requestAnimationFrame, et rappellera mainloop dans 16ms
       // soit 1/60ème de seconde
       requestAnimationFrame(mainloop);
}



function drawObstacles() {
    // bonne pratique : quand on dessine, on sauvegarde le contexte
    ctx.save();

    ctx.fillStyle = "blue";
    ctx.fillRect(200, 200, 100, 100);

    ctx.restore();
}

function creeObstacles() {

}