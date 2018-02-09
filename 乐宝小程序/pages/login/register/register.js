// pages/login/register/register.js
const app = getApp()
let countdown = 60;
let settime = function (that) {
  if (countdown == 0) {
    that.setData({
      time_show: true
    })
    countdown = 60;
    return;
  } else {
    that.setData({
      time_show:false,
      last_time:countdown
    })

    countdown--;
  }
  setTimeout(function () {
    settime(that)
  },1000)
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    last_time:'',
    time_show:true,
    countryCodes: ["+86", "+80", "+84", "+87"],
    countryCodeIndex: 0,
    animation: {},
    shake:true //防抖
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.animation = wx.createAnimation({
      timingFunction:'ease',
      duration:'200'
    })
  },
  login:function () {
    this.setData({
      submit:true
    })
    setTimeout(()=>{
      this.setData({
        submit:false
      })
    },3000)
  },
  bindCountryCodeChange: function(e){
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);

    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  clickVerify:function(){
    let that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示
    that.setData({
      time_show: (!that.data.time_show)  //false
    })
    settime(that);
  },
  register:function () {
    if(this.data.shake){ //防止多次点击
      this.animation
        .opacity(1)
        .bottom('80rpx').step()
      this.setData({
        shake:false,
        animation:this.animation.export()
      })
      setTimeout(()=>{
        this.animation.opacity(0).bottom(0).step()
        this.setData({
          animation:this.animation.export(),
          shake:true
        })
      },2000)
    }

  }

})