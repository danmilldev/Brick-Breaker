import Phaser from "phaser";
import colors from "../helpers/colors";

class Game extends Phaser.Scene
{
    constructor() {super({ key: "GameScene"})}


    create()
    {
        let {width, height} = this.sys.game.canvas
        const paddleWidth = 150
        const paddleHeight = 20

        // player paddle
        const paddle = this.add.rectangle((width / 2) - (paddleHeight / 2), height - paddleHeight, paddleWidth, paddleHeight, colors.white)
        paddle.setName("PlayerPaddle")
        this.physics.add.existing(paddle, true)
        

        // ball to play with
        const ball = this.add.circle(width / 2 - 10, height / 2, 10, colors.white)
        ball.setName("Ball")
        const ballSpeedY = 600
        const ballSpeedX = 10
        this.physics.add.existing(ball)
        ball.body.setCollideWorldBounds(true, 1, 1)
        ball.body.setVelocity(ballSpeedX, ballSpeedY)
        ball.body.setBounce(1, 1)

        this.physics.add.collider(paddle, ball)
    }

    update()
    {
        const cursors = this.input.keyboard.createCursorKeys()
        const paddle = this.children.getByName("PlayerPaddle")
        const paddleSpeed = 5

        if(cursors.left.isDown)
        {
            if(paddle.x - 75 > 0)
            {
                paddle.body.position.x -= paddleSpeed
                paddle.x -= paddleSpeed
            }
        }
        else if (cursors.right.isDown)
        {
            if(paddle.x + 76 < this.sys.game.canvas.width)
            {
                paddle.x += paddleSpeed
                paddle.body.position.x += paddleSpeed
            }
        }
    }

}

export default Game