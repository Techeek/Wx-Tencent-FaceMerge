const comm = require('comm.js')

Page({
  helloMINA() {
    comm.sayHello('MINA')
  },
  goodbyeMINA() {
    comm.sayGoodbye('MINA')
  },
  data: {
    animation_translate: {},
    animationData: {},
    image_src: "../../libs/img/image.png",
    image_mark_here: "image_mark_here",
    image_mark_leave: "image_mark_leave",
    projectId: "101000",
    modelId: "qc_101000_113732_2",
    sysscreenHeight:""
  },

  composite() {
    var myThis = this
    wx.navigateTo({
      url: '../composite/composite?projectId=' + myThis.data.projectId + '&modelId=' + myThis.data.modelId + '&image_src=' + myThis.data.image_src
    })
  },
  onLoad: function() {
    var myThis = this;
    var animation = wx.createAnimation();
    this.animation = animation;
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
              image_mark_leave: "image_mark_leave",
              modelId: "qc_101000_113732_2"
            })
          } else {
            myThis.setData({
              image_src: "../../libs/img/poster_woman.jpg",
              image_mark_here: "image_mark_leave",
              image_mark_leave: "image_mark_here",
              modelId: "qc_101000_114812_70"
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
    wx.getSystemInfo({
      success(res){
        console.log(res.screenHeight)
        myThis.setData({
          sysscreenHeight: res.screenHeight - 650
        })
      }
    })
  }
})