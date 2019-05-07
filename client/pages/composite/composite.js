// client/pages/composite/composite.js
Page({
  data: {
    button_text: "上传照片",
    image_src: "",
    image_src_list: [],
    projectId: "",
    modelId: "",
    sysscreenHeight: ""
  },

  uploadImage() {
    var myThis = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(chooseImage_res) {
        wx.showLoading({
          title: '生成中...',
        })
        console.log("临时地址:" + chooseImage_res.tempFilePaths[0])
        wx.getFileSystemManager().readFile({
          filePath: chooseImage_res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success(base64_res) {
            wx.cloud.callFunction({
              name: "FaceMerge",
              data: {
                base64: base64_res.data,
                projectId: myThis.data.projectId,
                modelId: myThis.data.modelId
              },
              success(cloud_callFunction_res) {
                wx.hideLoading()
                wx.showToast({
                  title: '成功',
                  icon: 'success',
                  duration: 500
                })
                console.log(cloud_callFunction_res)
                myThis.setData({
                  image_src: cloud_callFunction_res.result.Image,
                  button_text: "重新生成"
                })
              },
              fail(err) {
                console.log(err)
                wx.hideLoading()
                wx.showModal({
                  title: '失败',
                  content: "人脸融合失败，请重试！"
                })
              }
            })
          }
        })
      }
    })
  },

  previewImage:function() {
    var newarray = [this.data.image_src]
    this.setData({
      image_src_list: newarray
    })
    console.log("数据" + this.data.image_src_list)
    wx.previewImage({
      urls: this.data.image_src_list
    })
  },

  onLoad: function(options) {
    var myThis = this;
    this.setData({
      projectId: options.projectId,
      modelId: options.modelId,
      image_src: options.image_src
    });
    console.log(options.projectId + options.modelId + options.image_src)
    wx.getSystemInfo({
      success(res) {
        console.log(res.screenHeight)
        myThis.setData({
          sysscreenHeight: res.screenHeight - 660
        })
      }
    })
  }
})