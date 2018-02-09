// pages/components/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    "id": "20171218165515868",
    "type": 4,
    "draggable": true,
    "sort": 1,
    "content": {
      "layout": "1",
      "showPrice": true,
      "showIco": true,
      "showName": "1",
      "goodslist": [
        {
          "item_id": "791",
          "title": "为肌肤非常的宽松女从而v",
          "price": "20.00",
          "original_price": "25.00",
          "create_time": "2017-12-06 17:17:19",
          "link": "http://n.diankuaike.com/Item/detail/id/791/sid/123.html",
          "pic": "../../../images/a3.jpg",
          "is_compress": 0
        }
      ],
      "sale_num": 5,
      "goodstyle": "3",
      "layoutstyles":1,
      "goodstxt": "立即购买",
      "titleLine": 1,
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
