const canvas = document.getElementById("gamecanvas");
const ctx = canvas.getContext("2d");
const playerImage = new Image();
playerImage.src = "player.jpg"; // ตรวจสอบให้แน่ใจว่า 'player.jpg' อยู่ในไดเรกทอรีเดียวกันหรือระบุพาธที่ถูกต้อง

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

// แก้ไขชื่อตัวแปร: levelData
let levelData = {
    1: [
        { x: 300, y: floor - 40, width: 40, height: 40 }, // ปรับ y ให้อยู่เหนือพื้น
        { x: 500, y: floor - 50, width: 50, height: 50 }, // ปรับ y ให้อยู่เหนือพื้น
    ],
    2: [
        { x: 250, y: floor - 40, width: 40, height: 40 },
        { x: 450, y: floor - 60, width: 50, height: 60 },
        { x: 650, y: floor - 50, width: 30, height: 50 },
    ],
    3: [
        { x: 200, y: floor - 40, width: 50, height: 40 },
        { x: 400, y: floor - 70, width: 50, height: 50 },
        { x: 600, y: floor - 80, width: 60, height: 60 },
        { x: 700, y: floor - 100, width: 20, height: 50 },
    ]
};

let obstacles = levelData[level]; // แก้ไขชื่อตัวแปร

// แก้ไขชื่อฟังก์ชัน: resetPlayer
function resetPlayer() {
    player.x = 50;
    player.y = floor - player.height; // แก้ไขการคำนวณ
    player.dy = 0;
    player.jumping = false;
    player.dx = 0;
}

function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = "#2c3e50"; // เพิ่ม '#' สำหรับรหัสสี hex
    obstacles.forEach(obs => { // แก้ไขชื่อตัวแปร
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

// แก้ไขชื่อฟังก์ชัน: updatePlayer
function updatePlayer() {
    player.dy += gravity;
    player.y += player.dy;
    player.x += player.dx;

    if (player.y + player.height > floor) {
        player.y = floor - player.height;
        player.dy = 0;
        player.jumping = false;
    }

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width; // แก้ไขการสะกดผิด
}

function detectCollison() {
    for (let obs of obstacles) {
        if (
            player.x < obs.x + obs.width &&
            player.x + player.width > obs.x && // แก้ไขการสะกดผิด
            player.y < obs.y + obs.height && // แก้ไขการสะกดผิด
            player.y + player.height > obs.y
        ) {
            alert("💥 Game Over! ชนสิ่งกีดขวางแล้ว");
            score = 0;
            level = 1;
            updateUI(); // แก้ไขชื่อฟังก์ชัน
            obstacles = levelData[level]; // แก้ไขชื่อตัวแปร
            resetPlayer();
        }
    }
}

function checkGoel() { // "Goal" สะกดด้วย "a" - checkGoal เป็นชื่อที่นิยมมากกว่า
    if (player.x + player.width >= goalline) {
        score += 100;
        level++;
        if (level > maxlevel) {
            alert("🎉 ชนะเกมทั้งหมดแล้ว! คะแนน: " + score);
            score = 0;
            level = 1;
        } else {
            alert("✅ ผ่านด่าน! ไปด่านถัดไป");
        }
        updateUI(); // แก้ไขชื่อฟังก์ชัน
        obstacles = levelData[level]; // แก้ไขชื่อตัวแปร
        resetPlayer();
    }
}

// แก้ไขชื่อฟังก์ชัน: updateUI
function updateUI() {
    document.getElementById("score").innerText = score;
    document.getElementById("level").innerText = level;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlayer(); // แก้ไขชื่อฟังก์ชัน
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

document.addEventListener("keyup", (e) => { // แก้ไขชื่อ event
    keys[e.code] = false;
    if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        player.dx = 0;
    }
});

playerImage.onload = () => {
    resetPlayer();
    updateUI(); // แก้ไขชื่อฟังก์ชัน
    gameLoop();
};