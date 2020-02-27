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
        _this.armNum = 0;
        _this.arms = {};
        return _this;
    }
    MainScene.prototype.preload = function () {
        // this.game.time.advancedTiming = true;
        this.load.image(MainScene.BACKGROUND_URL, MainScene.BACKGROUND_URL);
        this.load.atlas("sprites", "resource/spritesheet.png", "resource/spritesheet.json");
        this.load.dragonbone("mecha_1004d", "resource/mecha_1004d_show/mecha_1004d_show_tex.png", "resource/mecha_1004d_show/mecha_1004d_show_tex.json", "resource/mecha_1004d_show/mecha_1004d_show_ske.json");
        this.load.dragonbone("weapon_1004", "resource/weapon_1004_show/weapon_1004_show_tex.png", "resource/weapon_1004_show/weapon_1004_show_tex.json", "resource/weapon_1004_show/weapon_1004_show_ske.json");
    };
    MainScene.prototype.create = function () {
        this.add.image(0, 0, MainScene.BACKGROUND_URL);
        this.factory = this.dragonbone.factory;
        // weapons
        // this.add.armature("weapon", "weapon_1004");
        var textStyle = { fontSize: 18, color: "#FFFFFF", align: "center" };
        this.fpsText = this.add.text(10, 0, "FPS: --", textStyle);
        this.armNumText = this.add.text(40, 40, "ArmNum: 0", textStyle);
        // buttons
        var addArmNumBtn = this.add.image(160, 40, "sprites", "increase.png");
        addArmNumBtn.setInteractive();
        addArmNumBtn.on("pointerdown", this.addArmNum, this);
        var minArmNumBtn = this.add.image(15, 40, "sprites", "reduce.png");
        minArmNumBtn.setInteractive();
        minArmNumBtn.on("pointerdown", this.minArmNum, this);
    };
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
            console.log("add arm");
            var arm = this.add.armature("mecha_1004d", "mecha_1004d");
            arm.x = Math.random() * maxX;
            arm.y = Math.random() * maxY;
            this.arms.push(arm);
        }
        // minus
        while (this.armNum < this.arms.length) {
            console.log("minus arm");
            var arm = this.arms.pop;
            arm.destroy();
        }
    };
    MainScene.BACKGROUND_URL = "resource/background.png";
    return MainScene;
}(Phaser.Scene));
