import Obstacle from "./obstacle.js";
import ObstacleAnime from "./obstacleAnime.js";
import { rectanglesIntersect } from "./collisions.js";

let canvas, ctx;
// tableau qui contient les obstacles
let obstacles = [];
// position souris
let mousePos = {}

// ici première manière de définir des objets, pas besoin de new ni de classes
// utile pour des objets "uniques" (singleton)
let player = {
    x: 10,
    y: 10,
    width: 10,
    height: 10,
    vitesse: 5,
    vx: 0,
    vy: 0,
    draw: function (ctx) {
        // bonne pratique : quand on dessine, on sauvegarde le contexte
        ctx.save();

        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);

        ctx.restore();
    },
    update: function () {
        this.x += this.vx;
        this.y += this.vy;
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

    // définir les écouteurs
    let button = document.querySelector("#myButton");
    button.addEventListener("click", (evt) => {
        console.log("click sur le bouton");
    });

    definirTouchesClavier();

    // on créée les obstacles
    creeObstacles();

    // On démarre la boucle d'animation
    requestAnimationFrame(mainloop);
}

function definirTouchesClavier() {
    window.onkeydown = (evt) => {
        //console.log("touche pressée : " + evt.key);

        switch (evt.key) {
            case "ArrowUp":
                player.vy = -player.vitesse;
                break;
            case "ArrowDown":
                player.vy = player.vitesse;
                //player.y += 10;
                break;
            case "ArrowLeft":
                player.vx = -player.vitesse;
                //player.x -= 10;
                break;
            case "ArrowRight":
                player.vx = player.vitesse;
                //player.x += 10;
                break;
        }
    }
    window.onkeyup = (evt) => {
        console.log("touche pressée : " + evt.key);

        switch (evt.key) {
            case "ArrowUp":
                player.vy = 0;
                break;
            case "ArrowDown":
                player.vy = 0;
                //player.y += 10;
                break;
            case "ArrowLeft":
                player.vx = 0;
                //player.x -= 10;
                break;
            case "ArrowRight":
                player.vx = 0;
                //player.x += 10;
                break;
        }
    }

    window.onmousemove = (evt) => {
        // get canvas x,y mouse position
        let rect = canvas.getBoundingClientRect();
        let x = evt.clientX - rect.left;
        let y = evt.clientY - rect.top;
        //console.log("mouse move : " + x + ", " + y);
        mousePos.x = x;
        mousePos.y = y;

        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function mainloop() {
    // boucle d'animation
    // 1 on efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2 on dessine les objets
    player.draw(ctx)
    drawObstacles();

    // 3 on met à jour les objets
    player.update();
    deplaceLesObstacles();

    // 4 - on teste les collisions
    obstacles.forEach(o => {
        if (rectanglesIntersect(player, o)) {
            console.log("collision");
        }
    });

    // Finalement : on demande au navigateur de rappeler mainloop
    // L'API s'appelle requestAnimationFrame, et rappellera mainloop dans 16ms
    // soit 1/60ème de seconde
    requestAnimationFrame(mainloop);
}

function deplaceLesObstacles() {
    // on parcourt le tableau d'obstacles
    obstacles.forEach(o => {
        if (o instanceof ObstacleAnime)
            o.update();
    });
}

function drawObstacles() {
    obstacles.forEach(o => {
        o.draw(ctx);
    });

    /*
    for(let i = 0; i < obstacles.length; i++) {
        obstacles[i].draw(ctx);
    }
    */
}

function creeObstacles() {
    for (let i = 0; i < 10; i++) {
        let o = new ObstacleAnime(canvas.width, canvas.height, 2);
        obstacles.push(o);
    }

    for (let i = 0; i < 10; i++) {
        let o = new Obstacle(canvas.width, canvas.height);
        obstacles.push(o);
    }
}