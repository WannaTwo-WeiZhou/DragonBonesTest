class MainScene extends Phaser.Scene {

    private static readonly WEAPONLIST: string[] = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
    private static readonly SLOTSTOBECHANGED: string[] = ["weap_barm_3", "weap_farm_3", "weap_farm_1", "weap_barm_1", "head_spec_3", "head_spec_1"];

    private factory: dragonBones.phaser.Factory = null;

    private fpsText: Phaser.GameObjects.Text;
    private arms: dragonBones.phaser.display.ArmatureDisplay[] = [];
    private armNumText: Phaser.GameObjects.Text;
    private armNum: number = 0;
    private slotNumOneChangeText: Phaser.GameObjects.Text;
    private slotNumOneChange: number = 0;
    private isMoving: boolean = false;
    private movementX: number = 0;
    private moveDirection: boolean = true;

    public constructor() {
        super("DragonBonesTest");
    }

    preload(): void {
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");

        // armature resource
        this.load.dragonbone(
            "human01",
            "resource/human01/bones_human01_tex.png",
            "resource/human01/bones_human01_tex.json",
            "resource/human01/bones_human01_ske.dbbin",
            null,
            null,
            { responseType: "arraybuffer" },
        );

        // replace target
        // this.load.dragonbone(
        //     "weapon_1004",
        //     "resource/weapon_1004_show/weapon_1004_show_tex.png",
        //     "resource/weapon_1004_show/weapon_1004_show_tex.json",
        //     "resource/weapon_1004_show/weapon_1004_show_ske.json"
        // );
        // this.load.dragonbone(
        //     "human02",
        //     "resource/human02/bones_human01_tex.png",
        //     "resource/human02/bones_human01_tex.json",
        //     "resource/human02/bones_human01_ske.dbbin",
        //     null,
        //     null,
        //     { responseType: "arraybuffer" },
        // );
        this.load.image("human02", "resource/human02/bones_human01_tex.png");

        // MultiTextureBatching
    }

    create(): void {
        this.factory = this.add.dragonBoneFactory();//this.dragonbone.factory;

        // right hand weapons 
        // this.add.armature("weapon", "weapon_1004");
        // this.add.armature("Armature", "human02");

        const textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        this.fpsText.depth = 999;
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        let addArmNumBtn = this.add.image(200, 40, "sprites", "increase.png");
        let minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // slot ctrl num
        // this.slotNumOneChangeText = this.add.text(40, 80, "SlotNumOneChange: 0", textStyle);
        // let addSlotOneChangeBtn = this.add.image(260, 80, "sprites", "increase.png");
        // let minSlotOneChangeBtn = this.add.image(15, 80, "sprites", "reduce.png");
        // slot ctrl
        // let slotCtrlText = this.add.text(15, 120, "SlotCtrl", textStyle);
        // let slotCtrlBtn = this.add.image(120, 120, "sprites", "increase.png");
        // texture ctrl
        let textureCtrlText = this.add.text(15, 160, "TextureCtrl", textStyle);
        let textureCtrlBtn = this.add.image(150, 160, "sprites", "increase.png");
        // animation ctrl
        let aniCtrlText = this.add.text(15, 200, "AniCtrl", textStyle);
        let aniCtrlBtn = this.add.image(120, 200, "sprites", "increase.png");
        // movement ctrl
        let moveCtrlText = this.add.text(15, 240, "MoveCtrl", textStyle);
        let moveCtrlBtn = this.add.image(120, 240, "sprites", "increase.png");

        // buttons
        addArmNumBtn.setInteractive();
        addArmNumBtn.on("pointerdown", this.addArmNum, this);
        minArmNumBtn.setInteractive();
        minArmNumBtn.on("pointerdown", this.minArmNum, this);
        // addSlotOneChangeBtn.setInteractive();
        // addSlotOneChangeBtn.on("pointerdown", this.addSlotOneChange, this);
        // minSlotOneChangeBtn.setInteractive();
        // minSlotOneChangeBtn.on("pointerdown", this.minSlotOneChange, this);
        // slotCtrlBtn.setInteractive();
        // slotCtrlBtn.on("pointerdown", this.ctrlSlot, this);
        textureCtrlBtn.setInteractive();
        textureCtrlBtn.on("pointerdown", this.ctrlTexture, this);
        aniCtrlBtn.setInteractive();
        aniCtrlBtn.on("pointerdown", this.ctrlAni, this);
        moveCtrlBtn.setInteractive();
        moveCtrlBtn.on("pointerdown", this.ctrlMove, this);
    }

    update(): void {
        if (this.isMoving) {
            const speed: number = 1;
            const maxMovementX: number = 50;
            // change delta
            if (this.moveDirection) {
                this.movementX += speed;
                if (this.movementX > maxMovementX) {
                    this.moveDirection = false;
                }
            }
            else {
                this.movementX -= speed;
                if (this.movementX < -maxMovementX) {
                    this.moveDirection = true;
                }
            }

            // update x
            for (let i = 0; i < this.arms.length; i++) {
                const element = this.arms[i];
                element.x += this.moveDirection ? speed : -speed;
            }
        }
    }

    // debug operation and fps
    private debugOperation(opa: string) {
        this.fpsText.text = 'OPA: ' + opa + '; FPS: ' + this.game.loop.actualFps || 'FPS: --';
    }

    // change armature number
    private addArmNum() {
        this.updateArmNum(2);
        this.debugOperation("add armature num");
    }
    private minArmNum() {
        this.updateArmNum(-2);
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
            let arm = this.add.armature("Armature", "human01");
            arm.x = 300 + Math.random() * (maxX - 300);
            arm.y = 100 + Math.random() * (maxY - 100);
            // arm.scale = 0.25;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            let arm = this.arms.pop;
            arm.destroy();
        }
    }

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
        this.slotNumOneChange = this.slotNumOneChange > MainScene.SLOTSTOBECHANGED.length ? MainScene.SLOTSTOBECHANGED.length : this.slotNumOneChange;
        this.slotNumOneChange = this.slotNumOneChange < 0 ? 0 : this.slotNumOneChange;
        this.slotNumOneChangeText.text = "SlotNumOneChange: " + this.slotNumOneChange;
    }
    // slot ctrl
    private ctrlSlot() {
        for (let i = 0; i < this.arms.length; i++) {
            let element = this.arms[i];
            for (let j = 0; j < this.slotNumOneChange; j++) {
                let displayName = MainScene.WEAPONLIST[j % MainScene.WEAPONLIST.length];
                this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot(MainScene.SLOTSTOBECHANGED[j]));
            }
        }

        this.debugOperation("change slot");
    }

    // texture ctrl
    private ctrlTexture() {
        console.log("all texture keys: ");
        this.textures.getTextureKeys().forEach(element => {
            console.log("one key: " + element);
        });

        for (let i = 0; i < this.arms.length; i++) {
            let element = this.arms[i];
            // 换全slot
            // let slots = element.armature.getSlots();
            // for (let j = 0; j < slots.length; j++) {
            //     const slot = slots[j];
            //     this.factory.replaceSlotDisplay("human02", "Armature", slot.name, slot.name, slot);// 项目中displayName == slotName
            // }

            // factory方法
            // let tarSkin = this.factory.getArmatureData("Armature", "human02").defaultSkin;
            // this.factory.replaceSkin(element.armature, tarSkin);

            // armature方法
            element.armature.replacedTexture = this.textures.get("human02");
        }

        this.debugOperation("change texture");
    }

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

    // move ctrl
    private ctrlMove() {
        this.isMoving = !this.isMoving;

        this.debugOperation("change movement");
    }
}
