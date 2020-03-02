"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this, "DragonBonesTest") || this;
        _this.factory = null;
        _this.arms = [];
        _this.armNum = 0;
        _this.slotNumOneChange = 0;
        _this.slotChangeIdx = 0;
        return _this;
    }
    MainScene.prototype.preload = function () {
        this.load.image(MainScene.BACKGROUND_URL, MainScene.BACKGROUND_URL);
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");
        // demo1
        // this.load.dragonbone(
        //     "mecha_1004d",
        //     "resource/mecha_1004d_show/mecha_1004d_show_tex.png",
        //     "resource/mecha_1004d_show/mecha_1004d_show_tex.json",
        //     "resource/mecha_1004d_show/mecha_1004d_show_ske.json"
        // );
        // demo1
        // demo2
        this.load.dragonbone("mecha_2903", "resource/mecha_2903/mecha_2903_tex.png", "resource/mecha_2903/mecha_2903_tex.json", "resource/mecha_2903/mecha_2903_ske.json");
        // demo2
        // replace target
        this.load.dragonbone("weapon_1004", "resource/weapon_1004_show/weapon_1004_show_tex.png", "resource/weapon_1004_show/weapon_1004_show_tex.json", "resource/weapon_1004_show/weapon_1004_show_ske.json");
        // MultiTextureBatching
    };
    MainScene.prototype.create = function () {
        this.add.image(0, 0, MainScene.BACKGROUND_URL);
        this.factory = this.dragonbone.factory;
        // right hand weapons 
        this.add.armature("weapon", "weapon_1004");
        var textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        this.fpsText.depth = 999;
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        var addArmNumBtn = this.add.image(200, 40, "sprites", "increase.png");
        var minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // armature num of animation ctrl
        // this.armNumOfAniText = this.add.text(40, 80, "ArmNumOfAni: 0", textStyle);
        // let addArmNumOfAniBtn = this.add.image(160, 80, "sprites", "increase.png");
        // let minArmNumOfAniBtn = this.add.image(15, 80, "sprites", "reduce.png");
        // animation ctrl
        var aniCtrlText = this.add.text(15, 120, "AniCtrl", textStyle);
        var aniCtrlBtn = this.add.image(120, 120, "sprites", "increase.png");
        // armature num of slot ctrl
        // this.armNumOfSlotText = this.add.text(40, 160, "ArmNumOfSlot: 0", textStyle);
        // let addArmNumOfSlotBtn = this.add.image(160, 160, "sprites", "increase.png");
        // let minArmNumOfSlotBtn = this.add.image(15, 160, "sprites", "reduce.png");
        // slot ctrl num
        this.slotNumOneChangeText = this.add.text(40, 200, "SlotNumOneChange: 0", textStyle);
        var addSlotOneChangeBtn = this.add.image(160, 200, "sprites", "increase.png");
        var minSlotOneChangeBtn = this.add.image(15, 200, "sprites", "reduce.png");
        // slot ctrl
        var slotCtrlText = this.add.text(15, 240, "SlotCtrl", textStyle);
        var slotCtrlBtn = this.add.image(120, 240, "sprites", "increase.png");
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
    };
    // debug operation and fps
    MainScene.prototype.debugOperation = function (opa) {
        this.fpsText.text = 'OPA: ' + opa + '; FPS: ' + this.game.loop.actualFps || 'FPS: --';
    };
    // change armature number
    MainScene.prototype.addArmNum = function () {
        this.updateArmNum(10);
        this.debugOperation("add armature num");
    };
    MainScene.prototype.minArmNum = function () {
        this.updateArmNum(-10);
        this.debugOperation("minus armature num");
    };
    MainScene.prototype.updateArmNum = function (val) {
        this.armNum += val;
        this.armNum = this.armNum < 0 ? 0 : this.armNum;
        this.armNumText.text = "ArmNum: " + this.armNum;
        var maxX = this.scale.gameSize.width;
        var maxY = this.scale.gameSize.height;
        // add
        while (this.armNum > this.arms.length) {
            // demo1
            // let arm = this.add.armature("mecha_1004d", "mecha_1004d");
            // demo1
            // demo2
            var arm = this.add.armature("mecha_2903d", "mecha_2903");
            // demo2
            arm.x = 300 + Math.random() * (maxX - 300);
            arm.y = 100 + Math.random() * (maxY - 100);
            arm.scale = 0.25;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            var arm = this.arms.pop;
            arm.dispose();
        }
    };
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
    MainScene.prototype.ctrlAni = function () {
        var isPlaying = this.arms.length > 0 && this.arms[0].animation.isPlaying;
        for (var i = 0; i < this.arms.length; i++) {
            var element = this.arms[i];
            if (isPlaying)
                element.animation.stop();
            else
                element.animation.play();
        }
        this.debugOperation("change animation playing");
    };
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
    MainScene.prototype.addSlotOneChange = function () {
        this.updateSlotOneChange(1);
        this.debugOperation("add slot num one change");
    };
    MainScene.prototype.minSlotOneChange = function () {
        this.updateSlotOneChange(-1);
        this.debugOperation("minus slot num one change");
    };
    MainScene.prototype.updateSlotOneChange = function (val) {
        this.slotNumOneChange += val;
        this.slotNumOneChange = this.slotNumOneChange > MainScene.SLOTSTOBECHANGED.length ? MainScene.SLOTSTOBECHANGED.length : this.slotNumOneChange;
        this.slotNumOneChange = this.slotNumOneChange < 0 ? 0 : this.slotNumOneChange;
        this.slotNumOneChangeText.text = "SlotNumOneChange: " + this.slotNumOneChange;
    };
    // slot ctrl
    MainScene.prototype.ctrlSlot = function () {
        // demo1
        // this.slotChangeIdx++;
        // this.slotChangeIdx %= MainScene.WEAPONLIST.length;
        // for (let i = 0; i < this.arms.length; i++) {
        //     const element = this.arms[i];
        //     if (this.slotNumOneChange > 0) {
        //         // 右手武器素材在weapon_1004中
        //         const displayName = MainScene.WEAPONLIST[this.slotChangeIdx];
        //         this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot("weapon_hand_r"));
        //         if (this.slotNumOneChange > 1) {
        //             // 左手武器素材在mecha_1004d中
        //             // element.armature.getSlot("weapon_hand_l").displayIndex = this.slotChangeIdx;
        //             this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot("weapon_hand_l"));
        //         }
        //     }
        // }
        // demo1
        // demo2
        for (var i = 0; i < this.arms.length; i++) {
            var element = this.arms[i];
            for (var j = 0; j < this.slotNumOneChange; j++) {
                var displayName = MainScene.WEAPONLIST[j % MainScene.WEAPONLIST.length];
                this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot(MainScene.SLOTSTOBECHANGED[j]));
                console.log("replaceSlot");
            }
            console.log("next arm");
        }
        // demo2
        this.debugOperation("change slot");
    };
    MainScene.BACKGROUND_URL = "resource/background.png";
    MainScene.MAXSLOTNUMONECHANGE = 2;
    MainScene.WEAPONLIST = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
    MainScene.SLOTSTOBECHANGED = ["forearm_l", "forearm_r", "tail1", "tail2", "tail3", "tail4", "tail5", "tail6", "tail7", "tail8", "tail9"];
    return MainScene;
}(Phaser.Scene));
