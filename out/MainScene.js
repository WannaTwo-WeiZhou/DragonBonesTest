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
        var _this = _super.call(this, "ReplaceSlotDisplay") || this;
        _this.factory = null;
        _this.arms = [];
        _this.armNum = 0;
        _this.armNumOfAni = 0;
        _this.armNumOfSlot = 0;
        _this.slotNumOneChange = 0;
        _this.slotChangeIdx = 0;
        return _this;
    }
    MainScene.prototype.preload = function () {
        // this.game.time.advancedTiming = true;
        this.load.image(MainScene.BACKGROUND_URL, MainScene.BACKGROUND_URL);
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");
        this.load.dragonbone("mecha_1004d", "resource/mecha_1004d_show/mecha_1004d_show_tex.png", "resource/mecha_1004d_show/mecha_1004d_show_tex.json", "resource/mecha_1004d_show/mecha_1004d_show_ske.json");
        this.load.dragonbone("weapon_1004", "resource/weapon_1004_show/weapon_1004_show_tex.png", "resource/weapon_1004_show/weapon_1004_show_tex.json", "resource/weapon_1004_show/weapon_1004_show_ske.json");
        // MultiTextureBatching
    };
    MainScene.prototype.create = function () {
        this.add.image(0, 0, MainScene.BACKGROUND_URL);
        this.factory = this.dragonbone.factory;
        // weapons 
        this.add.armature("weapon", "weapon_1004");
        var textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        var addArmNumBtn = this.add.image(160, 40, "sprites", "increase.png");
        var minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // armature num of animation ctrl
        this.armNumOfAniText = this.add.text(40, 80, "ArmNumOfAni: 0", textStyle);
        var addArmNumOfAniBtn = this.add.image(160, 80, "sprites", "increase.png");
        var minArmNumOfAniBtn = this.add.image(15, 80, "sprites", "reduce.png");
        // animation ctrl
        var aniCtrlText = this.add.text(15, 120, "AniCtrl", textStyle);
        var aniCtrlBtn = this.add.image(120, 120, "sprites", "increase.png");
        // armature num of slot ctrl
        this.armNumOfSlotText = this.add.text(40, 160, "ArmNumOfSlot: 0", textStyle);
        var addArmNumOfSlotBtn = this.add.image(160, 160, "sprites", "increase.png");
        var minArmNumOfSlotBtn = this.add.image(15, 160, "sprites", "reduce.png");
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
        addArmNumOfAniBtn.setInteractive();
        addArmNumOfAniBtn.on("pointerdown", this.addArmNumOfAni, this);
        minArmNumOfAniBtn.setInteractive();
        minArmNumOfAniBtn.on("pointerdown", this.minArmNumOfAni, this);
        aniCtrlBtn.setInteractive();
        aniCtrlBtn.on("pointerdown", this.ctrlAni, this);
        addArmNumOfSlotBtn.setInteractive();
        addArmNumOfSlotBtn.on("pointerdown", this.addArmNumOfSlot, this);
        minArmNumOfSlotBtn.setInteractive();
        minArmNumOfSlotBtn.on("pointerdown", this.minArmNumOfSlot, this);
        addSlotOneChangeBtn.setInteractive();
        addSlotOneChangeBtn.on("pointerdown", this.addSlotOneChange, this);
        minSlotOneChangeBtn.setInteractive();
        minSlotOneChangeBtn.on("pointerdown", this.minSlotOneChange, this);
        slotCtrlBtn.setInteractive();
        slotCtrlBtn.on("pointerdown", this.ctrlSlot, this);
    };
    // debug operation and fps
    MainScene.prototype.debugOperation = function (opa) {
        // this.fpsText.text = 'OPA: ' + opa + '; FPS: ' + this.physics.world.fps || 'FPS: --';
    };
    // change armature number
    MainScene.prototype.addArmNum = function () {
        this.updateArmNum(1);
        this.debugOperation("add armature num");
    };
    MainScene.prototype.minArmNum = function () {
        this.updateArmNum(-1);
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
            var arm = this.add.armature("mecha_1004d", "mecha_1004d");
            arm.x = 200 + Math.random() * (maxX - 200);
            arm.y = Math.random() * maxY;
            arm.scale = 0.25;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            var arm = this.arms.pop;
            arm.destroy();
        }
    };
    // change armature num of animation ctrl
    MainScene.prototype.addArmNumOfAni = function () {
        this.updateArmNumOfAni(1);
        this.debugOperation("add armature num of animation ctrl");
    };
    MainScene.prototype.minArmNumOfAni = function () {
        this.updateArmNumOfAni(-1);
        this.debugOperation("minus armature num of animation ctrl");
    };
    MainScene.prototype.updateArmNumOfAni = function (val) {
        this.armNumOfAni += val;
        this.armNumOfAni = this.armNumOfAni > this.armNum ? this.armNum : this.armNumOfAni;
        this.armNumOfAni = this.armNumOfAni < 0 ? 0 : this.armNumOfAni;
        this.armNumOfAniText.text = "ArmNumOfAni: " + this.armNumOfAni;
        // stop all animation
        for (var i = 0; i < this.arms.length; i++) {
            var element = this.arms[i];
            if (element.animation.isPlaying)
                element.animation.stop();
        }
    };
    // animation ctrl
    MainScene.prototype.ctrlAni = function () {
        var isPlaying = this.arms.length > 0 && this.arms[0].animation.isPlaying;
        for (var i = 0; i < this.armNumOfAni; i++) {
            var element = this.arms[i];
            if (isPlaying)
                element.animation.stop();
            else
                element.animation.play();
        }
    };
    // change armature num of slot ctrl
    MainScene.prototype.addArmNumOfSlot = function () {
        this.updateArmNumOfSlot(1);
        this.debugOperation("add armature num of slot ctrl");
    };
    MainScene.prototype.minArmNumOfSlot = function () {
        this.updateArmNumOfSlot(-1);
        this.debugOperation("minus armature num of slot ctrl");
    };
    MainScene.prototype.updateArmNumOfSlot = function (val) {
        this.armNumOfSlot += val;
        this.armNumOfSlot = this.armNumOfSlot > this.armNum ? this.armNum : this.armNumOfSlot;
        this.armNumOfSlot = this.armNumOfSlot < 0 ? 0 : this.armNumOfSlot;
        this.armNumOfSlotText.text = "ArmNumOfSlot: " + this.armNumOfSlot;
    };
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
        this.slotNumOneChange = this.slotNumOneChange > MainScene.MAXSLOTNUMONECHANGE ? MainScene.MAXSLOTNUMONECHANGE : this.slotNumOneChange;
        this.slotNumOneChange = this.slotNumOneChange < 0 ? 0 : this.slotNumOneChange;
        this.slotNumOneChangeText.text = "SlotNumOneChange: " + this.slotNumOneChange;
    };
    // slot ctrl
    MainScene.prototype.ctrlSlot = function () {
        this.slotChangeIdx++;
        this.slotChangeIdx %= MainScene.MAXSLOTCHANGEIDX;
        for (var i = 0; i < this.armNumOfSlot; i++) {
            var element = this.arms[i];
            if (this.slotNumOneChange > 0) {
                element.armature.getSlot("weapon_hand_r").displayIndex = this.slotChangeIdx;
                if (this.slotNumOneChange > 1) {
                    element.armature.getSlot("weapon_hand_l").displayIndex = this.slotChangeIdx;
                }
            }
        }
    };
    MainScene.BACKGROUND_URL = "resource/background.png";
    MainScene.MAXSLOTNUMONECHANGE = 2;
    MainScene.MAXSLOTCHANGEIDX = 5;
    return MainScene;
}(Phaser.Scene));
