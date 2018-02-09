var model = require('../../model/model.js')
var api = require('../../utils/ajax.js')
var show = false;
var item = {};
var app=getApp()
Page({
  data: {
    item: {
      show: show,
      city_id:'',
      area_id:'',
      province_id:'',
      sheng:'',
      shi:'',
      qu:'',
    }
  },
  onLoad:function(e){
    var vm = this
    setTimeout(function () {
      //要延时执行的代码  
      wx.getStorage({
        key: 'area_name',
        success: function (res) {
          console.log(2, res.data)
          vm.data.area_id = res.data
          vm.setData({
            area_id: res.data
          })
        }
      })
    }, 1000) //延迟时间 这里是1秒  

    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(1,res)
        vm.setData({
          name:res.data
        })
      }
    })
    wx.getStorage({
      key: 'mobile',
      success: function (res) {
        vm.setData({
          mobile: res.data
        })
      }
    })
    wx.getStorage({
      key: 'emile',
      success: function (res) {
        vm.setData({
          emile: res.data
        })
      }
    })
    wx.getStorage({
      key: 'address_detail',
      success: function (res) {
        vm.setData({
          address_detail: res.data
        })
      }
    })
    wx.getStorage({
      key: 'province_id',
      success: function (res) {
        vm.data.sheng = res.data
      }
    })
    wx.getStorage({
      key: 'city_id',
      success: function (res) {
        vm.data.shi = res.data
      }
    })
    wx.getStorage({
      key: 'area_id',
      success: function (res) {
        vm.data.qu = res.data
      }
    })
    wx.getStorage({
      key: 'city_name',
      success: function (res) {
        vm.data.city_id=res.data
        console.log(res.data)
        vm.setData({
          city_id: res.data
        })
      }
    })

    wx.getStorage({
      key: 'province_name',
      success: function (res) {
        console.log(res)
        vm.data.province_id=res.data
        vm.setData({
          province_id: res.data
        })
      }
    })
  },
  name(e){
    var vm=this
    this.data.name=e.detail.value
    wx.setStorage({
      key: "name",
      data: e.detail.value
    })
  },
  mobile(e) {
    var vm = this
    this.data.mobile=e.detail.value
    wx.setStorage({
      key: "mobile",
      data: e.detail.value
    })
  },
  emile(e) {
    var vm = this
    this.data.emile=e.detail.value
    wx.setStorage({
      key: "emile",
      data: e.detail.value
    })

  },
  address_detail(e) {
    var vm = this
    this.data.address_detail=e.detail.value
    wx.setStorage({
      key: "address_detail",
      data: e.detail.value
    })

  },
  submit(){
    var vm=this
    console.log(vm.data.qu)
    if (!vm.data.name || !vm.data.mobile || !vm.data.address_detail || !vm.data.sheng || !vm.data.shi || !vm.data.emile || !vm.data.qu) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(vm.data.mobile)){
      wx.showToast({
        title: '请输入正确的手机号格式',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.exec(vm.data.emile)){
      wx.showToast({
        title: '请输入正确的邮政编号',
        icon: 'none',
        duration: 2000
      })
      return
    } 
    api.post({
      url:'/Template/addAddress',
      data:{
        name:vm.data.name,
        mobile: vm.data.mobile,
        address: vm.data.address_detail,
        province_id: vm.data.sheng,
        city_id: vm.data.shi,
        area_id: vm.data.qu,
        zip: vm.data.emile
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
        wx.clearStorage()
        wx.navigateTo({
          url: '../address/address',
        })
      }
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {
    var that = this;
    //请求数据
    model.updateAreaData(that, 0, e);
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      county: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () {
  },
  nono: function () { },

})
