// pages/components/card_list/cardlist.js
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
    show: 0,
    items: []
  },

  /**
   * 组件的方法列表
   */
  attached: function () { 
    this.select() 
  },
  methods: {
    selected(e) {
      console.log(e)
      if (e.currentTarget){
        console.log(this.data)
        e.currentTarget.id = e.currentTarget.id || 0
        this.data.content.show = e.currentTarget.id 
        this.data.content.items = this.data.content.content.goodslist[e.currentTarget.id ].goods
        this.setData({
          show: e.currentTarget.id ,
          items: this.data.content.content.goodslist[e.currentTarget.id].goods
        })
      }
    },
    select(){
      this.data.show = 0
      this.data.content.items = this.data.content.content.goodslist[0].goods
        this.setData({
        show: 0,
        items: this.data.content.content.goodslist[0].goods
      })
    },
  }
})
