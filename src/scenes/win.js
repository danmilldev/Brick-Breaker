import Phaser from "phaser";
import scenesManager from "/src/helpers/scenesManager";

let gameScore = 0

class Win extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.WinScene})}

    init(data)
    {
        gameScore = data.score
    }

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Won Game \nYour Score: " + 
            gameScore + "\nPress Enter to play again!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.WinScene)
                this.scene.start(scenesManager.GameScene)
            }
        })
    }
}

export default Win