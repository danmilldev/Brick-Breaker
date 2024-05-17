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
        
    }

}

export default Game