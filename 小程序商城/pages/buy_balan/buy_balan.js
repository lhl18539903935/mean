// pages/balance/balance.js
var api = require('../../utils/ajax.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm=this
    let item = JSON.parse(options.item_id);
    api.post({
      url: "/Template/buy",
      data: {
        item_id:item.item_id,
        num: item.num,
        sku: item.sku,
        type: 'onbuy'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.data.address[0]){
          vm.data.address_=res.data.address[0]
        }
        vm.setData({
          title: res.data.buy_lists[0].title,
          price: res.data.buy_lists[0].price,
          num: res.data.buy_lists[0].num,
          pic_url: res.data.buy_lists[0].pic_url,
          post_fee: res.data.buy_lists[0].post_fee,
          payment: res.data.payment,
          address: vm.data.address_
        })
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