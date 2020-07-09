const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");/// getting canvas object to get properties and method

// create the unit
const box = 32;// size of intial block acording to backgroun box

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,// return ramdpwm x and y position 1 to 17 and 3 to 15 *box 1 box take box space
    y : Math.floor(Math.random()*15+3) * box
}

// create the score var
// 15 boxes in height and 17 box in width
let score = 0;

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){// doesnt turn oppsote thats why second condition
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);// draw image in ctx canvus object
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";// fillstyle fill the box with colour
        ctx.fillRect(snake[i].x,snake[i].y,box,box);// create rectangle at x,y of ize box*box
        
        ctx.strokeStyle = "red";// border
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    // delete head and in last at snake
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    //d is current direction
    // which direction
    if( d == "LEFT") snakeX -= box;// keep running on left
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);// addd in font of array snake
    //score
    ctx.fillStyle = "red";
    ctx.font = "44px Changa one";
    ctx.fillText(score,2*box,1.5*box);// score display
}

// call draw function every 100 ms

let game = setInterval(draw,100);// keep calling so snake keep on running


















