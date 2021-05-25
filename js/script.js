let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('soundresources/food.mp3');
const gameoverSound = new Audio('soundresources/gameover.mp3');
const moveSound = new Audio('soundresources/move.mp3');
const gameSound = new Audio('soundresources/music.mp3');
let speed = 10;
let score = 0;
let lastptime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

food = { x: 7, y: 5 };

//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastptime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastptime = ctime;
        gameEngine();
    }
}

function collision(snake) {
    // if snake eat itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
    }
}

function gameEngine() {
    // Updating snake array and food
    if (collision(snakeArr)) {
        gameoverSound.play();
        gameSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Gameover: Restart to play again");
        snakeArr = [{ x: 13, y: 15 }];
        gameSound.play();
        score = 0;
    }

    // score increment and display next path of food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodsound.play()
        score += 1;
        scorebox.innerHTML = "Your score:" + score
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a)*Math.random()) }
    }

    // Moving the snake
    for (let i = snakeArr.length -2; i>=0; i--) {
        // to create new object
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Display and render snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}



// to start the game
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }  //while game is starting
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})

