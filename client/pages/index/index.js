Page({
  data: {
    image_src: "../../libs/img/image.png",
    image_height: "396",
    image_opacity: "1"
  },
  UploadImage() {
    var myThis = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(chooseImage_res) {
        wx.showLoading({
          title: '加载中...',
        })
        console.log("临时地址:" + chooseImage_res.tempFilePaths[0])
        wx.getFileSystemManager().readFile({
          filePath: chooseImage_res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success(base64_res) {
            wx.cloud.callFunction({
              name: "FaceMerge",
              data: {
                base64: base64_res.data
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
                  image_height: 253
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
    wx.cloud.init({
      env: 'test-aa10b0'
    })
  },
  onReady:function(){
    var myThis = this
    setTimeout(function () {
      var image_opacity = 1
      for (var i = 0; i < 200; i++) {
        image_opacity = image_opacity - 0.005
        myThis.setData({
          image_opacity: image_opacity
        })
      }
      myThis.setData({
        image_src: "../../libs/img/image2.jpg"
      })
      for (var i = 0; i < 200; i++) {
        image_opacity = image_opacity + 0.005
        myThis.setData({
          image_opacity: image_opacity
        })
      }
    }, 3000)
  }
})