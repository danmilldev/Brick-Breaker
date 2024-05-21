import Phaser from "phaser";
import colors from "../helpers/colors";
import scenesManager from "../helpers/scenesManager";

let lives = 3
let startLives = 3
let points = 0

const paddleWidth = 200
const paddleHeight = 20
let paddleStartPosX = 0
let paddleStartPosY = 0
let paddleStartBodyPosX = 0
let paddleStartBodyPosY = 0

let isBallMoving = false
let isHitting = true
const ballSpeedX = 600
const ballSpeedY = 300
const ballRadius = 10

const leftBottomDirection = {
    x: -ballSpeedX,
    y: ballSpeedY
}

const rightBottomDirection = {
    x: ballSpeedX,
    y: ballSpeedY
}

const leftTopDirection = {
    x: -ballSpeedX,
    y: -ballSpeedY
}

const rightTopDirection = {
    x: ballSpeedX,
    y: -ballSpeedY
}

let directionsArray = [leftBottomDirection, rightBottomDirection, leftTopDirection, rightTopDirection]

class Game extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.GameScene})}

    init(data)
    {
        if(data.difficulty == 0) // easy
        {
            
        }
        else if(data.difficulty == 1) // medium
        {
            
        }
        else if(data.difficulty == 2) // hard
        {
            
        }
    }

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
        startText.setName("StartHelpText")

        // player paddle
        paddleStartPosX = (width / 2) - (paddleHeight / 2)
        paddleStartPosY = height - paddleHeight
        const paddle = this.add.rectangle(paddleStartPosX, paddleStartPosY, paddleWidth, paddleHeight, colors.blue)
        paddle.setName("PlayerPaddle")
        this.physics.add.existing(paddle, true)
        

        // ball to play with
        const ball = this.add.circle(width / 2 - 10, paddle.getTopCenter().y - 20, ballRadius, colors.red)
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
                ball.body.setVelocity(newDirection.x, newDirection.y)
                isBallMoving = true
                startText.visible = false
            }
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ESC)
            {
                this.scene.stop(scenesManager.GameScene)
                this.scene.start(scenesManager.MenuScene)
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
        this.physics.add.collider(paddle, ball, () => {
            const leftCenter = paddle.getTopLeft().x + ((paddle.getTopCenter().x - paddle.getTopLeft().x) / 2)
            const rightCenter = paddle.getTopCenter().x + ((paddle.getTopRight().x - paddle.getTopCenter().x) / 2)

            if(ball.x < leftCenter && ball.x > paddle.getTopLeft().x)
            {
                ball.body.setVelocity(leftTopDirection.x, leftTopDirection.y)
            }
            else if(ball.x > rightCenter && ball.x < paddle.getTopRight().x)
            {
                ball.body.setVelocity(rightTopDirection.x, rightTopDirection.y)
            }
        })

        paddleStartBodyPosX = paddle.body.x
        paddleStartBodyPosY = paddle.body.y
    }

    update()
    {
        const cursors = this.input.keyboard.createCursorKeys()

        const paddle = this.children.getByName("PlayerPaddle")
        const paddleSpeed = 5

        const ball = this.children.getByName("Ball")

        const bricks = this.children.getAll().filter(gameObjectName => gameObjectName.name == "BrickRect")

        const livesText = this.children.getByName("LivesText")
        const startText = this.children.getByName("StartHelpText")
        let {width, height} = this.sys.game.canvas

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
                paddle.body.position.x += paddleSpeed
                paddle.x += paddleSpeed
            }
        }

        if(ball.y == height - ball.height)
        {
            if(isHitting)
            {
                lives -= 1
                livesText.setText("Lives: " + lives)

                startText.visible = true
                isBallMoving = false
                
                paddle.x = paddleStartPosX
                paddle.y = paddleStartPosY
                paddle.body.x = paddleStartBodyPosX
                paddle.body.y = paddleStartBodyPosY

                ball.body.setVelocity(0,0)
                ball.x = paddle.getTopCenter().x
                ball.y = paddle.getTopCenter().y - 30

                if(lives <= 0 || lives > 3)
                {
                    // reset stats
                    ball.x = paddleStartPosX
                    lives = startLives
                    const reachedPoints = points
                    points = 0
                    isBallMoving = false

                    this.scene.stop(scenesManager.GameScene)
                    this.scene.start(scenesManager.LostScene, { score: reachedPoints})
                }

                isHitting = false
            }
        }
        else if(ball.y < height - (height / 10))
        {
            isHitting = true
        }

        if(bricks.length <= 0)
        {
            // reset stats
            ball.x = paddleStartPosX
            lives = startLives
            const reachedPoints = points
            points = 0
            isBallMoving = false

            this.scene.stop(scenesManager.GameScene)
            this.scene.start(scenesManager.WinScene, { score: reachedPoints})
        }
    }
}

export default Game