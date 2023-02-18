let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameOverImage;


let gameOver=false //true이면 게임 끝, false 게임 시작
let score=0;

//우주선 좌표
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList = []
function Bullet() {
this.x = 0;
this.y = 0;
this.init=function(){
    this.x = spaceshipX + 17;
    this.y = spaceshipY - 10;
    this.alive = true //true면 살아있는 총알 false면 죽은 총알

    bulletList.push(this);
 };
 this.update = function(){
    this.y -= 7;
 };

 this.checkHit=function(){

    for(let i=0; i < enemyList.length;i++){
        if(this.y <= enemyList[i].y && this.x>=enemyList[i].x && this.x<=enemyList[i].x+40){
            //총알이 죽게됨 적군의 우주선이 없어짐, 점수획득
            score++;

            this.alive =false //죽은총알
            enemyList.splice(i,1);

        }
    }
   
 }
}



function generateRandomValue(min,max) {
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList=[]

function Enemy(){
    this.x=0;
    this.y=0;
    this.init =function(){
        this.y= 0
        this.x= generateRandomValue(0,canvas.width-48)
        enemyList.push(this)

    };

this.update=function(){
    this.y += 2; //enemy 속도조절

    if (this.y >=canvas.height - 48) {
        gameOver = true;
        console.log("gameover")
    }
}

}


function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "img/background.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "img/spaceshuttle.png";

    bulletImage = new Image();
    bulletImage.src = "img/bullet.png";
    

    enemyImage = new Image();
    enemyImage.src = "img/ufo.png";

    gameOverImage = new Image();
    gameOverImage.src = "img/gameover.png";
}

let keysDown={}

function setupKeyboardListener(){
document.addEventListener("keydown", function(event){
   keysDown[event.keyCode] = true;
});
document.addEventListener("keyup",function(event){
    delete keysDown[event.keyCode];

    if(event.keyCode == 32){
        creatBullet() // 총알 생성
    }
});
}

function creatBullet() {
   let b = new Bullet();
   b.init();
}

function creatEnemy(){
const interval = setInterval(function(){
    let e = new Enemy()
    e.init()
},1000)
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

if(spaceshipX >= canvas.width-64){
    spaceshipX=canvas.width-64;
}
//우주선이 경기장 밖으로 나가지 못하게 해야함

//총알의 y좌표 업데이트하는 함수 호출
for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
        bulletList[i].update();
        bulletList[i].checkHit(); 
    }

}

//enemy 내려오기
for(let i=0; i<enemyList.length; i++){
    enemyList[i].update();
}




}

function render() {
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
ctx.fillText(`Score:${score}`,20,20);
ctx.fillStyle="white";
ctx.font = "20px Arial"


 for (let i = 0; i < bulletList.length; i++) {
    if(bulletList[i].alive){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }

    
}

for (let i=0; i<enemyList.length; i++){
    ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y)
}


}

function main() {
    if(!gameOver){
        update(); // 좌표값을 업데이트하고
        render(); //그려준다
        requestAnimationFrame(main);
    }else {
        ctx.drawImage(gameOverImage, 10, 100, 380, 380)
    }
   
}

loadImage();
setupKeyboardListener();
creatEnemy();
main();


//방향키를 누르면
//우주선의 xy좌표가 바뀌고
//다시 render를 그려준다


//총알 만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이 -- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y 좌표값이 있어야 한다.
//5. 총알 배열을 가지고 render 그려준다.

