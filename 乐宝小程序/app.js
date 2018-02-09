App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.request({
      url:'http://j.diankuai.com/SmallWeChat/jwt',
      success:res=>{
        console.log(res)
        wx.request({
          url:'http://j.diankuai.com/SmallWeChat/jwtGet',
          header:{
            "token":res.data.data.token
          }
        })
      }
    })
// 登录
    wx.login({
      success: res => {
        let code = res.code
        wx.getUserInfo({
          success: data => {
            let encryptedData = data.encryptedData
            let iv = data.iv
            let rawData = data.rawData
            let signature = data.signature
            wx.request({
              url: 'http://j.diankuai.com/SmallWeChat/sendCode',
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded"
              },
              data: {
                'code': code,
                'encryptedData': encryptedData,
                'iv': iv,
                'rawData': rawData,
                'signature': signature
              },
              success: function (e) {
                console.log(1)
                // console.log([code,encryptedData,iv,rawData,signature])
                // let ww = e.data.replace(/\\/g,'')
                // console.log(ww)
                console.log(e)
              }
            })
          }
        })

      }
    })
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        this.globalData.userInfo = res.userInfo

        // console.log(0,res)
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (this.userInfoReadyCallback) {
          this.userInfoReadyCallback(res)
        }
      },
      fail: err => {
        console.log(1, err)
        wx.openSetting({
          success: res => {
            // console.log(2,res)
          },
          fail: err => {
            // console.log(3,err)
          }
        })
      }
    })
  },
  globalData: {userInfo: null}
})
﻿