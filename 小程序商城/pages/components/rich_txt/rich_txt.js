// pages/components/rich_txt/rich_txt.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // content:{
    //   type:Object
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    data_content:'',
    "id": "20171218153456425",
    "type": 1,
    "draggable": true,
    "sort": 1,
    "content": {
      "fulltext": "&lt;p&gt;『富文本编辑器』&lt;/p&gt;",
      "modulePadding": 5,
      "isPreview": true
    },
    "ue": null,
    "dom_conitem": null,
    "dom_ctrl": null
  },

  /**
   * 组件的方法列表
   */
  attached: function (){

      var vm = this;
      vm.data_content = vm.data.content.fulltext.replace(vm.data.content.fulltext ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, "\"")
    
  vm.setData({
    data_content: vm.data_content
    })
  },
  methods: {
    
  }
})
