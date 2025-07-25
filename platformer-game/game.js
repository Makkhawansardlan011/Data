const canvas = document.getElementById("gamecanvas")
const ctx = canvas.getContext("2d");
const playerImage = new Image();
playerImage.src = "player.jpg";

const gravity = 0.5;
const floor = canvas.height - 50;

let player = {
    x: 50,
    y: floor,
    width: 30,
    height: 30,
    dx: 0,
    dy: 0,
    jumping: false
};

let keys = {};
let score = 0;
let level = 1;
let maxlevel = 3;
let goalline = 750;

let levedeta = {
    1: [
        { x: 300, y: floor, width: 40, height: 40},
        { x: 500, y: floor -30, width: 50, height:50},
    ],
    2: [
        { x: 250, y: floor - 10, width: 40, height: 40},
        { x: 450, y: floor - 40, width: 50, height: 60},
        { x: 650, y: floor - 10, width: 30, height: 50},
    ],
    3: [
        {x: 200, y: floor, width:50, height:40},
        { x: 400, y: floor - 20, width: 50, height: 50},
        { x: 600, y: floor - 30, width: 60, height: 60},
        { x: 700, y: floor - 50, width: 20, height: 50},
    ]
}

let obstacles = levedeta[level];

function resetolayer() {
    player.x = 50;
    player.y = floor = player.height;
    player.dy = 0;
    player.jumping = false;
    player.dx = 0;
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

}

function drawObstacles() {
    ctx.fillStyle = "2c3e50";
    obstecles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function updetePlayer() {
    player.dy += gravity;
    player.y += player.dy;
    player.x += player.dx;

if (player.y + player.height > floor) {
    player.y = floor - player.height;
    player.dy = 0;
    player.jumping = false;
}

if (player.x < 0) player.x = 0;
if (playes.x + playes.width > canvas.width) player.x = canvas.width - player.width;
}

function detectCollison() {
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + playes.width > obs.x &&
            playes.y < obs.y +obs.height &&
            player.y + player.height > obs.y
        ) {
            alert("💥 Game Over! ชนสิ่งกีดขวางแล้ว")
            score = 0;
            level = 1;
            updeteUI();
            obstacles = leveldata[level];
            resetPlayer();
        }
    }
}

function checkGoel() {
    if (player.x + player.width >= goalline) {
        score += 100;
        level++;
        if (level > maxlevel) {
            alert("🎉 ชนะเกมทั้งหมดแล้ว! คะแนน: " + score);
            score = 0;
            level = 1;
        } else{
            alert("✅ ผ่านด่าน! ไปด่านถัดไป");
        }
        updeteUI();
        obstacles = levedeta[level];
        resetPlayer();
    }
}

function updeteUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updetePlayer();
    drawObstacles();
    detectCollison();
    checkGoel();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    keys[e.code] = true;
    if (e.code === "ArrowRight") player.dx = 3;
    if (e.code === "ArrowLeft") player.dx = -3;
    if (e.code === "Space" && !player.jumping) {
        player.dy = -10;
        player.jumping = true;
    }
});

document.addEventListener("keyu", (e) => {
    keys[e.code] = false;
    if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        player.dx = 0;
    }
});

playerImage.onload = () => {
    resetPlayer();
    updateUI();
    gameLoop();
};