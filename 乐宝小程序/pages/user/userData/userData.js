// pages/user/userData/userData.js
Page({
  data: {
    touxiang:'../../../image/download.jpg',
    name:'单身狗',
    array: ['男', '女'],
    index:0
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  tou:function () {
    console.log(123)
    wx.chooseImage({
      count:1,
      success:res=> {
        this.setData({
          touxiang:res.tempFilePaths[0]
        })
      }
    })
  },
  nameTap:function (e) {
    this.setData({
      name:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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