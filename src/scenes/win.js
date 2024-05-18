import Phaser from "phaser";
import scenesManager from "../helpers/scenesManager";

class Win extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.WinScene})}

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Won Game")
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100 + 25, "Press Enter to play again!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.WinScene)
                this.scene.run(scenesManager.GameScene)
            }
        })
    }
}

export default Win