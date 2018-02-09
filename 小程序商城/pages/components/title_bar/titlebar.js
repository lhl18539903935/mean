// pages/components/title_bar/titlebar.js
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
   
  },

  /**
   * 组件的方法列表
   */
  attached:function(){
    let vm=this
    console.log(vm.data.content)
  },
  methods: {

  }
})
