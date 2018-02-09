// pages/components/hotsale/hotsale.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type:Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: {
      "layout": 1,
      "showPrice": true,
      "showIco": true,
      "showName": "1",
      "mainTitleStyle": "3",
      "title": "新品",
      "goodslist": [
        {
          "item_id": "771",
          "title": "测试商品",
          "price": "0.01",
          "original_price": "1.00",
          "create_time": "2017-11-25 10:02:28",
          "link": "http://n.diankuaike.com/Item/detail/id/771/sid/123.html",
          "pic": "../../../images/a1.jpg",
          "is_compress": 0
        },
        {
          "item_id": "771",
          "title": "测试商品",
          "price": "0.01",
          "original_price": "1.00",
          "create_time": "2017-11-25 10:02:28",
          "link": "http://n.diankuaike.com/Item/detail/id/771/sid/123.html",
          "pic": "../../../images/a1.jpg",
          "is_compress": 0
        },
        {
          "item_id": "771",
          "title": "测试商品",
          "price": "0.01",
          "original_price": "1.00",
          "create_time": "2017-11-25 10:02:28",
          "link": "http://n.diankuaike.com/Item/detail/id/771/sid/123.html",
          "pic": "../../../images/a1.jpg",
          "is_compress": 0
        }
      ],
      "titleLine": 0,
      "version": 1,
      "modulePadding": 5,
      "priceBold": "1"
    },
    "dom_conitem": null,
    "dom_ctrl": null,
    "ue": null
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
