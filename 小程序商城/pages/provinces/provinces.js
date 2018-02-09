// var api = require('../../utils/ajax.js')
var app=getApp()
Page({
  data: {
    num:0,
    province_id:'',
    city_id: '', 
    provice:'',
    cityname:'',
    areaname:'',
    list:[]
  },
  onLoad:function(e){
    console.log(e)
    var vm=this
    wx.request({
      url:"http://j.diankuai.com/Template/getProvince",
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN": app.data.token
      },
      data:{},
      success:function(res){
        if(res.data.code==200){
          vm.setData({
            provinces:res.data.data
          })
        }
        if (res.code == 203) {
          app.login()
        }
      }
    })
  },
  choose_city(e){

    var vm=this
    vm.data.province_id = e.currentTarget.id
    vm.data.num=1
    wx.request({
      url: "http://j.diankuai.com/Template/getProvince",
      data: {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN": app.data.token
      },
      method:"POST",
      success: function (res) {
        console.log(3,res)
        if (res.code == 203) {
          app.login()
        }
        wx.setStorage({
          key: "province_name",
          data: res.data.data[e.currentTarget.dataset.index].province_name
        })
        wx.setStorage({
          key: "province_id",
          data: res.data.data[e.currentTarget.dataset.index].province_id
        })
        if (res.data.code == 200) {
          vm.data.provice=res.data.data[e.currentTarget.dataset.index].province_name
          vm.setData({
            province: res.data.data[e.currentTarget.dataset.index].province_name
          })
        }
      }
    })
    vm.setData({
      num:vm.data.num
    })
    wx.request({
      url:'http://j.diankuai.com/Template/getCity',
      method:"POST",
      data:{
        province_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      },
      success:function(res){
        if(res.data.code==200){
          vm.setData({
            city:res.data.data
          })
        }
        if (res.code == 203) {
          app.login()
        }
      }
    })
   
  },
  choose_area(e){
    var vm = this
    vm.data.city_id = e.currentTarget.id
    vm.data.num = 2
    wx.request({
      url: 'http://j.diankuai.com/Template/getCity',
      method:"POST",
      data: {
        province_id: vm.data.province_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          wx.setStorage({
            key: "city_name",
            data: res.data.data[e.currentTarget.dataset.index].city_name
          })
          wx.setStorage({
            key: "city_id",
            data: res.data.data[e.currentTarget.dataset.index].city_id
          })
          vm.data.cityname=res.data.data[e.currentTarget.dataset.index].city_name
          vm.setData({
            cityname: res.data.data[e.currentTarget.dataset.index].city_name
          })
        }
        if (res.code == 203) {
          app.login()
        }
      }
    })
    vm.setData({
      num: vm.data.num
    })
    wx.request({
      url: 'http://j.diankuai.com/Template/getArea',
      method:"POST",
      data: {
        city_id: e.currentTarget.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      },
      success: function (res) {
        if (res.data.code == 200) {
          vm.setData({
            area: res.data.data
          })
        }
        if (res.code == 203) {
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
  choose(e){
    var vm=this
    console.log(e)
    wx.request({
      url: 'http://j.diankuai.com/Template/getArea',
      method:"POST",
      data: {
        city_id: vm.data.city_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      },
      success: function (res) {
        console.log(7, res.data.data[e.currentTarget.dataset.index].area_name)
        if (res.data.code == 200) {
          wx.setStorage({
            key: "area_name",
            data: res.data.data[e.currentTarget.dataset.index].area_name
          })
          wx.setStorage({
            key: "area_id",
            data: res.data.data[e.currentTarget.dataset.index].area_id
          })
          vm.data.areaname = res.data.data[e.currentTarget.dataset.index].area_name
          vm.setData({
            areaname: res.data.data[e.currentTarget.dataset.index].area_name
          })
        }
        if (res.code == 203) {
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
    // vm.data.list = vm.data.list.concat(vm.data.province+ vm.data.cityname+ vm.data.areaname )
   
    wx.navigateTo({
      url: "../add_address/add_address" 
    })
    vm.setData({
      area: e.currentTarget.id
    })
  },
  //生命周期函数--监听页面初次渲染完成
  onReady: function (e) {

  },
  onReachBottom: function () {
  },
  nono: function () { }
})
