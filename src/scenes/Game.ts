import { Scene } from 'phaser';
import { MovingWall } from '../classes/MovingWall';

const PI_DIV2 = 1.57079632679;

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    player: Phaser.Physics.Arcade.Sprite;
    ground: Phaser.Physics.Arcade.Sprite;

    jumpPowerUI: Phaser.GameObjects.Rectangle;

    playerCanJump: boolean;
    playerHasJumped: boolean;

    playerJumpPower: number;
    jumpGraph: number; // enables wave-function attribute to jump power.

    score: number;
    scoreText: Phaser.GameObjects.Text;

    movingWalls:MovingWall;

    constructor ()
    {
        super('Game');

        this.playerCanJump = true;
        this.playerHasJumped = false;
        this.playerJumpPower = 0;
        this.jumpGraph = PI_DIV2;
        this.score = 0;
    }

    create ()
    {
        this.playerCanJump = true;
        this.playerHasJumped = false;
        this.playerJumpPower = 0;
        this.jumpGraph = PI_DIV2;
        this.score = 0;
        
        this.player = this.physics.add.sprite(160, 550, 'bob').setGravity(0, 800).setScale(2.5, 2.75);

        this.ground = this.physics.add.sprite(0, 700, 'ground')
        .setFriction(1, 1)
        .setScale(100, 1)
        .setImmovable(true)
        .setGravity(0)
        .setVelocity(0);

        this.jumpPowerUI = this.add.rectangle(900, 124, 124, 200, 0x008000).setScale(1, 0);
        this.add.rectangle(900, 124, 124, 200).setStrokeStyle(1, 0x000000);

        this.scoreText = this.add.text(0, 0, 'Score: 0', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 3,
            align: 'center'
        });

        this.add.sprite(1000, 500, 'cloud').setScale(3, 3).setDepth(1);

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
        // if the wall hits its respawn point, add score.
        if(this.movingWalls.update())
        {
            this.score++;
            this.scoreText.setText('Score: ' + this.score);
        }

        // Jump the player.
        this.input.keyboard?.on('keydown-SPACE', () => {

            // if the player jumped, reset jump power.
            if(this.playerHasJumped)
            {
                this.playerJumpPower = 0;
                this.playerHasJumped = false;
                this.jumpGraph = PI_DIV2;
            }


            // if the player is touching the ground, allow accumulating jump power.
            if(this.playerCanJump)
            {
                this.jumpGraph -= delta * 0.0075;

                if(this.jumpGraph < -PI_DIV2)
                    this.jumpGraph = PI_DIV2;

                this.playerJumpPower = Math.abs(Math.cos(this.jumpGraph));

                this.playerCanJump = false;
                this.jumpPowerUI.setScale(1, this.playerJumpPower);
            }
        });

        // release jump power, and reset jump power.
        this.input.keyboard?.on('keyup-SPACE', () => {

            this.playerHasJumped = true;
            this.player.setVelocityY(this.playerJumpPower * -700);
            this.jumpPowerUI.setScale(1, 0);

        });
    }
}
