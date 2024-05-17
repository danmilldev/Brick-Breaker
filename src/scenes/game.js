import Phaser from "phaser";
import colors from "../helpers/colors";

const paddleWidth = 125
const paddleHeight = 20
let isBallMoving = false

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
    constructor() {super({ key: "GameScene"})}


    create()
    {
        this.physics.world.bounds.top = 30

        let {width, height} = this.sys.game.canvas

        // addint top ui background
        const topBackground = this.add.rectangle(0, 0, width * 2, 50, colors.magenta)

        // player paddle
        const paddle = this.add.rectangle((width / 2) - (paddleHeight / 2), height - paddleHeight, paddleWidth, paddleHeight, colors.white)
        paddle.setName("PlayerPaddle")
        this.physics.add.existing(paddle, true)
        

        // ball to play with
        const ball = this.add.circle(width / 2 - 10, paddle.getTopCenter().y - 20, 10, colors.white)
        ball.setName("Ball")
        const ballSpeedY = 600
        const ballSpeedX = 50
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
            }
        })

        // spawning bricks to break

        const rows = 4
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


    }

}

export default Game