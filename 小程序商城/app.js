//app.js

App({
  data:{
    state:1,
    token:'',
    code:""
  },
  onLaunch: function () {
    this.login()
  },
 login(){
    console.log("我是login")
    var vm=this
    wx.getStorage({
      key: 'token',
      success: function (res) {
        vm.data.token=res.data
        if (!vm.data.token) {
          wx.login({
            success: function (res) {
              console.log(res)
              vm.data.code = res.code
              if (res.code) {
                wx.getUserInfo({
                  //得到rawData, signatrue, encryptData 
                  success: function (data) {
                    console.log(data)
                    //发起登录请求
                    wx.request({
                      url: 'http://j.diankuai.com/SmallWeChat/sendCode',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      method: "POST",
                      data: {
                        rawData: data.rawData,
                        signature: data.signature,
                        encryptedData: data.encryptedData,
                        iv: data.iv,
                        code: vm.data.code
                      },
                      success: function (res) {
                        console.log(res)
                        if (res.data.code == 200) {
                          vm.data.token = res.data.token
                          wx.setStorage({
                            key: "token",
                            data: res.data.token
                          })
                        }
                      }
                    })
                  }
                })

              } else {
                console.log('获取用户登录态失败！' + res.errMsg)
              }

            }
          })
        } 
      }
    })
  

  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  }
})
