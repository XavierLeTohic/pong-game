// This code must be commented but it's 00:22 and this project is work in progress ;)

var canvas,
    canvasContext,
    started = false,
    pause = true,
    framesPerSecond = 30,

    ballX = 50,
    ballSpeedX = 10,
    ballY = 50,
    ballSpeedY = 4,

    leftPaddleY = 250,
    rightPaddleY = 50,

    playerScore = 0,
    iaScore = 0;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

function calculateMousePosition(evt) {

    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft
    var mouseY = evt.clientY - rect.top - root.scrollTop

    return {
        x: mouseX,
        y: mouseY
    }
}

export default function(canvasElm) {
    canvas = canvasElm
    canvasContext = canvas.getContext('2d')

    ballX = (canvas.width / 2) - 10;
    ballY = (canvas.height / 2) - 10;
    leftPaddleY = canvas.height - PADDLE_HEIGHT - 50;
    rightPaddleY = 50;

    instructions()

    setInterval(() => {
        if(!pause) {
            move()
            draw()
        }
    }, 1000 / framesPerSecond)

    canvas.addEventListener('mousemove', (evt) => {

        if(!pause) {
            var mousePos = calculateMousePosition(evt)

            leftPaddleY = mousePos.y - (PADDLE_HEIGHT / 2)
        }
    })

    window.addEventListener('resize', () => {
        stop()
    })

    window.addEventListener('click', () => {
        play()
    })
}

function resetBall() {
    ballSpeedX = -ballSpeedX
    ballX = canvas.width/2
    ballY = canvas.height/2
}

function AI() {
    var rightPaddleCenter = rightPaddleY + (PADDLE_HEIGHT/2) 
    if(rightPaddleCenter < ballY-35) {
        rightPaddleY += 6
    } else if(rightPaddleCenter > ballY+35) {
        rightPaddleY -= 6
    }
}

function move() {

    AI()

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 0) {
        if(ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
        } else {
            iaScore += 1;
            resetBall()
        }

    }
    if (ballX > canvas.width) {
        if(ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX
        } else {
            playerScore += 1;
            resetBall()
        }
    }

    if (ballY < 0) {
        ballSpeedY = -ballSpeedY
    }

    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, '#5C6AC4')
    drawRect(0, leftPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT, "white")
    drawRect(canvas.width - PADDLE_THICKNESS, rightPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT, "white")
    drawCircle(ballX, ballY, 10, "white")
    
    if(started) {
        drawText("Score", (canvas.width/2) - 30, 50, 22)
        drawText(`${playerScore} - ${iaScore}`, (canvas.width/2) - 25, 75, 22)
    }
}

function drawRect(leftX, topY, w, h, color) {
    canvasContext.fillStyle = color
    canvasContext.fillRect(leftX, topY, w, h)
}

function drawCircle(centerX, centerY, radius, color) {
    canvasContext.fillStyle = color
    canvasContext.beginPath()
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true)
    canvasContext.fill()
}

function drawText(text, x, y, textSize) {
    console.log(textSize)
    canvasContext.font = `${textSize}px Helvetica`;
    canvasContext.fillText(text, x, y);
}

function instructions() {

    draw()
    drawText("Pong", (canvas.width/2) - 55, canvas.height / 4, 35)
    drawText("Click to start", (canvas.width/2) - 70, canvas.height / 1.5, 22)
}

function stop() {
    if(!pause) {
        drawText("Paused", (canvas.width/2) - 45, canvas.height/2, 28)
        drawText("Click to resume", (canvas.width/2) - 60, canvas.height/2 + 40, 18)
    }

    pause = true;
}

function play() {
    if(!started) {
        started = true;
    }
    if(pause) {
        pause = false;
    }
}