// client/pages/composite/composite.js
Page({
  data: {
    button_text: "上传照片",
    image_src: "../../libs/img/man.jpg",
    projectId: "101124",
    modelId: "qc_101124_173657_4",
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

  onLoad: function() {
    var myThis = this;
    wx.getSystemInfo({
      success(res) {
        myThis.setData({
          sysscreenHeight: res.screenHeight - 660
        })
      }
    })
  }
})