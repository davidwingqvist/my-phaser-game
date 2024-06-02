import { Scene } from 'phaser';

export class GameOver extends Scene
{
    title: Phaser.GameObjects.Text;
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameover_text : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        this.title = this.add.text(512, 460, 'You lost!\nPress ENTER to retry.', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard?.once('keydown-ENTER', () => {
            this.scene.start('Game');
        });
    }
}
