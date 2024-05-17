import Phaser from "phaser";
import Menu from "./scenes/menu";
import Game from "./scenes/game";
import Lost from "./scenes/loose";

var config = {
    width: 1024,
    height: 720,
    type: Phaser.AUTO,
    scene: [Menu, Game, Lost],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)