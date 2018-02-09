// pages/components/nav/nav.js
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
    "content": {
      "modulePadding": 0,
      "dataset": [
        {
          "link": "\/Shop\/index",
          "linkType": 6,
          "showtitle": "对符合国家规定好久",
          "pic": "../../../images/a1.jpg"
        },
        {
          "link": "\/Shop\/index",
          "linkType": 6,
          "showtitle": "法规回复后",
          "pic": "../../../images/a1.jpg"
        },
        {
          "link": "\/Shop\/index",
          "linkType": 6,
          "showtitle": "的法规和梵蒂冈",
          "pic": "../../../images/a1.jpg"
        },
        {
          "link": "\/Shop\/index",
          "linkType": 6,
          "showtitle": "发的规划法规",
          "pic": "../../../images/a1.jpg"
        },
        {
          "link": "\/Shop\/index",
          "linkType": 6,
          "showtitle": "是的法国恢复供货",
          "pic": "../../../images/a1.jpg"
        }
      ]
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
