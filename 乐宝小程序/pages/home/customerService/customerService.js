// pages/home/customerService/customerService.js
let sliderWidth = 20
let touchDot = 0;//触摸时的原点
let one = true ;//每次执行一次左右滑动
let time = 0;// 时间记录，用于滑动时且时间小于1s则执行左右滑动
let interval = "";// 记录/清理时间记录
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['用户','商家','乐分','操作'],
    tabHeight:0,
    activeIndex:0,
    sliderOffset:0,
    sliderLeft:0,
    scrollId:'a0',
    windowWidth:'',
    jishi:true,
    arr:[
      {
      tab:'用户',
      title:['0商户App登录权限问题','商户网页版后台','打款时间','打款状态时间','手动体现','交易失败说明','重新支付']
      },
      {
        tab:'商家',
        title:['1商户App登录权限问题','商户网页版后台','交易失败说明','重新支付']
      },
      {
        tab:'乐分',
        title:['2打款状态时间','手动体现','交易失败说明','重新支付']
      },
      {
        tab:'操作',
        title:['3商户App登录权限问题','商户网页版后台','打款时间','打款状态时间','手动体现','交易失败说明','重新支付','商户网页版后台','打款时间','打款状态时间','手动体现','交易失败说明','商户网页版后台','打款时间','打款状态时间','手动体现','交易失败说明']
      },
    ]
  },


  tapClick:function (e) {
    let id = e.currentTarget.id
    let title = this.data.arr[id].title
    this.setData({
      sliderOffset:e.target.offsetLeft,
      activeIndex: id,
      scrollId: 'a'+id,
      tabHeight: 105 + 96*title.length
    })
  },
  call:function () {
    wx.makePhoneCall({
      phoneNumber:'10086'
    })
  },
  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间
    interval = setInterval(function () {
      time++;
    }, 100);
  },
  // 触摸移动事件
  touchMove: function (e) {
    if(one){
      let touchMove = e.touches[0].pageX;
      let arr = this.data.arr;
      let n = this.data.activeIndex;
      // 向左滑动
      if (touchMove - touchDot <= -150 && time < 20) {
        console.log('向左滑动',n);
        if((arr.length-1) > n){
          n++
          this.setData({
            activeIndex: n,
            scrollId: 'a'+n,
            sliderOffset: this.data.windowWidth / arr.length * n,
            tabHeight: 105 + 96*arr[n].title.length
          })
          one = false
          return false
        }
      }
      // 向右滑动
      if (touchMove - touchDot >= 150 && time < 20) {
        console.log('向右滑动',n);
        console.log(touchMove,touchDot)
        if(n > 0){
          n--
          this.setData({
            activeIndex: n,
            scrollId: 'a'+n,
            sliderOffset: this.data.windowWidth / arr.length * n,
            tabHeight: 105 + 96*arr[n].title.length
          })
        }
        one = false
        return false
      }
    }

  },
  // 触摸结束事件
  touchEnd: function (e) {
    clearInterval(interval); // 清除setInterval
    time = 0;
    one = true;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth:res.windowWidth,
          sliderLeft: (res.windowWidth / that.data.arr.length - sliderWidth) / 2,
          tabHeight: that.data.arr[0].title.length*96 + 105
        });
      }
    });
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