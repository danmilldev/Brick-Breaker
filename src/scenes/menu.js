import Phaser from "phaser";

class Menu extends Phaser.Scene
{
    constructor() {super({ key: "MenuScene"})}

    create()
    {
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100, "Brick Braker")
        this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100 + 25, "Press Enter to play!")

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop("MainMenuScene")
                this.scene.switch("GameScene")
            }
        })
    }
}

export default Menu