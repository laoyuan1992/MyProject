"use strict";
cc._RF.push(module, 'a3d1ejq7lhB2a4OzfJXtczH', 'MemoryManager');
// Script/Tool/System/MemoryManager.js

"use strict";

//内存管理模块
//只管理图片内存数量，这个是大头
var outModule = {};
var local = {};

/**
 * 更具图片格式返回一个像素所占字节
 * @param {*} pixelFormat 
 */
local.getPixelFormatSize = function (pixelFormat) {
    switch (pixelFormat) {
        case cc.Texture2D.PixelFormat.RGB565:
            return 16;
        case cc.Texture2D.PixelFormat.RGB5A1:
            return 16;
        case cc.Texture2D.PixelFormat.RGBA4444:
            return 16;
        case cc.Texture2D.PixelFormat.RGB888:
            return 24;
        case cc.Texture2D.PixelFormat.RGBA8888:
            return 32;
        case cc.Texture2D.PixelFormat.A8:
            return 8;
        case cc.Texture2D.PixelFormat.I8:
            return 8;
        case cc.Texture2D.PixelFormat.AI88:
            return 16;
    }
    return 16;
};

/**
 * 获取一张图片所占的内存
 * @param {Number} width 
 * @param {Number} height 
 * @param {enum} pixelFormat 图片格式
 */
local.getImgUseMemoryBySize = function (width, height, pixelFormat) {
    return width * height * local.getPixelFormatSize(pixelFormat) / (8 * 1024 * 1024);
};

/**
 * 获取当前图片使用的内存数量
 * 返回的数量是MB
 */
outModule.getNowSpriteUseMemory = function () {
    var textureArr = cc.textureCache.getAllTextures();
    var totleUseMemory = 0;
    textureArr.forEach(function (oneTexture) {
        totleUseMemory = totleUseMemory + local.getImgUseMemoryBySize(oneTexture.pixelWidth, oneTexture.pixelHeight, oneTexture.pixelFormat);
    });
    return totleUseMemory;
};

/**
 * 检测内存情况
 */
outModule.memoryCheck = function () {
    if (outModule.getNowSpriteUseMemory() > g_MAX_MEMORY_NUM) {
        outModule.clearMemory();
    }
};

/**
 * 开始自动清除内存
 *  {
        prefabPath: prefabPath,
        prefab: prefab,
        prefabNodeArr: [],
        frequency: frequency || -1 -1表示永远不会被清除
    }
 */
outModule.clearMemory = function () {
    if (!g_AUTO_CLEAR_MEMORY_FLAG) {
        return;
    }
    var prefabSave = g_PrefabManager.prefabSave;
    var clearArr = [];
    var allPrefabArr = [];
    //这个是不可以清除的预制体数组
    var canNotClearArr = [];
    for (var key in prefabSave) {
        if (!prefabSave.hasOwnProperty(key) || !prefabSave[key]) {
            continue;
        }
        allPrefabArr.push(prefabSave[key]);
    }
    //先排除不可清理的
    allPrefabArr.forEach(function (onePrefabData) {
        //如果prefabNodeArr里面有一个节点的node的active是true的话就不能清除了
        var i = void 0,
            len = onePrefabData.prefabNodeArr.length;
        for (i = 0; i < len; i++) {
            if (onePrefabData.prefabNodeArr[i].active) {
                canNotClearArr.push(onePrefabData);
                return;
            }
        }
        if (onePrefabData.frequency !== -1) {
            clearArr.push(onePrefabData);
        }
    });
    if (g_USE_STRONG_CLEAR_MODE) {
        g_PrefabManager.clearPrefabInStrongMode(clearArr, canNotClearArr);
        g_SpriteFrameManager.clearDestroyNode();
        return;
    }
    //按frequency从小到大排序
    clearArr.sort(function (data_1, data_2) {
        return data_1.frequency - data_2.frequency;
    });
    //再次判断，如果清除的prefab有依赖和canNotClearArr里面的prefab冲突，则不能被清除

    var _loop = function _loop() {
        var newClearArr = [];
        clearArr.forEach(function (onePrefabData) {
            if (g_PrefabManager.judgeCanClearPrefab(onePrefabData, canNotClearArr)) {
                newClearArr.push(onePrefabData);
            }
        });
        if (newClearArr.length === clearArr.length) {
            return "break";
        }
        clearArr = newClearArr;
    };

    while (true) {
        var _ret = _loop();

        if (_ret === "break") break;
    }
    //开始清除，剩余内存小于g_MAX_MEMORY_NUM时停止
    g_PrefabManager.clearPrefabWithoutUseSpreite(clearArr);
    g_SpriteFrameManager.clearDestroyNode();
};

module.exports = outModule;

cc._RF.pop();