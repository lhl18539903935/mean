// pages/member/member.js
//引入本地json数据，这里引入的就是第一步定义的json数据  
// var postData = require('../../data/init.js');
// var api = require('../../utils/ajax.js')
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    type: '1',
    current_num:0,//页数
    page:0,//本地页数
    data:[],
    a:"",
    scrollTop:'',//滚动的高度
    version:'',//版本号
    screenWidth: '',//屏幕宽度
    screenHeight:'',//屏幕高度
    windowHeight:'',//可使用窗口的高度
    waitingtext:true//上啦信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var vm=this
    // this.getindex()//获取线上数据
    //初始化，比对版本号
    this.init()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onPageScroll: function (e) {
    this.data.scrollTop=e.scrollTop
    this.data.a = e.scrollTop
    if (e.scrollTop < 400) {
      this.data.scroll = e.scrollTop / 400
      this.setData({
        a: this.data.scroll
      })
      // console.log(scroll)
    }

  },
  init(){
    let vm=this
    // 存储版本号
    wx.setStorage({
      key: "version",
      data: vm.data.version
    })
    // 存储为本地数据
    wx.setStorage({
      key: "datalist",
      data: vm.data.data
    })
    wx.request({
      url: 'http://www.huileyi.com/Template/getindex',
      data: {
        current_num: vm.data.current_num,
        screenWidth: vm.data.screenWidth,
        screenHeight: vm.data.screenHeight
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        if (vm.data.datalist)
          if (vm.data.version != res.data.version){
            wx.removeStorage({
              key: 'datalist',
              success: function (res) {

              }
            })
            // 存储版本号
            wx.setStorage({
              key: "version",
              data: vm.data.version
            })
          }
        vm.Iflocal()
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  //判断缓存
  Iflocal:function(){
    if (!this.data.datalist){
      this.getindex()
    }else{
      this.gethomeindex()
    }
  },
 
  // 获取线上数据
  getindex:function(){
    console.log('获取线上数据')
    var vm = this
    //获取滚动宽高
    wx.getSystemInfo({
      success: function (res) {
        vm.data.screenWidth = res.screenWidth
        vm.data.screenHeight = res.screenHeight
      },
      fail: function () { },
    })
    wx.request({
      url: 'http://www.huileyi.com/Template/getindex',
      data: {
        current_num: vm.data.current_num,
        screenWidth: vm.data.screenWidth,
        screenHeight: vm.data.screenHeight
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if (vm.data.version != res.data.version){
            wx.removeStorage({
              key: 'datalist',
              success: function (res) {

              }
            })
          vm.data.current_num = res.data.current_num//获取返回页数
          vm.data.data = vm.data.data.concat(res.data.data)//拼接数据
          vm.data.version = res.data.version//版本号
          vm.setData({
            data: vm.data.data,
            current_num: res.data.current_num
          })
          // 存储为本地数据
          wx.setStorage({
            key: "datalist",
            data: vm.data.data
          })
          // 存储版本号
          wx.setStorage({
            key: "version",
            data: vm.data.version
          })
        }else{
          this.scrollheight()
        }   
      }
    })
  },
  // 获取本地数据
  gethomeindex(){
    console.log('获取本地数据')
    var vm =this
    vm.data.page++;
    //获取本地数据
      wx.getStorage({
        key: 'datalist',
        success: function (res) {
          vm.data.data = res.data
          vm.setData({
            data: vm.data.data, //获取数据成功后的数据绑定   
          })
        }  
      })
     
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 判断是否满屏
  scrollheight(){
    var vm=this
    //滚动的高度
    var scrollTop=this.data.scrollTop
    wx.getSystemInfo({
      success:function(res){
        console.log(res.screenHeight)
        vm.data.screenHeight = res.screenHeight//屏幕高度
        vm.data.windowHeight = res.windowHeight//可使用窗口高度
        console.log(vm.data.screenHeight, vm.data.windowHeight)
        if (vm.data.screenHeight - vm.data.windowHeight - vm.data.scrollTop == 0) {
          if (waitingtext) {
            this.getindex()
          }
        }
      }
    })
    console.log(scrollTop)
  },
  onReachBottom: function () {
    let vm = this
    // 请求数据，获取最新的版本号
    wx.request({
      url: 'http://www.huileyi.com/Template/getindex',
      data: {
        current_num: vm.data.current_num,
        screenWidth: vm.data.screenWidth,
        screenHeight: vm.data.screenHeight
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        if(res.data.data.length == 0) {
          vm.setData({
            waitingtext: false
          })
          if (vm.data.version!=res.data.version){
            vm.getindex()
          }else{
            vm.gethomeindex()
          }
          return 
        }
          console.log("线上数据")
          vm.data.current_num = res.data.current_num//获取返回页数
          vm.data.data = vm.data.data.concat(res.data.data)//拼接数据
          vm.data.version = res.data.version//版本号
          vm.setData({
            data: vm.data.data,
            current_num: res.data.current_num
          })

          // 存储为本地数据
          wx.setStorage({
            key: "datalist",
            data: vm.data.data
          })
          // 获取版本号
          wx.getStorage({
            key: 'version',
            success: function (res) {
              vm.data.version = res.data
            }
          })
        
        }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
})
