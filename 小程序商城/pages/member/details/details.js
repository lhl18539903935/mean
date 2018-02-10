// pages/member/details/details.js
var WxParse = require('../../../utils/wxParse/wxParse.js');
let api = require('../../../utils/ajax.js')
var app = getApp();
//  let description = '<div style="border:1px solid red;"><span>123</span><br><span>456</span></div>'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alert:false,
    activenum:0,
    showdetail:true,
    ordernum:1,
    id:'',
    pic:'',
    colornum:-1,
    arr:[],
    skuid:''
  },
  // 天假购物车
  tapAlert:function () {
    this.setData({
      alert:!this.data.alert,
      numbtn:0,
      sku:1
    })
  },
  tapAlert1: function () {
    this.setData({
      alert: !this.data.alert,
      numbtn: 1
    })
  },
  buy(){
    var vm = this
    api.post({
      url: '/Template/buy',
      data: {
        item_id: vm.data.id,
        num: vm.data.ordernum,
        sku: vm.data.skuid,
        type:'onbuy'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if(res.code==200){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          let str = JSON.stringify({ item_id: vm.data.id, num: vm.data.ordernum, sku: vm.data.skuid});
          wx.navigateTo({
            url: '../../buy_balan/buy_balan?item_id='+str,
          })
        }else if(res.code==223){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }else{
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  addcart(){
    var vm = this
    api.post({
      url: '/Template/addCart',
      data: {
        id: vm.data.id,
        num: vm.data.ordernum,
        value: vm.data.skuid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.code==200){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          vm.setData({
            alert:false
          })
        }else if(res.code==223){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          })
          vm.setData({
            alert: false
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm=this
    vm.data.id = options.item_id
    api.post({
      url:'/Template/goodsDetail',
      data:{
        item_id: options.item_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        for (var i in res.data.show_props) {
          vm.data.arr.push(res.data.show_props[i]); //属性
        }
        console.log(vm.data.arr)
        var description = res.description
        WxParse.wxParse('description', 'html',description, vm, 5);
        vm.data.pic=res.data.img_path[0]
        if(res.code==200){
          vm.setData({
           img_list:res.data.img_path,
           title:res.data.title,
           original_price: res.data.original_price,
           price: res.data.price,
           post_fee: res.data.post_fee,
           num: res.data.num,
           salenum: res.data.salenum,
           arr:vm.data.arr,
           show_props: res.data.show_props,
           link: res.data.link
          //  description: res.description
          })
        }
         if(res.code==223){
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
  chosevalue(e){
    
    var vm=this
    vm.data.skuid = e.currentTarget.id
    this.data.colornum=e.target.dataset.index
    vm.setData({
      colornum: e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  add(){
    var vm=this
    vm.data.ordernum++
    vm.setData({
      ordernum: vm.data.ordernum
    })
  },
  delete() {
    var vm = this
    if (vm.data.ordernum >1){
      vm.data.ordernum--
      vm.setData({
        ordernum: vm.data.ordernum
      })
    } 
    if (vm.data.ordernum <=1){
      return false
    }
  },
  switch(){
    this.setData({
      activenum:0,
      showdetail:true
    })
  },
  switch1(options) {
    var vm=this
    api.post({
      url:'/Template/getItemComment',
      data:{
        item_id:this.data.id,
        p:1
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        console.log(res)
        if(res.code==200){
          vm.setData({
            list:res.data
          })
        }
        if(res.code==223){
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
    this.setData({
      activenum: 1,
      showdetail:false
    })
  },
  jumpcart(){
    wx.switchTab({
      url:'../../cart/cart'
    })
  },
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
})