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
        _this.isMoving = false;
        _this.movementX = 0;
        _this.moveDirection = true;
        return _this;
    }
    MainScene.prototype.preload = function () {
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");
        // armature resource
        this.load.dragonbone("human01", "resource/human01/bones_human01_tex.png", "resource/human01/bones_human01_tex.json", "resource/human01/bones_human01_ske.dbbin", null, null, { responseType: "arraybuffer" });
        // replace target
        // this.load.dragonbone(
        //     "weapon_1004",
        //     "resource/weapon_1004_show/weapon_1004_show_tex.png",
        //     "resource/weapon_1004_show/weapon_1004_show_tex.json",
        //     "resource/weapon_1004_show/weapon_1004_show_ske.json"
        // );
        this.load.dragonbone("human02", "resource/human02/bones_human01_tex.png", "resource/human02/bones_human01_tex.json", "resource/human02/bones_human01_ske.dbbin", null, null, { responseType: "arraybuffer" });
        // MultiTextureBatching
    };
    MainScene.prototype.create = function () {
        this.factory = this.dragonbone.factory;
        // right hand weapons 
        // this.add.armature("weapon", "weapon_1004");
        this.add.armature("Armature", "human02");
        var textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        // fps
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        this.fpsText.depth = 999;
        // armature num
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        var addArmNumBtn = this.add.image(200, 40, "sprites", "increase.png");
        var minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        // slot ctrl num
        // this.slotNumOneChangeText = this.add.text(40, 80, "SlotNumOneChange: 0", textStyle);
        // let addSlotOneChangeBtn = this.add.image(260, 80, "sprites", "increase.png");
        // let minSlotOneChangeBtn = this.add.image(15, 80, "sprites", "reduce.png");
        // slot ctrl
        // let slotCtrlText = this.add.text(15, 120, "SlotCtrl", textStyle);
        // let slotCtrlBtn = this.add.image(120, 120, "sprites", "increase.png");
        // texture ctrl
        var textureCtrlText = this.add.text(15, 160, "TextureCtrl", textStyle);
        var textureCtrlBtn = this.add.image(150, 160, "sprites", "increase.png");
        // animation ctrl
        var aniCtrlText = this.add.text(15, 200, "AniCtrl", textStyle);
        var aniCtrlBtn = this.add.image(120, 200, "sprites", "increase.png");
        // movement ctrl
        var moveCtrlText = this.add.text(15, 240, "MoveCtrl", textStyle);
        var moveCtrlBtn = this.add.image(120, 240, "sprites", "increase.png");
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
    };
    MainScene.prototype.update = function () {
        if (this.isMoving) {
            var speed = 1;
            var maxMovementX = 50;
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
            for (var i = 0; i < this.arms.length; i++) {
                var element = this.arms[i];
                element.x += this.moveDirection ? speed : -speed;
            }
        }
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
            var arm = this.add.armature("Armature", "human01");
            arm.x = 300 + Math.random() * (maxX - 300);
            arm.y = 100 + Math.random() * (maxY - 100);
            // arm.scale = 0.25;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            var arm = this.arms.pop;
            arm.dispose();
        }
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
        this.slotNumOneChange = this.slotNumOneChange > MainScene.SLOTSTOBECHANGED.length ? MainScene.SLOTSTOBECHANGED.length : this.slotNumOneChange;
        this.slotNumOneChange = this.slotNumOneChange < 0 ? 0 : this.slotNumOneChange;
        this.slotNumOneChangeText.text = "SlotNumOneChange: " + this.slotNumOneChange;
    };
    // slot ctrl
    MainScene.prototype.ctrlSlot = function () {
        for (var i = 0; i < this.arms.length; i++) {
            var element = this.arms[i];
            for (var j = 0; j < this.slotNumOneChange; j++) {
                var displayName = MainScene.WEAPONLIST[j % MainScene.WEAPONLIST.length];
                this.factory.replaceSlotDisplay("weapon_1004", "weapon", "weapon_r", displayName, element.armature.getSlot(MainScene.SLOTSTOBECHANGED[j]));
            }
        }
        this.debugOperation("change slot");
    };
    // texture ctrl
    MainScene.prototype.ctrlTexture = function () {
        for (var i = 0; i < this.arms.length; i++) {
            var element = this.arms[i];
            var slots = element.armature.getSlots();
            for (var j = 0; j < slots.length; j++) {
                var slot = slots[j];
                this.factory.replaceSlotDisplay("human02", "Armature", slot.name, slot.name, slot); // 项目中displayName == slotName
            }
        }
        this.debugOperation("change texture");
    };
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
    // move ctrl
    MainScene.prototype.ctrlMove = function () {
        this.isMoving = !this.isMoving;
        this.debugOperation("change movement");
    };
    MainScene.WEAPONLIST = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
    MainScene.SLOTSTOBECHANGED = ["weap_barm_3", "weap_farm_3", "weap_farm_1", "weap_barm_1", "head_spec_3", "head_spec_1"];
    return MainScene;
}(Phaser.Scene));
