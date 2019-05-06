Page({
  data: {
    animation_translate: {},
    animationData: {},
    image_src: "../../libs/img/man.jpg",
    image_mark_here: "image_mark_here",
    image_mark_leave: "image_mark_leave",
    projectId: "101124",
    modelId: "qc_101124_221646_13",
    sysscreenHeight: ""
  },

  composite() {
    var myThis = this
    wx.navigateTo({
      url: '../composite/composite?projectId=' + myThis.data.projectId + '&modelId=' + myThis.data.modelId + '&image_src=' + myThis.data.image_src
    })
  },
  onLoad: function () {
    var myThis = this;
    var animation = wx.createAnimation();
    this.animation = animation;
    var image_opacity_status = true;
    var image_src_status = true;
    setInterval(function () {
      if (image_opacity_status) {
        this.animation.opacity(0).step({
          delay: 600,
          duration: 600
        })
        setTimeout(function () {
          if (image_src_status) {
            myThis.setData({
              image_src: "../../libs/img/woman.jpg",
              image_mark_here: "image_mark_leave",
              image_mark_leave: "image_mark_here",
              modelId: "qc_101124_221650_14"
            })
          } else {
            myThis.setData({
              image_src: "../../libs/img/man.jpg",
              image_mark_here: "image_mark_here",
              image_mark_leave: "image_mark_leave",
              modelId: "qc_101124_221646_13"
            })
          }
        }, 1200)
        image_opacity_status = !image_opacity_status;
      } else {
        this.animation.opacity(1).step()
        image_opacity_status = !image_opacity_status;
        image_src_status = !image_src_status;
      }
      this.setData({
        animationData: this.animation.export()
      })
    }.bind(this), 1300)
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