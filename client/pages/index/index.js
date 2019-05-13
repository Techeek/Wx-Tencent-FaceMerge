// index.js
Page({
  data: {
    current: 0, // 当前选中的素材
    materials: [{ // 素材列表
      projectId: '101369', // 腾讯云人脸融合活动ID
      materialId: 'qc_101369_173608_3', // 腾讯云人脸融合素材ID
      materialSrc: '/imgs/man.jpg', // 该素材本地地址
    }, {
      projectId: '101369', // 腾讯云人脸融合活动ID
      materialId: 'qc_101369_173613_4', // 腾讯云人脸融合素材ID
      materialSrc: '/imgs/woman.jpg', // 该素材本地地址
    }],
    buttonText: '选择此素材融合',  // 首页按钮显示内容
    result: {}, // 融合结果，请留空
  },

  // 切换素材事件
  switchMaterial(event) {
    if (!event || !event.detail) return;
    this.setData({
      current: event.detail.current,
    });
  },

  // 点击按钮事件：选择照片进行融合
  choose() {
    const self = this;
    // 调用微信小程序选择图片API
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数
      sizeType: ['compressed'], // 所选的图片的尺寸，这里选择压缩图
      sourceType: ['album', 'camera'], // 选择图片的来源，可从相机和相册
      success({ tempFilePaths }) { // 选择照片接口调用成功的回调函数
        const tempFilePath = tempFilePaths[0];
        console.log('选择照片结果', tempFilePath);
        // 调用 this 的 upload 方法，将选择的图片上传
        self.upload(tempFilePath);
      },
      fail: console.error,
    });
  },

  // 上传图片方法
  upload(tempFilePath) {
    const self = this;
    // 调用显示 loading 提示框API
    wx.showLoading({
      title: '上传中',
      mask: true
    });
    // 调用微信小程序获取图片信息API
    wx.getFileInfo({
      filePath: tempFilePath, // 本地文件路径
      success({ digest, size }) { // 获取图片信息成功的回调函数，digest 为文件的MD5
        // 调用小程序云开发上传图片API
        wx.cloud.uploadFile({
          cloudPath: `faces/${digest}.jpg`, // 云存储路径，图片的目标存储地址
          filePath: tempFilePath, // 本地文件路径
          success({ fileID }) { // fileID 为小程序云开发云存储地址
            console.log('上传照片结果', fileID);
            // 调用 this 的 submit 方法，将上传的图片提交融合
            self.submit(fileID);
          },
          fail: self.error,
        });
      },
      fail: self.error,
    });
  },

  // 提交融合图片方法
  submit(fileId) {
    const self = this;
    wx.showLoading({
      title: '融合中',
      mask: true
    });
    const currentMaterial = this.data.materials[this.data.current]; // 当前所选择的素材
    console.log('所选素材', currentMaterial);
    // 调用小程序云开发云函数，提交融合信息
    wx.cloud.callFunction({
      name: 'FaceFusion',
      data: {
        fileId, // 上传的文件云存储地址
        projectId: currentMaterial.projectId, // 当前选择素材对应的腾讯云人脸融合活动ID
        materialId: currentMaterial.materialId, // 当前选择素材对应的腾讯云人脸融合素材ID
      },
      success({ result }) {
        console.log('融合人脸结果', result);
        if (!result || result.code !== 0 || !result.data.Image) return self.error(result); // 错误处理
        self.data.result[currentMaterial.materialId] = result.data.Image; // 将当前融合的素材结果保存
        self.setData({
          result: self.data.result, // 将返回的融合结果赋值给页面数据
        });
        wx.hideLoading(); // 调用隐藏 loading 提示框API
      },
      fail: self.error,
    })
  },

  // 错误处理
  error(err) {
    console.error(err);
    wx.showToast({
      title: err && err.message ? err.message : '融合失败',
      icon: 'none',
    });
  },
});
