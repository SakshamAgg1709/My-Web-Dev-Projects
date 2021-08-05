//Game Constants & Variable

let inputDir = { x: 0, y: 0 };//Snake is not moving
let foodSound = new Audio('../music/food.mp3');
let gameOverSound = new Audio('../music/gameover.mp3');
let moveSound = new Audio('../music/move.mp3');
let musicSound = new Audio('../music/music.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 }
//Game Functions
function main(ctime) {//Main  funcion doesn't need to be called it is must for any programm
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine()
    console.log(ctime)
}



function isCollide(snake) {//Snake Arr-sarr
    //If you come into yourself-Snake head touches it own body 
    for (let i = 1; i < snakeArr.length; i++) {

        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {//Agar i ki value snake ki real x value se equal ho gayi to wo collide ho jaaygs
            return true;
        }
    }
    //If you strike the wall
    if (snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].x <= 0 || snakeArr[0].y >= 18) {
        return true;
    }
    return false;

}

function gameEngine() {
    //Part 1: Updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over:Press any key to play again!");

        snakeArr = [{ x: 13, y: 15 }];
        musicSound.play();
        score = 0;

    }

    //If you have eaten the food  , increment the score and regenerate the score

    if (snakeArr[0].y == food.y && snakeArr[0].x == food.x) {
        foodSound.play();
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem('hiscore', JSON.stringify(hiscore))
            hiscoreBox.innerHTML = "High Score:" + hiscoreval;
        }
        //It is important to write scorebox because we have score as a variable.
        scoreBox.innerHTML = "Score:" + score;

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })


        //Hume a,b ki value 1-18 ke beech mein leni h kyuki grid mein itne hi rows and column h
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }//It is formula to generate a random positon of food

    }

    //Moving the snake 

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //PArt 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";//It will cear all the content of board
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
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}













//Main logic starts here

musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);//Parse - Convert javascript item into an object
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);//It is better than set interval and set timeout
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;//it will make the snake to move upwards
            break
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;//It will move the snake downwards
            break
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;//It will move the snake left
            inputDir.y = 0;
            break
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;//It will move the snake right
            inputDir.y = 0;
            break
        default:
            break

    }
})