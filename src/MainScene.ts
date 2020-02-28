class MainScene extends Phaser.Scene {

    private static readonly BACKGROUND_URL: string = "resource/background.png";
    private static readonly MAXSLOTNUMONECHANGE: number = 2;
    private static readonly WEAPONLIST: string[] = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];

    private factory: dragonBones.phaser.Factory = null;

    private fpsText: Phaser.GameObjects.Text;
    private arms: dragonBones.phaser.display.ArmatureDisplay[] = [];
    private armNumText: Phaser.GameObjects.Text;
    private armNum: number = 0;
    // private armNumOfAniText: Phaser.GameObjects.Text;
    // private armNumOfAni: number = 0;
    // private armNumOfSlotText: Phaser.GameObjects.Text;
    // private armNumOfSlot: number = 0;
    private slotNumOneChangeText: Phaser.GameObjects.Text;
    private slotNumOneChange: number = 0;
    private slotChangeIdx: number = 0;

    public constructor() {
        super("DragonBonesTest");
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
        // right hand weapons 
        this.add.armature("weapon", "weapon_1004");

        const textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        this.fpsText.depth = 999;
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        let addArmNumBtn = this.add.image(200, 40, "sprites", "increase.png");
        let minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // armature num of animation ctrl
        // this.armNumOfAniText = this.add.text(40, 80, "ArmNumOfAni: 0", textStyle);
        // let addArmNumOfAniBtn = this.add.image(160, 80, "sprites", "increase.png");
        // let minArmNumOfAniBtn = this.add.image(15, 80, "sprites", "reduce.png");
        // animation ctrl
        let aniCtrlText = this.add.text(15, 120, "AniCtrl", textStyle);
        let aniCtrlBtn = this.add.image(120, 120, "sprites", "increase.png");
        // armature num of slot ctrl
        // this.armNumOfSlotText = this.add.text(40, 160, "ArmNumOfSlot: 0", textStyle);
        // let addArmNumOfSlotBtn = this.add.image(160, 160, "sprites", "increase.png");
        // let minArmNumOfSlotBtn = this.add.image(15, 160, "sprites", "reduce.png");
        // slot ctrl num
        this.slotNumOneChangeText = this.add.text(40, 200, "SlotNumOneChange: 0", textStyle);
        let addSlotOneChangeBtn = this.add.image(160, 200, "sprites", "increase.png");
        let minSlotOneChangeBtn = this.add.image(15, 200, "sprites", "reduce.png");
        // slot ctrl
        let slotCtrlText = this.add.text(15, 240, "SlotCtrl", textStyle);
        let slotCtrlBtn = this.add.image(120, 240, "sprites", "increase.png");

        // buttons
        addArmNumBtn.setInteractive();
        addArmNumBtn.on("pointerdown", this.addArmNum, this);
        minArmNumBtn.setInteractive();
        minArmNumBtn.on("pointerdown", this.minArmNum, this);
        // addArmNumOfAniBtn.setInteractive();
        // addArmNumOfAniBtn.on("pointerdown", this.addArmNumOfAni, this);
        // minArmNumOfAniBtn.setInteractive();
        // minArmNumOfAniBtn.on("pointerdown", this.minArmNumOfAni, this);
        aniCtrlBtn.setInteractive();
        aniCtrlBtn.on("pointerdown", this.ctrlAni, this);
        // addArmNumOfSlotBtn.setInteractive();
        // addArmNumOfSlotBtn.on("pointerdown", this.addArmNumOfSlot, this);
        // minArmNumOfSlotBtn.setInteractive();
        // minArmNumOfSlotBtn.on("pointerdown", this.minArmNumOfSlot, this);
        addSlotOneChangeBtn.setInteractive();
        addSlotOneChangeBtn.on("pointerdown", this.addSlotOneChange, this);
        minSlotOneChangeBtn.setInteractive();
        minSlotOneChangeBtn.on("pointerdown", this.minSlotOneChange, this);
        slotCtrlBtn.setInteractive();
        slotCtrlBtn.on("pointerdown", this.ctrlSlot, this);
    }

    // debug operation and fps
    private debugOperation(opa: string) {
        this.fpsText.text = 'OPA: ' + opa + '; FPS: ' + this.game.loop.actualFps || 'FPS: --';
    }

    // change armature number
    private addArmNum() {
        this.updateArmNum(10);
        this.debugOperation("add armature num");
    }
    private minArmNum() {
        this.updateArmNum(-10);
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
            let arm = this.add.armature("mecha_1004d", "mecha_1004d");
            arm.x = 300 + Math.random() * (maxX - 300);
            arm.y = 100 + Math.random() * (maxY - 100);
            arm.scale = 0.25;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            let arm = this.arms.pop;
            arm.dispose();
        }

    }

    // change armature num of animation ctrl
    // private addArmNumOfAni() {
    //     this.updateArmNumOfAni(1);
    //     this.debugOperation("add armature num of animation ctrl");
    // }
    // private minArmNumOfAni() {
    //     this.updateArmNumOfAni(-1);
    //     this.debugOperation("minus armature num of animation ctrl");
    // }
    // private updateArmNumOfAni(val: number) {
    //     this.armNumOfAni += val;
    //     this.armNumOfAni = this.armNumOfAni > this.armNum ? this.armNum : this.armNumOfAni;
    //     this.armNumOfAni = this.armNumOfAni < 0 ? 0 : this.armNumOfAni;
    //     this.armNumOfAniText.text = "ArmNumOfAni: " + this.armNumOfAni;

    //     // stop all animation
    //     for (let i = 0; i < this.arms.length; i++) {
    //         const element = this.arms[i];
    //         if (element.animation.isPlaying) element.animation.stop();
    //     }
    // }
    // animation ctrl
    private ctrlAni() {
        let isPlaying: boolean = this.arms.length > 0 && this.arms[0].animation.isPlaying;

        for (let i = 0; i < this.arms.length; i++) {
            const element = this.arms[i];
            if (isPlaying)
                element.animation.stop();
            else
                element.animation.play();
        }
        this.debugOperation("change animation playing");
    }
    // change armature num of slot ctrl
    // private addArmNumOfSlot() {
    //     this.updateArmNumOfSlot(1);
    //     this.debugOperation("add armature num of slot ctrl");
    // }
    // private minArmNumOfSlot() {
    //     this.updateArmNumOfSlot(-1);
    //     this.debugOperation("minus armature num of slot ctrl");
    // }
    // private updateArmNumOfSlot(val: number) {
    //     this.armNumOfSlot += val;
    //     this.armNumOfSlot = this.armNumOfSlot > this.armNum ? this.armNum : this.armNumOfSlot;
    //     this.armNumOfSlot = this.armNumOfSlot < 0 ? 0 : this.armNumOfSlot;
    //     this.armNumOfSlotText.text = "ArmNumOfSlot: " + this.armNumOfSlot;
    // }
    // change slot ctrl num
    private addSlotOneChange() {
        this.updateSlotOneChange(1);
        this.debugOperation("add slot num one change");
    }
    private minSlotOneChange() {
        this.updateSlotOneChange(-1);
        this.debugOperation("minus slot num one change");
    }
    private updateSlotOneChange(val: number) {
        this.slotNumOneChange += val;
        this.slotNumOneChange = this.slotNumOneChange > MainScene.MAXSLOTNUMONECHANGE ? MainScene.MAXSLOTNUMONECHANGE : this.slotNumOneChange;
        this.slotNumOneChange = this.slotNumOneChange < 0 ? 0 : this.slotNumOneChange;
        this.slotNumOneChangeText.text = "SlotNumOneChange: " + this.slotNumOneChange;
    }
    // slot ctrl
    private ctrlSlot() {
        this.slotChangeIdx++;
        this.slotChangeIdx %= MainScene.WEAPONLIST.length;
        for (let i = 0; i < this.arms.length; i++) {
            const element = this.arms[i];
            if (this.slotNumOneChange > 0) {
                // 右手武器素材在weapon_1004中
                const displayName = MainScene.WEAPONLIST[this.slotChangeIdx];
                this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot("weapon_hand_r"));
                if (this.slotNumOneChange > 1) {
                    // 左手武器素材在mecha_1004d中
                    // element.armature.getSlot("weapon_hand_l").displayIndex = this.slotChangeIdx;
                    this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot("weapon_hand_l"));
                }
            }
        }
        this.debugOperation("change slot");
    }
}
