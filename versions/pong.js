// This code must be commented but it's 00:22 and this project is work in progress ;)

var canvas,
    canvasContext,
    started = false,
    pause = true,
    end = false,
    framesPerSecond = 30,

    ballX = 50,
    ballSpeedX = -10,
    ballY = 50,
    ballSpeedY = 4,

    leftPaddleY = 250,
    rightPaddleY = 50,

    playerScore = 0,
    iaScore = 0,
    maxScore = 3;

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

    ballX = (canvas.width / 2);
    ballY = (canvas.height / 2);
    leftPaddleY = canvas.height - PADDLE_HEIGHT - 50;
    rightPaddleY = 50;

    instructions()

    setInterval(() => {
        if(!pause && !end) {
            move()
            draw()
        }
    }, 1000 / framesPerSecond)

    canvas.addEventListener('mousemove', (evt) => {

        if(!pause && !end) {
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

    if(playerScore >= maxScore || iaScore >= maxScore) {
        showScore()
    }

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

    if(end) {
        return false
    }

    AI()

    var paddleWasTouched = false;

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX < 11) {
        if(ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) {
            paddleWasTouched = true
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (leftPaddleY + PADDLE_HEIGHT / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            iaScore += 1;
            resetBall()
        }

    }
    if (ballX > canvas.width - 10) {
        if(ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT) {
            paddleWasTouched = true
            ballSpeedX = -ballSpeedX

            var deltaY = ballY - (rightPaddleY + PADDLE_HEIGHT / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            playerScore += 1;
            resetBall()
        }
    }

    if (ballY < 0 || paddleWasTouched === true) {
        ballSpeedY = -ballSpeedY
    }

    if (ballY > canvas.height || paddleWasTouched === true) {
        ballSpeedY = -ballSpeedY
    }

    paddleWasTouched = false
}

function draw() {

    if(end) {
        return false
    }

    drawRect(0, 0, canvas.width, canvas.height, '#5C6AC4')
    drawRect(5, leftPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT, "white")
    drawRect(canvas.width - PADDLE_THICKNESS - 5, rightPaddleY, PADDLE_THICKNESS, PADDLE_HEIGHT, "white")
    drawCircle(ballX, ballY, 10, "white")
    drawNet()
    
    if(started) {
        drawText(playerScore, (canvas.width/4), 75, 29)
        drawText(iaScore, (canvas.width/1.5) + 25, 75, 29)
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
    canvasContext.font = `${textSize}px Helvetica`;
    canvasContext.fillText(text, x, y);
}

function instructions() {

    draw()
    drawText("Pong", (canvas.width/4), canvas.height / 2, 35)
    drawText("Click to start", (canvas.width/2) + 65, canvas.height / 2, 22)
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
    if(end) {
        end = false
    }
}

function showScore() {

    draw()

    started = false;
    end = true;
    pause = true;
    ballX = 50;
    ballSpeedX = 10;
    ballY = 50;
    ballSpeedY = 4;
    leftPaddleY = 250;
    rightPaddleY = 50;

    if(playerScore > iaScore) {
        drawText("You win !", (canvas.width/2) - 45, canvas.height/2, 28)
    } else {
        drawText("You lose !", (canvas.width/2) - 45, canvas.height/2, 28)
    }

    drawText("Click to play again", (canvas.width/2) - 60, canvas.height/2 + 40, 18)

    playerScore = 0;
    iaScore = 0;
    
}

function drawNet() {
    for(var i = 0; i < canvas.height; i += 40) {
        drawRect(canvas.width/2 - 1, i, 2, 20, 'white')
    }
}