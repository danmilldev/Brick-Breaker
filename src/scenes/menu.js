import Phaser from "phaser";
import scenesManager from "../helpers/scenesManager";

class Menu extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.MenuScene})}

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Won Game\nPress Enter to play!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.MenuScene)
                this.scene.start(scenesManager.GameScene)
            }
        })
    }
}

export default Menu