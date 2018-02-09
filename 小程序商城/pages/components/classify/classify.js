// pages/components/classify/classify.js
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
    h:false,
    "id": "20171219111628569",
    "type": 17,
    "draggable": true,
    "sort": 1,
    "content": {
      "layout": "0",
      "category": "0",
      "modulePadding": 9,
      "dataset": [
        {
          "linkType": 0,
          "link": "#",
          "showtitle": "内容1",
          "bgColor": "#28c192",
          "cloPicker": "2",
          "fotColor": "#fff"
        },
        {
          "linkType": 0,
          "link": "#",
          "showtitle": "内容1",
          "bgColor": "#28c192",
          "cloPicker": "2",
          "fotColor": "#fff"
        }, {
          "linkType": 0,
          "link": "#",
          "showtitle": "内容1",
          "bgColor": "#28c192",
          "cloPicker": "2",
          "fotColor": "#fff"
        }, {
          "linkType": 0,
          "link": "#",
          "showtitle": "内容1",
          "bgColor": "#28c192",
          "cloPicker": "2",
          "fotColor": "#fff"
        },
        {
          "linkType": 0,
          "link": "#",
          "showtitle": "内容1",
          "bgColor": "#28c192",
          "cloPicker": "2",
          "fotColor": "#fff"
        }
      ]
    },
    "dom_conitem": null,
    "dom_ctrl": null,
    "ue": null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handle:function(){
      this.setData({
        h:!this.data.h
      })
    }
  }
})
