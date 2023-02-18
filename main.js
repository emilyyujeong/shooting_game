let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;

//우주선좌표

let spaceshipX = canvas.width/2-32
let spaceshipY = canvas.height-64

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "img/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "img/spaceshuttle.png";

    bulletImage = new Image();
    bulletImage.src = "img/bullet.png";
    

    enemyImage = new Image();
    enemyImage.src = "img/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "img/game-over.gif";
}

let keysDown={}
function setupKeyboardListener(){
document.addEventListener("keydown", function(event){
   keysDown[event.keyCode] = true;
});
document.addEventListener("keyup",function(event){
    delete keysDown[event.keyCode];
});
}

function update(){
if(39 in keysDown) 
spaceshipX += 5; //우주선의 속도
//right
if (37 in keysDown){
    spaceshipX -= 5;
}//left

if(spaceshipX <=0){
    spaceshipX=0
}

if(spaceshipX >= canvas.width){
    spaceshipX=canvas.width;
}
//우주선이 경기장 밖으로 나가지 못하게 해야함



}

function render() {
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
    update(); // 좌표값을 업데이트하고
    render(); //그려준다
    requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();


//방향키를 누르면
//우주선의 xy좌표가 바뀌고
//다시 render를 그려준다