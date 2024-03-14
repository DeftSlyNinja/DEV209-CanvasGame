// Canvas & Context definition -------------------------------------

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 1366;
canvas.height = 768;
document.body.appendChild(canvas);

// Sprite management ------------------------------------------------

let counter = 0;
let rows = 4;
let cols = 4;

let trackRight = 1;
let trackLeft = 2;
let trackUp = 0;
let trackDown = 3;

let spriteWidth = 256;
let spriteHeight = 255;
let width = spriteWidth / cols; 
let height = spriteHeight / rows; 

let curXFrame = 0;
let frameCount = 4;

let srcX = 0;  
let srcY = 0;

let left = false;
let right = false;
let up = false;
let down = false;

//Image & Sound definitions ------------------------------------------------

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

let crunch = "sounds/crunch.mp3";
let shotgun = "sounds/shotgun.mp3";
let soundEfx = document.getElementById("soundEfx");

// Game Objects ----------------------------------------------------

let zombie = {
    speed: 250,
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

let brainsEaten = 0;

// Event Listeners / Movement --------------------------------------

let keysDown = {};

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

let update = function (modifier) {

    left = false;
    right = false;
    up = false;
    down = false;

    if (38 in keysDown && zombie.y > 64) { // Player holding up
        zombie.y -= zombie.speed * modifier;
        up = true;
    }
    if (40 in keysDown && zombie.y < canvas.height - 128) { // Player holding down
        zombie.y += zombie.speed * modifier;
        down = true;
    }
    if (37 in keysDown && zombie.x > 64) { // Player holding left
        zombie.x -= zombie.speed * modifier;
        left = true;
    }
    if (39 in keysDown && zombie.x < canvas.width - 128) { // Player holding right
        zombie.x += zombie.speed * modifier;
        right = true;
    }

    if (counter == 12) {
        curXFrame = ++curXFrame % frameCount; 
        counter = 0;
    } else {
        counter++;
    }

    srcX = curXFrame * width;

    if (left) {
        srcY = trackLeft * height;
    }

    if (right) {
        srcY = trackRight * height;
    }

    if (up) {
        srcY = trackUp * height;
    }

    if (down) {
        srcY = trackDown * height;
    }

    if (left == false && right == false && up == false && down == false) {
        srcX = 0 * width;
        srcY = 0 * height;
    }

    if (
        zombie.x <= (brain.x + 24)
        && brain.x <= (zombie.x + 24)
        && zombie.y <= (brain.y + 24)
        && brain.y <= (zombie.y + 48)
    ) {
        ++brainsEaten;
        soundEfx.src = crunch;
        soundEfx.play();       
        reset();  
    }

};

// Functions -------------------------------------------------------

let main = function() {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

let render = function() {
    if (bgReady) {
        context.drawImage(bgImage, 0, 0)
    }

    if (brainReady) {
        context.drawImage(brainImage, brain.x, brain.y, brainImage.width/24, brainImage.height/24);
    }

    // if (shooterReady) {
    //     context.drawImage(shooterImage, shooter.x, shooter.y, shooterImage.width/2, shooterImage.height/2);
    // }

    if (zombieReady) {
         context.drawImage(zombieImage, srcX, srcY, width, height, zombie.x, zombie.y, width, height);
    }

    // Score

    context.fillStyle = "rgb(250, 250, 250)";
    context.font = "24px Helvetica";
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillText("Brains Eaten: " + brainsEaten, 32, 32);

};

let reset = function() {
    zombie.x = canvas.width/2;
    zombie.y = canvas.height/2;

    brain.x = 64 + Math.random() * (canvas.width - 192);
    brain.y = 64 + (Math.random() * (canvas.height - 192));
}

// Main Loop -------------------------------------------------------

let then = Date.now();
reset();
main();
