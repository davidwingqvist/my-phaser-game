import { Scene, GameObjects } from 'phaser';

export class GameRules extends Scene 
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    sub: GameObjects.Text;
    rulesText: GameObjects.Text;

    constructor ()
    {
        super('GameRules');
    }

    create ()
    {
        this.background = this.add.image(512, 384, 'background');

        this.title = this.add.text(512, 460, 'You play as Bob. Bob is very fat.', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.sub = this.add.text(512, 500, 'He also has a crazy ex. You have to run from her.', {
            fontFamily: 'Arial Black', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.rulesText = this.add.text(512, 600, 'Press SPACE to charge your jump then release to jump over obstacles!\nTo start the game, Press ENTER', {
            fontFamily: 'Arial Black', fontSize: 12, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard?.on('keydown-ENTER', () => {

            this.scene.start('Game');

        });
    }
}