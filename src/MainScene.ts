class MainScene extends Phaser.Scene {

    private static BACKGROUND_URL: string = "resource/background.png";

    private factory: dragonBones.phaser.Factory = null;

    private fpsText: Phaser.GameObjects.Text;
    private armNumText: Phaser.GameObjects.Text;
    private armNum: number = 0;
    private arms: dragonBones.phaser.display.ArmatureDisplay[] = {};

    public constructor() {
        super("ReplaceSlotDisplay");
    }

    preload(): void {
        // this.game.time.advancedTiming = true;

        this.load.image(MainScene.BACKGROUND_URL, MainScene.BACKGROUND_URL);
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");

        this.load.dragonbone(
            "mecha_1004d",
            "resource/mecha_1004d_show/mecha_1004d_show_tex.png",
            "resource/mecha_1004d_show/mecha_1004d_show_tex.json",
            "resource/mecha_1004d_show/mecha_1004d_show_ske.json"
        );
        this.load.dragonbone(
            "weapon_1004",
            "resource/weapon_1004_show/weapon_1004_show_tex.png",
            "resource/weapon_1004_show/weapon_1004_show_tex.json",
            "resource/weapon_1004_show/weapon_1004_show_ske.json"
        );

        // MultiTextureBatching
    }

    create(): void {
        this.add.image(0, 0, MainScene.BACKGROUND_URL);

        this.factory = this.dragonbone.factory;
        // weapons
        // this.add.armature("weapon", "weapon_1004");

        const textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        let addArmNumBtn = this.add.image(160, 40, "sprites", "increase.png");
        let minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // armature num of animation ctrl
        // animation ctrl
        // armature num of slot ctrl
        // slot ctrl num
        // slot ctrl

        // buttons
        addArmNumBtn.setInteractive();
        addArmNumBtn.on("pointerdown", this.addArmNum, this);
        minArmNumBtn.setInteractive();
        minArmNumBtn.on("pointerdown", this.minArmNum, this);
    }

    // debug operation and fps
    private debugOperation(opa: string) {
        // this.fpsText.text = 'OPA: ' + opa + '; FPS: ' + this.physics.world.fps || 'FPS: --';
    }

    // change armature number
    private addArmNum(val: number = 1) {
        this.updateArmNum(val);

        this.debugOperation("add armature num");
    }
    private minArmNum(val: number = 1) {
        this.updateArmNum(-val);

        this.debugOperation("minus armature num");
    }
    private updateArmNum(val: number) {
        this.armNum += val;
        this.armNum = this.armNum < 0 ? 0 : this.armNum;
        this.armNumText.text = "ArmNum: " + this.armNum;

        const maxX = this.scale.gameSize.width;
        const maxY = this.scale.gameSize.height;
        // add
        while (this.armNum > this.arms.length) {
            console.log("add arm");
            let arm = this.add.armature("mecha_1004d", "mecha_1004d");
            arm.x = Math.random() * maxX;
            arm.y = Math.random() * maxY;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            console.log("minus arm");
            let arm = this.arms.pop;
            arm.destroy();
        }

    }

    // change armature num of animation ctrl
    // animation ctrl
    // change armature num of slot ctrl
    // change slot ctrl num
    // slot ctrl
}
