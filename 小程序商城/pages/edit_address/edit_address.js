// pages/edit_address/edit_address.js
// var api = require('../../utils/ajax.js')
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // editname:'',
    // editmobile:'',
    // editemile:'',
    // editdetail:'',
    address_id:'',
    mobile:'',
    zip: '',
    address: '',
    province_id: '',
    province:'',
    city:'',
    area:'',
    city_id: '',
    area_id: '',
    country_id:'',
    a:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var vm=this
    wx.getStorage({
      key: 'address_id',
      success: function (res) {
        vm.data.address_id=res.data
    wx.request({
      url:'http://j.diankuai.com/Template/editAddress',
      data:{
        address_id: vm.data.address_id
      },
      method:'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      },
      success:function(res){
        console.log(res.data)
        if (res.data.code == 203) {
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }
        wx.getStorage({
          key: 'city_name',
          success: function (res) {
            vm.data.city = res.data
            vm.setData({
              city: res.data
            })
          }
        })
        wx.getStorage({
          key: 'province_name',
          success: function (res) {
            vm.data.province = res.data
            vm.setData({
              province: res.data
            })
          }
        })
        wx.getStorage({
          key: 'area_name',
          success: function (res) {
            vm.data.province = res.data
            vm.setData({
              area: res.data
            })
          }
        })
        vm.data.province = res.data.data.address.province
        vm.data.city = res.data.data.address.city
        vm.data.area= res.data.data.address.area
        vm.data.province_id = res.data.data.address.province_id
        vm.data.city_id = res.data.data.address.city_id
        vm.data.area_id = res.data.data.address.area_id
        wx.getStorage({
          key: 'city_id',
          success: function (res) {
            vm.data.city_id = res.data
          }
        })
        wx.getStorage({
          key: 'province_id',
          success: function (res) {
            vm.data.province_id = res.data
          }
        })
        wx.getStorage({
          key: 'area_id',
          success: function (res) {
            vm.data.area_id = res.data
          }
        })
        if(res.data.code==200){
          vm.setData({
            name:res.data.data.address.name,
            mobile:res.data.data.address.mobile,
            province: vm.data.province ,
            city: vm.data.city,
            area: vm.data.area,
            zip:res.data.data.address.zip,
            address_detail: res.data.data.address.address
          })
        }
        if(res.data.code==203){
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
      }
    })
   
  },
  editname(e){
    this.data.name=e.detail.value
    console.log(this.data.editname)
  },
  editmobile(e) {
    this.data.mobile=e.detail.value
  },
  editemile(e) {
    this.data.zip=e.detail.value
  },
  editdetail(e) {
    this.data.address_detail=e.detail.value
  },
  submit(){
    var vm=this
    if (!vm.data.name || !vm.data.mobile || !vm.data.address_detail || !vm.data.province_id || !vm.data.city_id || !vm.data.zip || !vm.data.area_id) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(vm.data.mobile)) {
      wx.showToast({
        title: '请输入正确的手机号格式',
        icon: 'none',
        duration: 2000
      })
      return
    }
    var patrn = /^[0-9]{1,20}$/;
    if (!patrn.exec(vm.data.zip)) {
      wx.showToast({
        title: '请输入正确的邮政编号',
        icon: 'none',
        duration: 2000
      })
      return
    } 
    wx.request({
      url:'http://j.diankuai.com/Template/editAddressSave',
      method: 'POST',
      data:{
        name: vm.data.name,
        address: vm.data.address_detail,
        address_id: vm.data.address_id,
        mobile: vm.data.mobile,
        zip: vm.data.zip,
        province_id: vm.data.province_id,
        city_id: vm.data.city_id,
        area_id: vm.data.area_id,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
        "TOKEN":app.data.token
      }, 
      success:function(res){
        if(res.data.code==203){
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        }
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../address/address',
        })
        wx.clearStorage()
      }
    })
  }
})