Page({
  data: {
    image_src: "../../libs/img/image.png",
    animationData: {},
    image_mark_here: "image_mark_here",
    image_mark_leave: "image_mark_leave"
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
                wx.navigateTo({
                  url: '../composite/composite?url=' + cloud_callFunction_res.result.Image
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
    var myThis = this
    var animation = wx.createAnimation()
    this.animation = animation
    this.setData({
      animationData: animation.export()
    })
    var image_opacity_status = true;
    var image_src_status = true;
    setInterval(function() {
      if (image_opacity_status) {
        this.animation.opacity(0).step({
          delay: 1500,
          duration: 500
        })
        setTimeout(function() {
          if (image_src_status) {
            myThis.setData({
              image_src: "../../libs/img/image.png",
              image_mark_here: "image_mark_here",
              image_mark_leave: "image_mark_leave"
            })
          } else {
            myThis.setData({
              image_src: "../../libs/img/image2.jpg",
              image_mark_here: "image_mark_leave",
              image_mark_leave: "image_mark_here"
            })
          }
        }, 2000)
        image_opacity_status = !image_opacity_status;
      } else {
        this.animation.opacity(1).step()
        image_opacity_status = !image_opacity_status;
        image_src_status = !image_src_status;
      }
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 2000)
  }
})