// client/pages/composite/composite.js
Page({
  data: {
    button_text: "上传照片",  //首页按钮内容显示“上传照片”
    image_src: "../../libs/img/man.jpg", //替换为你要融合前的模型图片地址
    image_src_list: [],  //图片预览地址，请留空
    projectId: "101124", //腾讯云人脸融合活动ID
    modelId: "qc_101124_173657_4", //腾讯云人脸融合素材ID
    sysscreenHeight: "" //自适应手机高度，请留空
  },

  uploadImage() { //图片上传函数，由前端上传照片按钮调用
    var myThis = this;
    wx.chooseImage({ //微信小程序选择图片API
      count: 1, //最多可以选择的图片张数
      sizeType: ['compressed'], //所选的图片的尺寸，这里选择压缩图
      sourceType: ['album', 'camera'], //选择图片的来源，可从相机和相册
      success(chooseImage_res) { //接口调用成功的回调函数
        wx.showLoading({ //显示 loading 提示框API
          title: '生成中...',
        })
        wx.getFileSystemManager().readFile({ //获取全局唯一的文件管理器API，并用readFile读取本地文件内容
          filePath: chooseImage_res.tempFilePaths[0], //要读取的文件的路径，这里是本地上传图片文件的临时目录
          encoding: 'base64', //指定读取文件的字符编码，这里指定“base64”
          success(base64_res) { //接口调用成功的回调函数
            wx.cloud.callFunction({ //调用云函数API
              name: "FaceMerge", //云函数名
              data: { //传递给云函数的参数
                base64: base64_res.data, //readFile中生成的base64编码文件
                projectId: myThis.data.projectId, //data中指定的projectId
                modelId: myThis.data.modelId //data中指定的modelId
              },
              success(cloud_callFunction_res) { //接口调用成功的回调函数
                wx.hideLoading() //隐藏 loading 提示框
                wx.showToast({ //显示消息提示框
                  title: '成功', //	提示的内容
                  icon: 'success', //图标
                  duration: 500 //提示的延迟时间
                })
                myThis.setData({
                  image_src: cloud_callFunction_res.result.Image, //将云函数返回的URL地址写在data中
                  button_text: "重新生成" //按钮变为“重新生成”
                })
              },
              fail(err) { //接口调用失败的回调函数
                console.log(err) //控制台打印错误
                wx.hideLoading() //隐藏 loading 提示框
                wx.showModal({ //显示消息提示框
                  title: '失败', //提示的内容
                  content: "人脸融合失败，请重试！"
                })
              }
            })
          }
        })
      }
    })
  },

  onLoad: function () { //微信生命周期函数，小程序载入中执行
    var myThis = this;
    wx.getSystemInfo({ //获取系统信息
      success(res) { //接口调用成功的回调函数
        myThis.setData({
          sysscreenHeight: res.screenHeight - 660 //获取屏幕高度接口
        })
      }
    })
  }
})