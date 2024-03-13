// Canvas & Context definition

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 1366;
canvas.height = 768;
document.body.appendChild(canvas);

//Image definitions

let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/RPG Background.png"

let zombieReady = false;
let zombieImage = new Image();
zombieImage.onload = function () {
    zombieReady = true;
}
zombieImage.src = "images/Zombie Sprite.png"

let brainReady = false;
let brainImage = new Image();
brainImage.onload = function() {
    brainReady = true;
}
brainImage.src = "images/brain_PNG36.png"

let shooterReady = false;
let shooterImage = new Image();
shooterImage.onload = function() {
    shooterReady = true;
}
shooterImage.src = "images/shooter.png"

// Game Objects

let zombie = {
    speed: 0,
    x: 0,
    y: 0
};

let brain = {
    x:0,
    y:0
};

let shooter = {
    speed: 0,
    x: 0,
    y: 0
};

// Functions

let main = function() {
    render();
    requestAnimationFrame(main);
};

let render = function() {
    if (bgReady) {
        context.drawImage(bgImage, 0, 0)
    }

    if (zombieReady) {
        context.drawImage(zombieImage, zombie.x, zombie.y);
    }

    if (brainReady) {
        context.drawImage(brainImage, brain.x, brain.y, brainImage.width/24, brainImage.height/24);
    }

    if (shooterReady) {
        context.drawImage(shooterImage, shooter.x, shooter.y, shooterImage.width/2, shooterImage.height/2);
    }
};

let reset = function() {
    zombie.x = canvas.width/4;
    zombie.y = canvas.height/4;

    brain.x = 32 + Math.random() * (canvas.width -96);
    brain.y = 32 + (Math.random() * (canvas.height - 96));
}

// Main

let then = Date.now();
reset();
main();
