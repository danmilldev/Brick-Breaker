import Phaser from "phaser";

var config = {
    width: 1024,
    height: 720,
    type: Phaser.AUTO,
    scene: [],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
}

const game = new Phaser.Game(config)