import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.player = this.physics.add.sprite(160, 550, 'player');
    }

    update ()
    {
        // Jump the player.
        this.input.keyboard?.on('keydown-SPACE', () => {
            this.player.setVelocityY(-300);
        });
    }
}
