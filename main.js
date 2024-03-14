// Canvas & Context definition -------------------------------------

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");
canvas.width = 1366;
canvas.height = 768;
document.getElementById("gameContainer").appendChild(canvas);
let lose = false;
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
brainImage.onload = function () {
    brainReady = true;
}
brainImage.src = "images/brain_PNG36.png"

let shooterReady = false;
let shooterImage = new Image();
shooterImage.onload = function () {
    shooterReady = true;
}
shooterImage.src = "images/shooter.png"

let shooter2Ready = false;
let shooter2Image = new Image();
shooter2Image.onload = function () {
    shooter2Ready = true;
}
shooter2Image.src = "images/shooter-down.png"

let shooter3Ready = false;
let shooter3Image = new Image();
shooter3Image.onload = function () {
    shooter3Ready = true;
}
shooter3Image.src = "images/shooter-left.png"

let shooter4Ready = false;
let shooter4Image = new Image();
shooter4Image.onload = function () {
    shooter4Ready = true;
}
shooter4Image.src = "images/shooter-up.png"

let crunch = "sounds/crunch.mp3";
let shotgun = "sounds/shotgun.mp3";
let soundEfx = document.getElementById("soundEfx");

// Game Objects ----------------------------------------------------

let zombie = {
    speed: 250,
    x: canvas.width / 2,
    y: canvas.height / 2
};

let brain = {
    x: 0,
    y: 0
};

let shooter = {
    speed: 0,
    x: 0,
    y: 0
};

let shooter2 = {
    speed: 0,
    x: 0,
    y:0
}

let shooter3 = {
    speed: 0,
    x: 0,
    y:0
}

let shooter4 = {
    speed: 0,
    x: 0,
    y:0
}

let brainsEaten = 0;

// Event Listeners / Movement --------------------------------------

let keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
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

    // Zombie / Shooter Collision

    if (
        zombie.x <= (shooter.x + 80)
        && shooter.x <= (zombie.x + 40)
        && zombie.y <= (shooter.y + 40)
        && shooter.y <= (zombie.y + 40)
    ) {
        soundEfx.src = shotgun;
        soundEfx.play();
        gameOver();
    }

    if (
        zombie.x <= (shooter2.x + 80)
        && shooter2.x <= (zombie.x + 40)
        && zombie.y <= (shooter2.y + 40)
        && shooter2.y <= (zombie.y + 40)
    ) {
        soundEfx.src = shotgun;
        soundEfx.play();
        gameOver();
    }

    if (
        zombie.x <= (shooter3.x + 80)
        && shooter3.x <= (zombie.x + 40)
        && zombie.y <= (shooter3.y + 40)
        && shooter3.y <= (zombie.y + 40)
    ) {
        soundEfx.src = shotgun;
        soundEfx.play();
        gameOver();
    }

    if (
        zombie.x <= (shooter4.x + 80)
        && shooter4.x <= (zombie.x + 40)
        && zombie.y <= (shooter4.y + 40)
        && shooter4.y <= (zombie.y + 40)
    ) {
        soundEfx.src = shotgun;
        soundEfx.play();
        gameOver();
    }

    // Zombie / Brain Collision

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

let main = function () {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
};

let render = function () {
    if (bgReady) {
        context.drawImage(bgImage, 0, 0)
    }

    if (brainReady) {
        context.drawImage(brainImage, brain.x, brain.y, brainImage.width / 24, brainImage.height / 24);
    }

    if (shooterReady) {
        context.drawImage(shooterImage, shooter.x, shooter.y, shooterImage.width / 3, shooterImage.height / 3);
    }

    if (shooter2Ready) {
        context.drawImage(shooter2Image, shooter2.x, shooter2.y, shooter2Image.width / 3, shooter2Image.height / 3);
    }

    if (shooter3Ready) {
        context.drawImage(shooter3Image, shooter3.x, shooter3.y, shooter3Image.width / 3, shooter3Image.height / 3);
    }

    if (shooter4Ready) {
        context.drawImage(shooter4Image, shooter4.x, shooter4.y, shooter4Image.width / 3, shooter4Image.height / 3);
    }

    if (zombieReady) {
        context.drawImage(zombieImage, srcX, srcY, width, height, zombie.x, zombie.y, width, height);
    }

    // Score

    if (lose == false) {
        context.fillStyle = "rgb(250, 250, 250)";
        context.font = "24px Helvetica";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText("Brains Eaten: " + brainsEaten, 32, 32);
    }
    
    // Gameover text

    if (lose == true) {
        context.fillStyle = "red";
        context.font = "48px Helvetica";
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText("You lose! Your score was: " + brainsEaten, 400, 380);
    }
};

// Randomizes brain and shooter positions

let reset = function () {
    brain.x = 64 + Math.random() * (canvas.width - 192);
    brain.y = 64 + (Math.random() * (canvas.height - 192));

    shooter.x = 64 + Math.random() * (canvas.width - 192);
    shooter.y = 64 + (Math.random() * (canvas.height - 192));

    shooter2.x = 64 + Math.random() * (canvas.width - 192);
    shooter2.y = 64 + (Math.random() * (canvas.height - 192));

    shooter3.x = 64 + Math.random() * (canvas.width - 192);
    shooter3.y = 64 + (Math.random() * (canvas.height - 192));

    shooter4.x = 64 + Math.random() * (canvas.width - 192);
    shooter4.y = 64 + (Math.random() * (canvas.height - 192));
}

// Game over! Resets all positions and restarts game after 5 seconds

let gameOver = function () {
    lose = true;
    zombie.x = canvas.width/2;
    zombie.y = canvas.height/2;
    zombie.speed = 0;
    reset();
    window.setTimeout(function() {
        restart();
    }, 5000);
}

// Resets the positions and score

let restart = function () {
    brainsEaten = 0;
    lose = false;

    zombie.x = canvas.width/2;
    zombie.y = canvas.height/2;
    zombie.speed = 250;
    reset();
}

// Main Loop -------------------------------------------------------

let then = Date.now();
reset();
main();
