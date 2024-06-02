import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg.png');
        this.load.image('ground', 'assets/player.png');
        this.load.image('bob', 'assets/bob.png');
        this.load.image('wall', 'assets/wall.png');
        this.load.image('cloud', 'assets/cloud.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
