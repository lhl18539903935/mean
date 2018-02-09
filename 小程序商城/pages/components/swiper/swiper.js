// pages/components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content:{
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    img_height:0,
    img_index:'',
    list:[],
    maxHeight:''
  },

  /**
   * 组件的方法列表
   */ 
  onPageScroll: function(e) {
    var scrollTop = e.detail.scrollTop
    // this.data.a = e.scrollTop
    if (e.scrollTop < 400) {
      var scroll = e.detail.scrollTop / 400
      this.setData({
        a: scroll
      })
      console.log(scroll)
    }

  },
  ready:function(){
    // scroll(e)
  },
  methods: {
    imageLoad: function (e) {
      this.data.list.push(e.detail.height)
      this.data.maxHeight = this.data.list.sort(function (a, b) {
        return b - a;
      })[0];//图片的最大高度
      var $width = e.detail.width,    //获取图片真实宽度
        $height = e.detail.height,
        ratio = $width / $height;    //图片的真实宽高比例
      var viewWidth = 758,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight = 718 / ratio;    //计算的高度值
      var image = this.data.images;
      //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
      image[e.target.dataset.index] = {
        width: viewWidth,
        height: viewHeight
      }
      this.setData({
        images: image,
        maxHeight: this.data.maxHeight
      })
    },
    changeIndicatorDots: function (e) {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },
    changeAutoplay: function (e) {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },
    intervalChange: function (e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange: function (e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
