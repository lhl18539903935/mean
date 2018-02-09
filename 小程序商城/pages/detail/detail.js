// pages/detail/detail.js
var api = require('../../utils/ajax.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm=this
    console.log(options.order_id)
    api.post({
        url: '/Template/detail',
        data:{
          order_id: options.order_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success:function(res){
          console.log(res)
          if(res.data==203){
            wx.removeStorage({
              key: 'token',
              success: function (res) {
                console.log(res.data)
              }
            })
            app.login()
          }
          vm.setData({
            order_no: res.data.detail.order_no,
            create_time: res.data.detail.create_time,
            detail_list:res.data.detail.item,
            address: res.data.detail.address,
            post_fee: res.data.detail.post_fee,
            status_name: res.data.detail.status_name,
            name: res.data.detail.name,
            mobile: res.data.detail.mobile,
            payment: res.data.detail.payment
          })
        }
    })
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