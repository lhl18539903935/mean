// pages/address/address.js
var app=getApp()
// var api = require('../../utils/ajax.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    choose:false,
    index:'',
    token:'',
    address_id:'',
    List:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('app:'+app.data.token)
    this.getaddresslist()
  },
  address_id(e){
    var vm=this
    vm.data.address_id=e.currentTarget.id
    wx.setStorage({
      key: 'address_id',
      data: vm.data.address_id,
    })
    wx.navigateTo({
      url: '../edit_address/edit_address',
    })
  },
  getaddresslist(){
    var vm = this
    wx.request({
      url: 'http://j.diankuai.com/Template/addressList',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN": app.data.token
      },
      success: function (res) {
        console.log(res)
        if(res.data.data.length!=0){
          vm.data.List = res.data.data.addressList
        }
        if (res.data.code == 200) {
          vm.setData({
            addresslist: vm.data.List 
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
  add_address(){
    // wx.clearStorage()
    wx.navigateTo({
      url: '../add_address/add_address',
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
  
  },
  radioChange(e){
    var vm=this
    console.log(e.currentTarget.id)
    vm.data.index = e.target.dataset.index
    wx.request({
      url:'http://j.diankuai.com/Template/setDefaultAddress',
      method:"POST",
      data:{
        address_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN": app.data.token
      },
      success:function(res){
        console.log(res)
        vm.getaddresslist()
        vm.setData({
          choose: !vm.data.choose
        })
      }
    })
  },
  detele(e){
    var vm=this
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url:'http://j.diankuai.com/Template/delAddress',
            method:"POST",
            data: { address_id: e.currentTarget.id},
            header: {
              "Content-Type": "application/x-www-form-urlencoded",
              "TOKEN":app.data.token
            },
            success:function(res){
              console.log(res)
              vm.getaddresslist()
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})