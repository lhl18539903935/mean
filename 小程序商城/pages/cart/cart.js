var api = require('../../utils/ajax.js')
var app=getApp()
Page({
  data: {
    carts: [],               // 购物车列表
    hasList: false,          // 列表是否有数据
    totalPrice: 0,           // 总价，初始为0
    selectAllStatus: false  ,  // 全选状态，默认全选
    cartlist:[],
    check_box: [] ,  //购物车中选中的cart_id
    ordernum:[],
    pay_selected:true,
    sku_id:[],
    sku:'',
    order:'',
    check:"",
    selected:true,
    hasList:true,
    cart_id:'',//购物车id
    cart_num:0,//购物车数量
    cart:[],
    carts: [
      { id: '', title: '', image: '', num: 1, price: '', selected: true },
    ]
  },
  //购物车列表
  getcart(){
    var vm=this
    api.post({
      url: '/Template/cart',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        vm.data.cart_num=res.data.cart_num
        wx.setNavigationBarTitle({
          title: '购物车' + '(' + vm.data.cart_num + ')'
        }) 
        console.log(vm.data.cart_num)
        if (res.data.lists.length == 0) {
          vm.setData({
            hasList: false,
          })
        }
        for (var i in res.data.lists) {
          res.data.lists[i].cart_id
          var a = res.data.lists[i].num
        }
        vm.data.cart_num = res.data.cart_num
        if (res.code == 200) {
          vm.data.cartlist = res.data.lists
          vm.setData({
            cart_num: res.data.cart_num,
            cart_price: res.data.cart_price,
            carts: res.data.lists
          })
          vm.getTotalPrice();
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
  onShow() {
    var vm = this 
    vm.getcart() 

    vm.setData({
      selectAllStatus:false,
      pay_selected:true
    })
   
    this.setData({
      hasList: true,
      // carts: [
      //   { id: 1, title: '', image: '', num: 4, price: 0.01, selected: true },
      //   { id: 2, title: '', image: '', num: 1, price: 0.03, selected: true }
      // ]
    });
    this.getTotalPrice();
  },
  // 结算跳转
  jump(){
    var vm=this
    var str = JSON.stringify({ checkbox: vm.data.check, order: vm.data.order, sku: vm.data.sku})
    wx.navigateTo({
      url: '../balance/balance?object='+str,
    })
  },
  /**
   * 当前商品选中事件
   */
  select(e){
    var vm=this
    console.log(vm.data.check_box.length)
    for (var i in vm.data.carts) {
   
      if (vm.data.carts[i].selected!='underfind'){
        vm.setData({
          pay_selected:false
        })
      } 
      
    }
  },
// 勾选
  selectList(e) {

    var vm = this
    api.post({
      url: '/Template/cart',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){  
        if (res.code == 203) {
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res.data)
            }
          })
          app.login()
        } 
        if (carts[index].selected ==true){//被勾选

          vm.data.check_box.push(res.data.lists[e.currentTarget.dataset.index].cart_id)
          vm.data.check = vm.data.check_box.toString()


          // vm.data.cart.push(res.data.lists[e.currentTarget.dataset.index].cart_id)
          // vm.data.check = vm.data.check_box.toString()

          var str= vm.data.carts[index].num
          vm.data.ordernum.push(str)
          vm.data.order = vm.data.ordernum.toString()


          var sku_id = vm.data.carts[index].sku_id
          vm.data.sku_id.push(sku_id)
          vm.data.sku=vm.data.sku_id.toString()

        } else if (carts[index].selected == false){//没有被勾选
          var a = res.data.lists[e.currentTarget.dataset.index].cart_id//当前cart_id
          var b = vm.data.check_box.indexOf(a);

          var num = vm.data.carts[index].num//当前数量
          var index_num = vm.data.ordernum.indexOf(num)//当前数量位置

          var sku_id = vm.data.carts[index].sku_id//当前数量
          var index_sku_id = vm.data.sku_id.indexOf(sku_id)//当前sku_id位置

          if(b>-1){
            vm.data.check_box.splice(b, 1);
          } 
          if (index_num>-1){
            vm.data.ordernum.splice(index_num, 1);
          }

          if (index_sku_id > -1) {
            vm.data.sku_id.splice(index_sku_id, 1);
          }
           console.log(vm.data.check_box)
             vm.data.check=''
           if (vm.data.check_box.length==0) {
             vm.setData({
               pay_selected: true,
               selectAllStatus:false,
              //  hasList:false
             })
           }

        }
      }    
    })
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts,
      selected:carts[index].selected
    });
    this.getTotalPrice();
    this.select(e)
  },

  /**
   * 删除购物车当前商品
   */
  deletecart(){
    var vm=this
    api.post({
      url: '/Template/del',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        cart_id: vm.data.check
      },
      success: function (res) {
        if(res.code==203){
          app.login()
        }
        wx.showToast({
          title: "删除成功!",
          icon: 'success',
          duration: 2000
        })
        vm.data.check=''
      }
    })
  },
  clear(){
    var vm=this
    if (vm.data.check) {
      console.log()
      wx.showModal({
        title: '提示',
        content: '确认删除？',
        success: function (res) {
          if (res.confirm) {
            vm.deletecart()
            vm.getcart()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showToast({
        title: "请勾选商品!",
        icon: 'none',
        duration: 2000
      })
      
    }
    
  },
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    carts.splice(index, 1);
    this.setData({
      carts: carts
    });
    if (!carts.length) {
      this.setData({
        hasList: false
      });
    } else {
      this.getTotalPrice();
    }
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    var vm=this
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    api.post({
      url: '/Template/cart',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success:function(res){
        if (selectAllStatus==true){
          vm.setData({
            pay_selected:false
          })
          for (var i in vm.data.carts) {
            var str=vm.data.carts[i].num
            vm.data.ordernum.push(str)
          }
          vm.data.order=vm.data.ordernum.toString()
          console.log(vm.data.order)
          if(res.code==200){
            for(var i in res.data.lists){
              vm.data.check_box.push(res.data.lists[i].cart_id)
              vm.data.check = vm.data.check_box.toString()
            
              var str = res.data.lists[i].sku_id
              vm.data.sku_id.push(str)
            } 
            vm.data.sku = vm.data.sku_id.toString()
            console.log(vm.data.sku)
          }
        } else if (selectAllStatus == false){
          vm.setData({
            pay_selected: true
          })
          vm.data.ordernum=[]
          vm.data.check_box=[];
          vm.data.sku_id=[]
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
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    this.data.carts = this.data.carts;
    let num = this.data.carts[index].num;
    num++;
    this.data.carts[index].num = num;
    this.setData({
      carts: this.data.carts,
    });
    this.getTotalPrice();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts,
      cart_num:num
    });
    this.getTotalPrice();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    var vm=this
    let carts = vm.data.carts;               // 获取购物车列表
    let total = 0;
    for (let i = 0; i < vm.data.carts.length; i++) {         // 循环列表得到每个数据                  // 判断选中才会计算价格
        total += vm.data.carts[i].num * vm.data.carts[i].price;  // 所有价格加起来    
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: vm.data.carts,
      cart_price: total.toFixed(2)
    });
  }

})