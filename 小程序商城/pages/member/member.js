// pages/member/member.js
let api = require('../../utils/ajax.js')
// let aaa = '<div style="border:1px solid red;"><span>123</span><br><span>456</span></div>'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    m:true, //默认
    a1:true, //价格
    a2:false,
    b1:true, //销量
    b2:false,
    c1:true, //人气
    c2:false,
    d1:true, //列表显示
    page:1,
    cartNum:0,//购物车数量
    order:'',
    memberlist:[]
  },

  www: function (e) {
    var vm=this
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: './details/details?item_id=' + e.currentTarget.id
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title:'商品',
      success:function (e) {
        console.log(1,e)
      },
      fail:function (e) {
        console.log(2,e)
      }
    })
  },
  m:function () {
    this.getlists()
    this.setData({
      m:true,
      a1:true,
      a2:false,
      b1:true,
      b2:false,
      c1:true,
      c2:false,
      d1:true,
    })
  },
  a:function () {
    if(this.data.a1==true){
      this.data.order="priceDown"
      this.sort()
    }
    if (this.data.a1 == false) {
      this.data.order = "priceUp"
      this.sort()
    }
    this.setData({
      m: false,
      a1: !this.data.a1,
      a2: true,
      b2: false,
      c2: false
    })
  },
  b:function () {
    if (this.data.b1 == true) {
      this.data.order = "salesDown"
      this.sort()
    }
    if (this.data.b1 == false) {
     this.data.order="salesUp"
     this.sort()
    }
    this.setData({
      m:false,
      a2:false,
      b1:!this.data.b1,
      b2:true,
      c2:false,
    })
  },
  c:function () {
    if (this.data.c1 == true) {
      this.data.order = "nowDown"
      this.sort()
    }
    if (this.data.c1 == false) {
      this.data.order = "nowUp"
      this.sort()
    }
    this.setData({
      m: false,
      a2: false,
      b1: !this.data.b1,
      b2: true,
      c2: false,
    })
    this.setData({
      m:false,
      a2:false,
      b2:false,
      c1:!this.data.c1,
      c2:true,
    })
  },
  d:function () {
    this.setData({
      d1:!this.data.d1,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 排序
  sort(){
    this.data.page = 1
      wx.showLoading({
        title: '加载中...',
      })
      var vm = this
      api.post({
        url: '/Template/lists',
        data: {
          p: vm.data.page,
          order: vm.data.order
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
          console.log(res)
          if (res.code == 200) {
            vm.setData({
              memberlist: res.data
            })
          } else if(res.code==203){
            wx.removeStorage({
              key: 'token',
              success: function (res) {
                console.log(res.data)
              }
            })
            app.login()  
          }else{
            wx.showToast({
              title: '暂无数据',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
  },
  //商品列表
  getlists(){
    wx.showLoading({
      title: '加载中...',
    })
    var vm = this
    var page = JSON.stringify(vm.data.page)
    api.post({
      url: '/Template/lists',
      data: {
        p:page,
        order:''
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        console.log(res)
        if (res.code == 200) {
          vm.setData({
            memberlist: res.data
          })
        } else if(res.code==203){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()  
        }else{
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  search(e){
    var vm=this
    console.log(e.detail.value)
    wx.showLoading({
      title: '加载中...',
    })
   api.post({
     url:'/Template/lists',
     data:{
       title:e.detail.value
     }, 
     header: {
       "Content-Type": "application/x-www-form-urlencoded"
     },
     success:function(res){
       setTimeout(function () {
         wx.hideLoading()
       }, 1000)
       if (res.code == 200) {
         vm.setData({
           memberlist: res.data
         })
       } else if(res.code==203){
         wx.removeStorage({
           key: 'token',
           success: function (res) {
             console.log(res.data)
           }
         })
         app.login()
       }else{
         wx.showToast({
           title: '暂无数据',
           icon: 'none',
           duration: 2000
         })
       }
     }
   })
  },
  onLoad: function (options) {
    var vm=this
    this.getlists()
    api.post({
      url: '/Template/cartNum',
      success: function (res) {
        if(res.code==200){
          vm.data.cartNum = res.data
          vm.setData({
            cartNum: res.data
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
  onReach(){
    wx.showLoading({
      title: '加载中...',
    })
    var vm = this
    this.data.page++
    var page = JSON.stringify(vm.data.page)
    var order = JSON.stringify(vm.data.order)
    api.post({
      url: '/Template/lists',
      data: {
        p: page,
        order: vm.data.order
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        setTimeout(function () {
          wx.hideLoading()
        }, 1000)
        console.log(res)
        if (res.code == 200) {
          vm.setData({
            memberlist: vm.data.memberlist.concat(res.data)
          })
        } else if(res.code==203){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }else{
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // console.log(app.state)
    this.onReach()
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})