import Phaser from "phaser";
import colors from "../helpers/colors";
import scenesManager from "../helpers/scenesManager";

let lives = 3
let points = 0

const paddleWidth = 125
const paddleHeight = 20
let isBallMoving = false
let isHitting = true

const leftBottomDirection = {
    x: -600,
    y: 300
}

const rightBottomDirection = {
    x: 600,
    y: 300
}

const leftTopDirection = {
    x: -600,
    y: -300
}

const rightTopDirection = {
    x: 600,
    y: -300
}

let directionsArray = [leftBottomDirection, rightBottomDirection, leftTopDirection, rightTopDirection]

class Game extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.GameScene})}


    create()
    {
        this.physics.world.bounds.top = 30

        let {width, height} = this.sys.game.canvas

        // UI Bar

        const topBackground = this.add.rectangle(0, 0, width * 2, 50, colors.magenta) // top ui background

        // UI Texts
        const livesText = this.add.text(width - 90, 5, "Lives: " + lives)
        livesText.setName("LivesText")

        const pointsText = this.add.text(0, 5, "Points: " + points)
        pointsText.setName("PointsText")

        const startText = this.add.text((width / 2 - 125), height / 2, "Press Spacebar to Start!")

        // player paddle
        const paddle = this.add.rectangle((width / 2) - (paddleHeight / 2), height - paddleHeight, paddleWidth, paddleHeight, colors.blue)
        paddle.setName("PlayerPaddle")
        this.physics.add.existing(paddle, true)
        

        // ball to play with
        const ball = this.add.circle(width / 2 - 10, paddle.getTopCenter().y - 20, 10, colors.red)
        ball.setName("Ball")
        this.physics.add.existing(ball, false)
        ball.body.setCollideWorldBounds(true, 1, 1)
        ball.body.setVelocity(0, 0)
        ball.body.setBounce(1, 1)

        // press Space to start letting the ball move
        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.SPACE && !isBallMoving)
            {
                let directionCount = Math.floor(Math.random() * (directionsArray.length ))
                let newDirection = directionsArray[directionCount]
                console.log(newDirection);
                ball.body.setVelocity(newDirection.x, newDirection.y)
                isBallMoving = true
                startText.visible = false
            }
        })

        // spawning bricks to break

        const rows = 2
        const bricks = 9

        const brickWidth = 50
        const brickHeight = 25

        let spawnStartPosX = 75
        let spawnStartPosY = 70

        for (let index = 0; index < rows; index++) {
            for (let index = 0; index < bricks; index++) {
                
                let newBrick = this.add.rectangle(spawnStartPosX, spawnStartPosY, brickWidth, brickHeight, colors.green)
                newBrick.setName("BrickRect")
                this.physics.add.existing(newBrick, true)
                
                spawnStartPosX += 100
                
                this.physics.add.collider(newBrick, ball, () => {
                    points += 10
                    pointsText.setText("Points: " + points)
                    newBrick.destroy()
                })
            }

            if(index % 2 == 0)
            {
                spawnStartPosX = 125
                spawnStartPosY += 40
            }
            else
            {
                spawnStartPosX = 75
                spawnStartPosY += 40
            }
        }

        // adding the collider between paddle and ball
        this.physics.add.collider(paddle, ball)
    }

    update()
    {
        const cursors = this.input.keyboard.createCursorKeys()

        const paddle = this.children.getByName("PlayerPaddle")
        const paddleSpeed = 5

        const ball = this.children.getByName("Ball")

        const livesText = this.children.getByName("LivesText")
        let {width, height} = this.sys.game.canvas
        const paddleStartPosX = (width / 2) - (paddleHeight / 2)

        if(cursors.left.isDown && isBallMoving)
        {
            if(paddle.x - (paddleWidth / 2) > 0)
            {
                paddle.body.position.x -= paddleSpeed
                paddle.x -= paddleSpeed
            }
        }
        else if (cursors.right.isDown && isBallMoving)
        {
            if(paddle.x + (paddleWidth / 2) < this.sys.game.canvas.width)
            {
                paddle.x += paddleSpeed
                paddle.body.position.x += paddleSpeed
            }
        }

        if(ball.y == height - 10)
        {
            if(isHitting)
            {
                lives -= 1
                livesText.setText("Lives: " + lives)

                if(lives <= 0 || lives > 3)
                {
                    ball.x = paddleStartPosX
                    lives = 3
                    points = 0
                    isBallMoving = false
                    this.scene.switch(scenesManager.MenuScene)
                }

                isHitting = false
            }
        }
        else if(ball.y < height - (height / 10))
        {
            isHitting = true
        }
    }
}

export default Game