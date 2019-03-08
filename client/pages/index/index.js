Page({
  data: {
    image_src: "../../libs/img/image.png",
    image_height: "396",
    animationData: {}
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
  onReady: function() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    var n = 0;
    var m = true;
    setInterval(function () {
      n = n + 1;
      if (m) {
        this.animation.rotate(360 * (n)).scale(1.2, 1.2).step()
        m = !m;
      } else {
        this.animation.rotate(360 * (n)).scale(1, 1).step()
        m = !m;
      }

      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 2000)
  }
})

