let canvas = document.querySelector("#canvas"); 
let ctx = canvas.getContext('2d'); 

//maze patterns
let levels = 
[
    [
        [0,0,4,1,0,1,0,1,1,1,1,3],
        [1,1,1,1,1,1,0,1,0,1,0,0],
        [1,1,0,0,1,0,1,0,1,1,1,1],
        [1,0,1,0,4,0,0,1,1,0,0,1],
        [1,0,1,1,1,1,1,1,0,0,0,4],
        [4,0,1,1,0,0,0,1,1,1,1,1],
        [1,0,0,1,0,1,0,1,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,0],
        [1,0,1,0,0,0,1,4,0,0,1,0],
        [1,1,0,1,1,1,0,1,0,1,1,1],
        [0,1,0,1,0,1,1,0,0,1,0,1],
        [2,1,1,1,1,0,1,1,4,1,1,0]
    ],
    [
        [0,1,1,1,1,0,1,1,1,1,0,0],
        [1,1,1,1,1,1,1,0,0,1,4,1],
        [4,1,1,0,0,1,1,0,0,1,0,1],
        [0,1,0,1,1,1,1,1,4,1,0,1],
        [0,1,0,1,0,1,0,0,1,1,1,1],
        [1,1,0,1,1,2,1,1,3,0,0,1],
        [1,1,1,1,1,4,0,1,4,0,0,1],
        [1,0,1,1,0,1,1,0,1,0,0,1],
        [1,0,1,0,0,1,0,0,1,1,1,1],
        [1,1,1,0,0,1,0,1,0,0,1,0],
        [0,1,0,0,0,1,1,1,1,1,1,0],
        [0,1,1,1,4,1,0,0,0,0,0,0]
    ],
    [
        [0,1,1,1,1,1,1,1,0,0,0,0],
        [4,1,0,1,0,1,0,1,1,1,1,0],
        [1,1,1,1,0,6,0,0,1,0,1,0],
        [0,0,0,1,0,1,1,1,1,0,4,1],
        [1,1,1,4,1,1,1,0,0,0,0,1],
        [1,0,0,0,0,0,1,1,1,1,0,1],
        [1,1,1,1,0,0,1,0,1,1,1,1],
        [0,4,0,1,0,0,1,0,1,0,0,0],
        [1,1,0,1,1,1,1,1,2,1,1,1],
        [1,0,0,0,0,1,4,0,1,0,0,1],
        [1,1,1,1,0,0,1,0,1,0,4,1],
        [0,0,0,1,1,1,1,1,1,1,1,0]
    ]
]

//levels
let levelIndex = 0;
let maze = levels[levelIndex];
function nextLevel() {
    levelIndex++;
    maze = levels[levelIndex];
    drawMaze();
}

//object numbers
let tileSize = 50;
let playerPosition = {x:0, y:0};
let wall= 0;
let road = 1;
let player = 2;
let goal = 3;
let collect = 4;
let enemy = 5;
let win = 6;
let score = 0;

//object pictures
//road
let roadpic = new Image();
roadpic.src= 'illustrations/road.png';
//wall
let wallpic = new Image();
wallpic.src='illustrations/wall.png';
//player
let playerpic = new Image();
playerpic.src='illustrations/player.png';
//collectable
let collectpic = new Image();
collectpic.src='illustrations/collect.png';
//enemy
let enemypic = new Image();
enemypic.src='illustrations/enemy.png';
//goal
let goalpic = new Image();
goalpic.src='illustrations/goal.png';
//win
let winpic = new Image();
winpic.src='illustrations/win.png';

//object tiles
function drawMaze(){

    for(let y= 0; y < maze.length; y++){

      for(let x = 0; x < maze[y].length; x++){
        //wall
        if(maze[y][x] === wall){
            ctx.drawImage(wallpic,x*tileSize,y*tileSize,tileSize,tileSize);
        //road
        }else if(maze[y][x] === road){
            ctx.drawImage(roadpic,x*tileSize,y*tileSize,tileSize,tileSize);
        
        }//player
        else if(maze[y][x] === player){
            playerPosition.x = x; 
            playerPosition.y = y;
            ctx.drawImage(playerpic,x*tileSize,y*tileSize,tileSize,tileSize);
        //goal
        }
        else if(maze[y][x] === goal){
            ctx.drawImage(goalpic,x*tileSize,y*tileSize,tileSize,tileSize);
            
        }
        //collectable
        else if(maze[y][x] === collect){
            ctx.drawImage(collectpic,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        //enemy
        else if(maze[y][x] === enemy){
            ctx.drawImage(enemypic,x*tileSize,y*tileSize,tileSize,tileSize);
        }
        //win
        else if(maze[y][x] === win){
            ctx.drawImage(winpic,x*tileSize,y*tileSize,tileSize,tileSize);
        }
      }
    }

}

//sounds
//walk
function walk(){
    let gameSound = new Audio('sounds/walk.mp3');
    gameSound.play();
} 
//collect
function gather(){
    let gameSound = new Audio('sounds/gather.mp3');
    gameSound.play();
} 
//nextlevel
function portal(){
    let gameSound = new Audio('sounds/portal.mp3');
    gameSound.play();
}
//winning
function winsound(){
    let gameSound = new Audio('sounds/winsound.mp3');
    gameSound.play();
}
//losing
function losesound(){
    let gameSound = new Audio('sounds/losesound.mp3');
    gameSound.play();
}

//set walkable tiles
function isWalkable(targetTile) {
    if (targetTile === road || targetTile === collect || targetTile === goal || targetTile === win) {
        return true;
    } else {
        return false;
    }
} 

//player controls
window.addEventListener('keydown', (e) => {
    let targetTile;
    switch (e.keyCode) {
        case 37: //left key
            targetTile = maze[playerPosition.y][playerPosition.x - 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x - 1] = player; //players new position
                maze[playerPosition.y][playerPosition.x] = enemy; //enemy block
                drawMaze();
                if (targetTile === collect) {
                    score++;
                    gather();
                    document.getElementById("scorebox").innerHTML = "Knifes: " + score; //knife score
                }
                if (targetTile === goal && score > 5) {
                    nextLevel();
                    portal();
                } 
                if (targetTile === win && score >=18){
                    document.getElementById("winbox").innerHTML = "You won! Your score is " + score;
                    document.getElementById("winbox").style.backgroundColor ="green";
                    winsound();
                }
                if (targetTile === win && score <18){
                    document.getElementById("lostbox").innerHTML = "You lost. You scored " + score;
                    document.getElementById("lostbox").style.backgroundColor ="red";
                    losesound();
                }
            }
            break;
        case 39: //right key
            targetTile = maze[playerPosition.y][playerPosition.x + 1];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y][playerPosition.x + 1] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = enemy; //enemy block
                drawMaze();
                if (targetTile === collect) {
                    score++;
                    gather();
                    document.getElementById("scorebox").innerHTML = "Knifes: " + score; //knife score
                }
                if (targetTile === goal && score > 5) {
                    nextLevel();
                    portal();
                } 
                if (targetTile === win && score >=18){
                    document.getElementById("winbox").innerHTML = "You won! Your score is " + score;
                    document.getElementById("winbox").style.backgroundColor ="green";
                    winsound();
                }
                if (targetTile === win && score <18){
                    document.getElementById("lostbox").innerHTML = "You lost. You scored " + score;
                    document.getElementById("lostbox").style.backgroundColor ="red";
                    losesound();
                }
            }
            break;
        case 38: //up key
            targetTile = maze[playerPosition.y - 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y - 1][playerPosition.x] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = enemy; //enemy block
                drawMaze();
                if (targetTile === collect) {
                    score++;
                    gather();
                    document.getElementById("scorebox").innerHTML = "Knifes: " + score; //knife score
                }
                if (targetTile === goal && score > 5) {
                    nextLevel();
                    portal();
                } 
                if (targetTile === win && score >=18){
                    document.getElementById("winbox").innerHTML = "You won! Your score is " + score;
                    document.getElementById("winbox").style.backgroundColor ="green";
                    winsound();
                }
                if (targetTile === win && score < 18){
                    document.getElementById("lostbox").innerHTML = "You lost. You scored " + score;
                    document.getElementById("lostbox").style.backgroundColor ="red";
                    losesound();
                }
            }
            break;
        case 40: //down key
            targetTile = maze[playerPosition.y + 1][playerPosition.x];
            if (isWalkable(targetTile)) {
                maze[playerPosition.y + 1][playerPosition.x] = player; //players nye position
                maze[playerPosition.y][playerPosition.x] = enemy; //enemy block
                drawMaze();
                if (targetTile === collect) {
                    score++;
                    gather();
                    document.getElementById("scorebox").innerHTML = "Knifes: " + score; //knife score
                }
                if (targetTile === goal && score > 5) {
                    nextLevel();
                    portal(); 
                } 
                if (targetTile === win && score >=18){
                    document.getElementById("winbox").innerHTML = "You won! Your score is " + score;
                    document.getElementById("winbox").style.backgroundColor ="green";
                    winsound();
                }
                if (targetTile === win && score < 18){
                    document.getElementById("lostbox").innerHTML = "You lost. You scored " + score;
                    document.getElementById("lostbox").style.backgroundColor ="red";
                    losesound();
                }
            }
            break;
    }
    console.log(score);
    document.getElementById("scorebox").innerHTML = "Knifes collected: " + score;
})


window.addEventListener("load", drawMaze);

