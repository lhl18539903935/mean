// pages/cart/cart.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    checked:false,
    checkedindex:'',
    pay_state:true,
    checkedindex:false,//被点击的下标
    cart_list:[
      { key: '0', toast: '失效', img: '../../images/a2.jpg', title: '分公司东方故事电饭锅撒房东告诉对方感受到方刚发的', pay: '13500.00', num: '12', selected:'circle'},
      { key: '1', toast: '失效', img: '../../images/a2.jpg', title: '分公司东方故事电饭锅撒房东告诉对方感受到方刚发的', pay: '13500.00', num: '12', selected: 'circle'},
      { key: '2', toast: '失效', img: '../../images/a2.jpg', title: '分公司东方故事电饭锅撒房东告诉对方感受到方刚发的', pay: '13500.00', num: '12', selected: 'circle'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '购物车'
    })
    wx.showLoading({ 
      title:'加载中...',
      mask:'true',
      })
    setTimeout(function () {
      wx.hideLoading()
    }, 200)
  },

  change(e){
    console.log(e)
    var index = e.currentTarget.dataset.index
    //得到选中状态
    var select = e.currentTarget.dataset.select
    if (select == "circle") {
      var stype = "success"
    } else {
      var stype = "circle"
    }
    //把新的值给新的数组
    var newList = that.data.list
    newList[index].select = stype
    //把新的数组传给前台
    that.setData({
      list: newList
    })
    // this.setData({
    //   checked1: !this.data.checked1,
    //   checked: !this.data.checked,
    //   pay_state: !this.data.pay_state
    // })
  },
  //全选
  allSelect: function (e) {
    var that = this
    //先判断现在选中没
    var allSelect = e.currentTarget.dataset.select
    var newList = that.data.list
    if (allSelect == "circle") {
      //先把数组遍历一遍，然后改掉select值
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "success"
      }
      var select = "success"
    } else {
      //取消全选
      for (var i = 0; i < newList.length; i++) {
        newList[i].select = "circle"
      }
      var select = "circle"
    }
    that.setData({
      list: newList,
      allSelect: select
    })
  },
  radioChange(e){
      this.setData({
        checked:!this.data.checked,
        checked1: !this.data.checked1,
        pay_state: !this.data.pay_state
      })
  }
})