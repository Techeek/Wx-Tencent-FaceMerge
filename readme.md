# 下载项目

```bash
git clone https://git.code.tencent.com/Techeek/Wx-Tencent-FaceMerge.git
cd Wx-Tencent-FaceMerge
git checkout pro # 切换分支
```

# 修改配置

### 小程序配置

打开 `project.config.json` 文件，修改 `appid` 为你在微信开放平台申请到的APPID。

```json
"appid": "wx7cd835dc0ab78332"
```

### 服务端配置

新建 `server/FaceFusion/config.js` 文件，修改 `ABCDEFGHIJKLMNOPQRSTUVWXYZ` 为你在腾讯云申请的 `SecretId` 和 `SecretKey` 。

```javascript
module.exports = {
  SecretId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // 腾讯云的SecretId，请替换成你自己的
  SecretKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // 腾讯云的SecretKey，请替换成你自己的
};
```

打开 `server/FaceFusion/index.js` 文件夹，修改 `test-aa10b0` 为你申请云开发的环境ID。

```javascript
// 云开发初始化
cloud.init({
  env: 'test-aa10b0'
});
```

配置完成后，将 `server/FaceFusion` 部署至云开发服务。

### 客户端配置

打开 `client/app.js` 文件夹，修改 `test-aa10b0` 为你申请云开发的环境ID。

```javascript
wx.cloud.init({
  env: 'test-aa10b0'
});
```

打开 `client/pages/index/index.js` 文件夹，按照下面的内容修改数据。

```javascript
  materials: [{ // 素材列表
    projectId: '101369', // 腾讯云人脸融合活动ID
    materialId: 'qc_101369_173608_3', // 腾讯云人脸融合素材ID
    materialSrc: '/imgs/man.jpg', // 该素材本地地址
  }, {
    projectId: '101369', // 腾讯云人脸融合活动ID
    materialId: 'qc_101369_173613_4', // 腾讯云人脸融合素材ID
    materialSrc: '/imgs/woman.jpg', // 该素材本地地址
  }],
```

配置完成后，保存配置，即可调用云开发。

***

项目分为`master`和`dev`分支，默认为`master`分支，原理相同。UI展示方式不同，推荐有开发经验的小伙伴使用`dev`分支。