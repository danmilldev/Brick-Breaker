import Phaser from "phaser";
import scenesManager from "../helpers/scenesManager";

class Lost extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.LostScene})}

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Lost Game")
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100 + 25, "Press Enter to play again!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.LostScene)
                this.scene.switch(scenesManager.GameScene)
            }
        })
    }
}

export default Lost