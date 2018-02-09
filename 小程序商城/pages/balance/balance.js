// pages/balance/balance.js
var api = require('../../utils/ajax.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_box:[],
    order:'',
    sku:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.object)
    var obj = JSON.parse(options.object)
    console.log(obj)
    var vm = this
    api.post({
      url: '/Template/buy',
      data: {
        type: "oncart",
        check_box: obj.checkbox,
        dis: 1,
        num: obj.order,
        sku_id: obj.sku
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if(res.code==200){
          vm.setData({
            buy_lists: res.data.buy_lists,
            post_fee: res.data.post_fee,
            payment: res.data.payment,
            address: res.data.address[0]
          })
        }
        if(res.code==203){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }
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