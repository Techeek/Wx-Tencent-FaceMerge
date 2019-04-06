还记得2017年八一建军节在朋友圈刷屏的“军装照”吗？而这些“军装照”通通来自一支名叫《快看呐！这是我的军装照》的 H5 ，由人民日报创意出品，腾讯云及天天P图提供人脸融合图像处理支持。那么，我们能够自己尝试去开发一款人脸融合产品嘛？本次项目通过一个小程序利用腾讯云AI平台人脸融合API，去开发一款简单的人脸融合Demo，用户只需要上传自己的照片，即可实现类似“军装照”图片融合功能。

# 下载项目

```shell
git clone https://git.code.tencent.com/Techeek/Wx-Tencent-FaceMerge.git
cd Wx-Tencent-FaceMerge
```

# 修改配置

### 小程序配置

打开`project.config.json`文件，修改`wx7cd835dc0ab78332`为你在微信开放平台申请到的APPID。

```json
"appid": "wx7cd835dc0ab78332"
```

### 服务端配置

打开`server/FaceMerge/config.js`文件夹，修改`ABCDEFGHIJKLMNOPQRSTUVWXYZ`为你在腾讯云申请的`SecretId`和`SecretKey`。

```javascript
module.exports = {
  SecretId: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', //腾讯云的SecretId，请替换成你自己的
  SecretKey: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' //腾讯云的SecretKey，请替换成你自己的
};
```

打开`server/FaceMerge/index.js`文件夹，修改`test-aa10b0`为你申请云开发的环境ID。

```javascript
cloud.init({
  env: 'test-aa10b0'
}) //云开发初始化
```

配置完成后，部署云开发服务。

### 客户端配置

打开`client/app.js`文件夹，修改`test-aa10b0`为你申请云开发的环境ID。

```javascript
wx.cloud.init({
  env: 'test-aa10b0'
})
```

打开`client/pages/index/index.js`文件夹，按照下面的内容修改数据。

```javascript
    image_src: "../../libs/img/man.jpg", //修改为你准备好的模特素材图片位置。
    projectId: "101124", //修改为腾讯云人脸融合申请到的活动ID。
    modelId: "qc_101124_173657_4", //修改为腾讯云人脸融合申请到的素材ID。
```

配置完成后，保存配置，即可调用云开发。

***

项目分为`master`和`dev`分支，默认为`master`分支，原理相同。UI展示方式不同，推荐有开发经验的小伙伴使用`dev`分支。