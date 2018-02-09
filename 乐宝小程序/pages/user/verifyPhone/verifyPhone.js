// pages/user/verifyPhone/verifyPhone.js
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
    time_show:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  clickVerify:function(){
    let that = this;
    // 将获取验证码按钮隐藏60s，60s后再次显示
    that.setData({
      time_show: (!that.data.time_show)  //false
    })
    settime(that);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})