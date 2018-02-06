<template>
  <div @click="is_show=false" class='ag'>
    <div @click.stop='is_show=!is_show' class='topbar'>
      <span style="font-size: 14px">{{title}}</span><span v-show='!is_show' class="strecth" >   ▼   </span>
      <span v-show='is_show' class="strecth" >▲</span>
      <div v-if='is_show' class='downPanel box-shadow'>
        <div   @click='onChange(4)'  class='downbar'>审核状态</div>
        <div     @click='onChange(0)'  class='downbar'>待审核</div>
        <div    @click='onChange(1)' class='downbar'>审核通过</div>
        <div     @click='onChange(2)'  class='downbar'>审核拒绝</div>
      </div>
    </div>
    <div style="height: 3.6em; width: 100%;"></div>
    <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center;position:absolute;top:0,left:0;right:0;bottom:0;overflow:scroll;width:100%;"> 
    <div   v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:6rem;margin-bottom: 4rem;">
    <!-- <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;'> -->
      <div class='card' v-for='(i,index) in datalist' :key="index">
        <div class="cardchild">
          <img  style="display:block;margin:0 auto;"  src="../assets/daililogo.png">
        </div>
        <form-preview :rgactive='i.rgactive' class="preview" :header-label="i.name" :header-value="i.status" :body-items="i.list" :footer-buttons="i.buttons1"></form-preview>
        <div style="clear:both"></div>
      </div>
    <!-- </scroll> -->
  </div>
</van-pull-refresh>
    <div v-if='more' style='text-align:center;color:#2e2e2e;font-size:14px;'>没有更多了...</div>
  </div>
</template>
<script type="es6">
  import {Selector} from 'vux'
  import { Waterfall } from 'vant';
  import FormPreview from '../components/form-preview/index'
  import VanPullRefresh from '../vant/packages/pull-refresh/index.vue'
  export default {
    data:function(){
      return{
        title:'审核状态',
        pageHeader:true,
        pageName:'服务管理',
        src:require('../assets/fangda.png'),
        src1:require('../assets/jiahao.png'),
        plainList:[{key:4,value:'审核状态'},{key:1,value:'审核通过'},{key:0,value:'待审核'},{key:2,value:'审核拒绝'}],
        datalist:[],
        type:4,
        is_show:false,
        bg:{white:false,grey:true},
        currentPage:1,
        more:false,
        isDone:false,
        disabled:false,
        isLoading:false
      }
    },
    watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=true;
            this.datalist=[];
            this.currentPage=1;
            this.agentList()
          }
        }
      },

    directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
    mounted:function() {
      let vm=this;
      this.agentList();
    },
    methods:{
      loadMore(){
        this.currentPage++
        this.agentList()
      },

  onChange:function(val) {
    if(val == 0){
      this.title='待审核'
      this.type=val
      this.disabled=false
      this.currentPage=1;
      this.datalist=[];
      this.agentList();
    }
    if(val == 1){
      this.title='审核通过'
      this.type=val
      this.datalist=[];
      this.disabled=false
      this.currentPage=1;
      
      this.agentList();
    }
    if(val == 2){
      this.title='审核拒绝'
      this.type=val
      this.disabled=false
      this.currentPage=1;
      this.datalist=[];
      this.agentList();
    }
    if(val == 4){
      this.title='审核状态'
      this.type=val
      this.disabled=false
      this.currentPage=1;
      this.datalist=[];
      this.agentList();
    }
  },
  agentList(){
    let vm = this;
    let page = vm.currentPage
     console.log(page++)
    if(this.type == 4){
      var type=''
    }else{
      type=this.type
    }
    this.apiPost(this.phost+'/Dls/lowerDlsList', {type:type,page:vm.currentPage}).then((res) => {
      this.isLoading=false
      if(res.code==200){
      if(res.currentPage == res.totalPage || res.totalPage == 0){
        this.disabled=true
      }else{
        if(vm.currentPage == 1){
           this.disabled=false
        }
      }
      for(let i in res.data){
        if(res.data[i].status==0){res.data[i].status='待审核';res.data[i].rgactive=true}
        if(res.data[i].status==1){res.data[i].status='审核通过'}
        if(res.data[i].status==2){res.data[i].status='审核拒绝'}
        if(res.data[i].area==null) res.data[i].area=""
        if(res.data[i].province==null) res.data[i].province=""
        if(res.data[i].city==null) res.data[i].city=""
        vm.datalist.push({
          name:res.data[i].name + res.data[i].mobile,
          status:res.data[i].status,
          rgactive:res.data[i].rgactive,
          list:[
            {label:'身份证号: ',value:res.data[i].idcard},
            {label:'所属区域: ',value:res.data[i].province+res.data[i].city+res.data[i].area},
            {label:'激活码数: ',value:res.data[i].qr_count}
          ],
          buttons1:[{
            is_show:true,
            style:'primary',
            text:'查看',
            link:'/viewdetails?id='+res.data[i].user_id
          }]
        })

      }
    }else{
      // vm.$el.querySelector('.load-more').style.display = 'none';
    }
    if(res.code==400){
      this.$router.go(0)
    }
  })
  }
  },
    beforecreated(){

  },
  mixins:[window.mixins,window.http],
    components:{
    FormPreview,
      Selector,
      Waterfall,VanPullRefresh
  },
  }
</script>
<style>
  .ag .weui-form-preview__bd, .ag .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .ag .weui-form-preview__btn_primary {
    color: #909090 !important;
    border: 1px solid #eee;
    border-radius: 7px !important;
    font-size: 14px;
  }
  .ag .weui-form-preview__hd .weui-form-preview__value {
    font-size: 1em !important;
    color: #6594fe;
  }
  .ag .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .ag .weui-form-preview:after{
    border-bottom: none !important;
  }
  .ag .weui-form-preview:before{
    border-top: none !important;
  }
  .ag .weui-form-preview__ft{
    line-height: 28px !important;
    width: 22% !important;
    height:10%;
  /*//position: absolute !important;*/
    right: 3% !important;
    bottom: 8px !important;
  }
  .ag .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .ag .vux-form-preview{
    height: 30% !important;
  }
  .ag .router-view{
    /*height: 35% !important;*/
  }
  .ag .weui-tab__panel {
    background-color: #eee;
  }
  .ag .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .ag .im img {
    width: 100%;
    height: 100%;
  }
  .ag .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
  }
  .ag .weui-select{
    padding-left: 41% !important;
  }
  .ag .card{
    position: relative;
  }
  .ag .addColor{
    color:#6594FE;
    padding-top:5px;
  }
  .ag .preview{
    padding-top:5px;
  }
  .ag .cardchild {
    position: absolute;
    top: 0.9em;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 0.1;
  }
  .ag .cardchild img {
    width: 100%;
  }
  .ag .weui-form-preview__hd {
    text-indent: 5% !important;
    overflow: hidden !important;
    padding: 10px 15px !important;
    line-height: 1em !important;
    font-size: 14px;
  }
  .ag .card{
    margin-bottom: 3%;
  }
  .ag .weui-form-preview__label{
    text-align: left !important;
    text-align-last: left !important;
    min-width: max-content !important;
  }
  .ag .topbar{height:2.5em;line-height: 2.5em;text-align: center;background-color: #fff;position: absolute;width:100%;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
  .ag	.strecth{
    display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
    transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
    /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
    -ms-transform:scale(1,0.5);
    -webkit-transform:scale(1,0.5);
    -moz-transform:scale(1,0.5);
    -o-transform:scale(1,0.5);
  }
  .ag	.downPanel{text-align: center;width:100%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .ag	.downbar{border-bottom: 1px solid #eee;z-index:8000;font-size: 14px}
  .ag	.box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 3px #eee;-moz-box-shadow: 0 0 3px #eee;box-shadow: 0 0 3px #eee;
  }
  .ag .yo-scroll{
    top: 6rem !important;
  }
  .ag .weui-form-preview__btn{width:100% !important;}
  .ag .yo-scroll .inner{top:-1.5em;}
  .ag .weui-form-preview__bd[data-v-7592aae6]{
    margin-bottom:1rem;
    padding: 5px 15px;
  }
</style>
