import 'phaser';

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

    update(...args: any[]): void {
        if(this.sprite.x < -100)
        {
            this.sprite.setPosition(1024, 600);

            if(this.currentVelocity > -500)
                this.currentVelocity -= 50;

            
            this.sprite.setVelocityX(this.currentVelocity);
        }
    }
}