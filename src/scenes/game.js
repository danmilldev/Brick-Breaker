import Phaser from "phaser";

let colors = {
    white: 0xffffff,
    black: 0x000000,
}

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
    }

}

export default Game