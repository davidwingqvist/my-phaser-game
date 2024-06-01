import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    ground: Phaser.Physics.Arcade.Sprite;

    playerCanJump: boolean;

    constructor ()
    {
        super('Game');

        this.playerCanJump = true;
    }

    create ()
    {
        this.player = this.physics.add.sprite(160, 550, 'bob').setGravity(0, 200).setScale(2.5, 2.75);
        this.ground = this.physics.add.sprite(0, 700, 'ground')
        .setFriction(1, 1)
        .setScale(100, 1)
        .setImmovable(true)
        .setGravity(0)
        .setVelocity(0);

        this.physics.add.collider(this.ground, this.player, () => {
            this.playerCanJump = true;
        });

                // Jump the player.
                this.input.keyboard?.on('keydown-SPACE', () => {
                    if(this.playerCanJump)
                    {
                        this.player.setVelocityY(-300);
                        this.playerCanJump = false;
                    }
                });
    }

    update ()
    {

    }
}
