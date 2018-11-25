(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Tool/System/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b144eZyH+5Nt5B6cd/2VC21', 'Game', __filename);
// Script/Tool/System/Game.js

'use strict';

/*global module, require, cc, client */
/**
 * @desc 全局模块
 * @author Administrator
 */
window.g_GAME_SCENE_UI_NODE = 1;
window.g_GAME_SCENE_ALERT_NODE = 2;
window.g_GAME_SCENE_NET_NODE = 3;

window.g_LanguageType = {};
window.g_LanguageType.CHS = 'CHS';
window.g_LanguageType.EN = 'EN';

//这边开始判断是哪个语言
window.g_LanguageTypeSelect = window.g_LanguageType.CHS;
window.g_LanguageObj = require('Language_' + window.g_LanguageTypeSelect);

//基础框架相关
//多语言工具
window.g_LanguageTool = require('LanguageTool');
//预制件加载工具
window.g_PrefabManager = require('PrefabManager');
//动态场景管理工具
window.g_GameSceneManager = require('GameSceneManager');
//滑动列表工具
window.g_ScrollViewTool = require('ScrollViewTool');
//日志工具
window.g_LogTool = require('LogTool');
//图集管理工具
window.g_SpriteFrameManager = require('SpriteFrameManager');
//Json数据管理工具
window.g_JsonDataTool = require('JsonDataTool');
//客户端事件工具
window.g_EventManager = require('EventManager');
//内存管理工具
window.g_MemoryManager = require('MemoryManager');

//内存管理选项
//内存使用超过600MB开始自动清除内存
window.g_MAX_MEMORY_NUM = 600;
//使用开启自动清理内存
window.g_AUTO_CLEAR_MEMORY_FLAG = true;
//是否启动强清除模式，这种模式下所有的隐藏的界面都会被清除
window.g_USE_STRONG_CLEAR_MODE = true;

//主场景相关结点缓存
window.g_GameScene = {};
window.g_GameScene.UINode = undefined;
window.g_GameScene.AlertNode = undefined;
window.g_GameScene.NetNode = undefined;

//************************************************************
//游戏相关
//************************************************************
window.g_GameGlobalManager = require('GameGlobalManager');
window.g_GameTool = require('GameTool');
window.g_GlobalData = require('GlobalData');
window.g_BattleManager = require('BattleManager');
window.g_GameData = require('GameData');

var outModule = {};

/**
 * 初始化的时候加载所有需要的数据
 * @param {Function} oneTaskFinishCb 完成一个任务的回调
 * @param {Function} finishCb 所有数据加载完成的回调
 */
outModule.init = function (oneTaskFinishCb, finishCb) {
    var finishNum = 0;
    var TASK_NUM = 3;
    window.g_PrefabManager.init(function () {
        finishNum++;
        if (finishNum === TASK_NUM && finishCb) {
            finishCb();
        }
        if (oneTaskFinishCb) {
            oneTaskFinishCb(finishNum / TASK_NUM);
        }
    });
    window.g_SpriteFrameManager.init(function () {
        finishNum++;
        if (finishNum === TASK_NUM && finishCb) {
            finishCb();
        }
        if (oneTaskFinishCb) {
            oneTaskFinishCb(finishNum / TASK_NUM);
        }
    });
    window.g_JsonDataTool.init(function () {
        finishNum++;
        if (finishNum === TASK_NUM && finishCb) {
            finishCb();
        }
        if (oneTaskFinishCb) {
            oneTaskFinishCb(finishNum / TASK_NUM);
        }
    });
};

module.exports = outModule;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        