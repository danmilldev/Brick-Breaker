import Phaser from "phaser";
import scenesManager from "/src/helpers/scenesManager";

let gameScore = 0

class Lost extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.LostScene})}

    init(data)
    {
        gameScore = data.score
    }

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Lost Game \nYour Score: " + 
            gameScore + "\nPress Enter to play again!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.LostScene)
                this.scene.start(scenesManager.GameScene)
            }
        })
    }
}

export default Lost