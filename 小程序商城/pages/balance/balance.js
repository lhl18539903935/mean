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
    sku:'',
    address_id:'',//收货地址
    area_id:'',//区
    city_id:'',//市
    province_id:'',//省
    item:[],
    numarray:[],
    sku:[],
    pricelist:[],
    skuName:[],
    item_id:"",//商品id
    num:'',//商品数量
    sku_id:'',//商品属性id
    price:'',//商品价格
    payment:'',//商品总价
    sku_name:'',//属性名
    post_fee:'',//快递
    cart_ids: '',//购物车id
    user_balance:'',//账户余额
    is_allow_balance: '', //是否允许余额支付
    code:'',//付款
    item_total_num:'',//商品总数
    item_total_weight:'',//商品重量
    item_total_volume:'',//商品体积
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
        for (var i in res.data.buy_lists) {
          vm.data.item.push(res.data.buy_lists[i].item_id)
          vm.data.numarray.push(res.data.buy_lists[i].num)
          vm.data.sku.push(res.data.buy_lists[i].sku_id)
          vm.data.pricelist.push(res.data.buy_lists[i].price)
          vm.data.skuName.push(res.data.buy_lists[i].props)
        }
        vm.data.item_id = vm.data.item.toString()
        vm.data.num = vm.data.numarray.toString()
        vm.data.sku_id = vm.data.sku.toString()
        vm.data.price = vm.data.pricelist.toString()
        vm.data.sku_name = vm.data.skuName.toString()
        if (res.data.address.length!=0){
          vm.data.address_id = res.data.address[0].address_id
          vm.data.province_id = res.data.province_id
          vm.data.city_id = res.data.city_id
          vm.data.area_id = res.data.area_id
          vm.data.payment=res.data.payment
          vm.data.post_fee = res.data.post_fee
          vm.data.cart_ids = res.data.cart_ids
          vm.data.user_balance = res.data.user_balance
          vm.data.is_allow_balance = res.data.is_allow_balance
          vm.data.code = res.data.code
          vm.data.item_total_num = res.data.item_total_num
          vm.data.item_total_weight = res.data.item_total_weight
          vm.data.item_total_volume = res.data.item_total_volume
        }else{
          wx.showToast({
            title: '请选择收货地址',
            icon: 'success',
            duration: 2000
          })
          return
        }
        if(res.code==200){
          vm.setData({
            buy_lists: res.data.buy_lists,
            post_fee: res.data.post_fee,
            payment: res.data.payment,
            address: res.data.address[0]
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
  //提交订单
  submit(){
    var vm=this
      api.post({
        url:'/Template/add_order',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data:{
          shipping_type: 1,//选择的快递方式
          address_id: vm.data.address_id,//收货地址id
          province_id: vm.data.province_id,//省份id
          city_id: vm.data.city_id,//城市id
          area_id: vm.data.area_id,//区id
          item_id: vm.data.item_id,//商品id
          num: vm.data.num ,//商品数量
          sku_id: vm.data.sku_id,//商品属性id
          sku_name: vm.data.sku_name, //商品属性名
          current_price: vm.data.price,//商品价格
          total_price: vm.data.payment,//商品总价
          payment: vm.data.payment,//共需支付金额
          getPost: vm.data.payment,//实际一共支付金额
          post_price: vm.data.post_fee,//快递费
          cart_ids: vm.data.cart_ids,//购物车id
          balance_price: vm.data.user_balance,//会员账户余额
          money_type: 2, //付款方式
          can_pay: vm.data.is_allow_balance, //是否能够支付
          code: vm.data.code,//付款
          item_total_num: vm.data.item_total_num,//商品总数
          item_total_weight: vm.data.item_total_weight,//商品总重量
          item_total_volume: vm.data.item_total_volume//商品总体积
        },
        success:function(res){
          if(res.code==200){
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 2000
            })
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