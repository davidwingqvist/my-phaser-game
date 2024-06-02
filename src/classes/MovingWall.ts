import 'phaser';

const MAX_SPEED = -300;

export class MovingWall extends Phaser.Physics.Arcade.Sprite
{
    sprite: Phaser.Physics.Arcade.Sprite;
    currentVelocity: number;

    constructor(scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 'ground');
        this.currentVelocity = -200;

        this.sprite = scene.physics.add.sprite(x, y, 'ground');
        this.sprite.setVelocityX(this.currentVelocity);
    }

    update(): boolean {
        if(this.sprite.x < -100)
        {
            this.sprite.setPosition(1024, 600);

            if(this.currentVelocity > MAX_SPEED)
                this.currentVelocity -= 50;

            this.sprite.setScale(1, (Math.random() * 1.25) + 1);
            
            this.sprite.setVelocityX((Math.random() * MAX_SPEED) - 200);

            return true;
        }

        return false;
    }
}