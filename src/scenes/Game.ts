import { Scene } from 'phaser';
import { MovingWall } from '../classes/MovingWall';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    ground: Phaser.Physics.Arcade.Sprite;

    playerCanJump: boolean;
    playerHasJumped: boolean;
    playerJumpPower: number;
    score: number;

    movingWalls:MovingWall;

    constructor ()
    {
        super('Game');

        this.playerCanJump = true;
        this.playerHasJumped = false;
        this.playerJumpPower = 0;
    }

    create ()
    {
        this.player = this.physics.add.sprite(160, 550, 'bob').setGravity(0, 800).setScale(2.5, 2.75);

        this.ground = this.physics.add.sprite(0, 700, 'ground')
        .setFriction(1, 1)
        .setScale(100, 1)
        .setImmovable(true)
        .setGravity(0)
        .setVelocity(0);

        this.movingWalls = new MovingWall(this, 1024, 600);

        // if player touches ground, allow jumping again.
        this.physics.add.collider(this.ground, this.player, () => {
            this.playerCanJump = true;
        });

        this.physics.add.collider(this.player, this.movingWalls.sprite, () => {
            this.scene.start('GameOver');
        })
    }

    update (time: number, delta: number)
    {
        this.movingWalls.update();

        // Jump the player.
        this.input.keyboard?.on('keydown-SPACE', () => {

            // if the player jumped, reset jump power.
            if(this.playerHasJumped)
            {
                this.playerJumpPower = 0;
                this.playerHasJumped = false;
            }

            // if the player is touching the ground, allow accumulating jump power.
            if(this.playerCanJump)
            {
                this.playerJumpPower += delta * 0.01;

                if(this.playerJumpPower > 1.0)
                    this.playerJumpPower = 1.0;

                this.playerCanJump = false;
            }
        });

        // release jump power, and reset jump power.
        this.input.keyboard?.on('keyup-SPACE', () => {

            this.playerHasJumped = true;
            this.player.setVelocityY(this.playerJumpPower * -700);

        });
    }
}
