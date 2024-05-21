import Phaser from "phaser";
import scenesManager from "../helpers/scenesManager";
import colors from "../helpers/colors";

class Menu extends Phaser.Scene
{
    constructor() {super({ key: scenesManager.MenuScene})}

    create()
    {
        const titleText = this.add.text(this.sys.game.canvas.width / 2 - 100, this.sys.game.canvas.height / 2 - 100,
            "Won Game\n\nPress Enter to play!\n\nAnd left and right arrow to choose Difficulty")

        const easyDifficulty = this.add.text(titleText.x, titleText.y + 100, "Easy")
        const mediumDifficulty = this.add.text(titleText.x + 50, titleText.y + 100, "Medium")
        const hardDifficulty = this.add.text(titleText.x + 125, titleText.y + 100, "Hard")

        const easyPos = hardDifficulty.x - 117
        const mediumPos = hardDifficulty.x - 57
        const hardPos = hardDifficulty.x + 10
        const triangleYPos = hardDifficulty.y + 40

        const triangle = this.add.triangle(easyPos, triangleYPos, 50, 10, 10, 10 , 30, -10, colors.green)

        let difficultyLevel = 0

        this.input.keyboard.on('keydown', event =>
        {
            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.ENTER)
            {
                this.scene.stop(scenesManager.MenuScene)
                this.scene.start(scenesManager.GameScene, { difficulty: difficultyLevel})
            }

            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.LEFT)
            {
                difficultyLevel - 1 < 0 ? difficultyLevel = 2 : difficultyLevel -= 1
            }

            if(event.keyCode == Phaser.Input.Keyboard.KeyCodes.RIGHT)
            {
                difficultyLevel + 1 > 2 ? difficultyLevel = 0 : difficultyLevel += 1
            }


            switch (difficultyLevel) {
                case 0: // easy
                    triangle.setPosition(easyPos,triangleYPos)
                    break;
                case 1: // medium
                    triangle.setPosition(mediumPos,triangleYPos)
                    break;
                case 2: // hard
                    triangle.setPosition(hardPos,triangleYPos)
                    break;
                default:
                    break;
            }
        })
    }
}

export default Menu