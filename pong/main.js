const startButton = document.getElementById("start");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pWidth = 10;
const pHeight = 100;

let gameStarted = false;

let p1 = {
    posY: 200,
    posX: 50,
    score: 0
}
let p2 = {
    posY: 200,
    posX: 740,
    score: 0
}

let ball = {
    posX: 400,
    posY: 250,
    radius: 15,
    velocity: 2.5,
    angle: Math.random()*2 < 1? Math.PI/4 : -Math.PI/4,
    bounces: 0,
    bounced: false
}


window.addEventListener("keydown", (elem) =>{
    elem.preventDefault();
    if(elem.key == "w"){
        if(p1.posY >= 50)p1.posY -= 50;
    }
    if(elem.key == "s"){
        if(p1.posY <= 350)p1.posY += 50;
    }
    if(elem.key == "ArrowUp"){
        if(p2.posY >= 50)p2.posY -= 50;
    }
    if(elem.key == "ArrowDown"){
        if(p2.posY <= 350)p2.posY += 50;
    }
    if(!gameStarted){
        startGame();
    }
})

function updateGame(){
    ctx.fillStyle = "#FFF";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //#region Player Update

    ctx.fillRect(p1.posX, p1.posY, pWidth, pHeight);
    ctx.fillRect(p2.posX, p2.posY, pWidth, pHeight);
    //#endregion Player Update

    //#region Ball Update

    function reset(player){
        ball.bounces = 0;
        ball.velocity = 2.5;
        ball.bounced = true;
        setTimeout(() => {ball.bounced = false}, 200);
        if(player == 1){
            ball.posX = 70;
            ball.posY = 250;
            ball.angle = Math.random()*2 < 1? Math.PI/4 : -Math.PI/4;
        }
        if(player == 2){
            ball.posX = 730;
            ball.posY = 250;
            ball.angle = Math.random()*2 < 1? 3 * Math.PI/4: -3 * Math.PI/4;
        }
    }

    function ballBounce(cond){
        if(ball.bounced == true)return;
        ball.angle += (Math.random() * 4 < 3)? cond : Math.PI;
        ball.bounces++;
        ball.bounced = true;
        setTimeout(() => {ball.bounced = false}, 200);
    }

    if(ball.posX <= p1.posX + ball.radius && ball.posX + ball.velocity * 1.9 >= p1.posX) {
        if(p1.posY <= ball.posY && p1.posY + pHeight >= ball.posY){
            ballBounce(ball.angle % Math.PI*2 < Math.PI? Math.PI/2 : 3 * Math.PI/2);
        }
    }
    if(ball.posX >= p2.posX - ball.radius && ball.posX - ball.velocity * 1.9 <= p2.posX) {
        if(p2.posY <= ball.posY && p2.posY + pHeight >= ball.posY){
            ballBounce(ball.angle % Math.PI*2 < Math.PI? Math.PI/2 : 3 * Math.PI/2);
        }
    }

    switch(ball.bounces){
        case 3: ball.velocity = 3; break;
        case 8: ball.velocity = 4; break;
        case 16: ball.velocity = 5; break;
        case 25: ball.velocity = 6; break;
        case 40: ball.velocity = 8; break;
    }

    if(ball.posY <= ball.radius || ball.posY >= canvas.height - ball.radius) {
        ball.angle +=  Math.PI/2;
    }
    if(ball.posX >= canvas.width){
        p1.score++;
        reset(1);
    }
    if(ball.posX <= 0){
        p2.score++;
        reset(2);
    }

    ball.posX += ball.velocity * Math.cos(ball.angle)
    ball.posY += ball.velocity * Math.sin(ball.angle)


    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 0, 360);
    ctx.fill();
    //#endregion

    document.getElementById("score-bounces").innerHTML = ball.bounces;
    document.getElementById("score-p1").innerHTML = p1.score;
    document.getElementById("score-p2").innerHTML = p2.score;
}

function startGame(){
    setInterval(updateGame, 10)
    startButton.style.display = "none";
    gameStarted = !gameStarted;
}
startButton.addEventListener("click", startGame)