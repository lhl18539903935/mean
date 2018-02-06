<template>
    <group class="det">
      <div class='card' v-for='(i,a) in datalist' :key="a">
        <div class="cardchild"><img src="../assets/wswm.png"></div>
        <form-preview  :header-label="i.name" :class="{'statuea':blure,'statueb':green}" :header-value="i.status" :body-items="i.list" :footer-buttons="i.buttons1" :name='i.qrcode_id'>
          <span style="margin-right: 0px;text-align: right !important;width: 9%;float: right;min-width: 2.5em !important;" class="weui-form-preview__label" slot="staulogo">
            <img style="width:30%" :src='logosrc'></span>
        </form-preview>
      </div>
      <div>
        <div style="margin-bottom:5%"><span style="padding: 3%;font-size: 15px;">持有者流转记录</span></div>
        <flow orientation="vertical" v-for='(i,index) in histrorylist' :key='index' class="flowstate" >
            <!--<flow-state :title='i.name +"  " + i.mobile +"  "+ i.create_time' :is-done='i.isdone'>
            </flow-state>-->
            <flow-state>
            </flow-state>
             <p style="position:absolute;left:3rem;top:-0.2rem;color:#999999;font-size:14px">{{i.name}}</p>
             <p style="position:absolute;left:3rem;top:1rem;color:#999999;ont-size:14px">{{i.mobile}}  {{i.create_time}}</p>
            <flow-line></flow-line>
             <img class="flowimg" v-if="i.identity==1" src="../assets/jihuo.png" alt="">
            <img class="flowimg" v-if="i.identity==2" src="../assets/zhuanzeng.png" alt="">
        </flow>

        <div v-if='morely' style='overflow:hidden' @click='more'><span style="width: 56%;font-size: 14px;float: right;margin: 0px auto;">查看更多</span></div>
      </div>
    </group>
</template>

<script type="es6">
  import {Group,Flow,FlowState,FlowLine} from 'vux'
  import FormPreview from '../components/form-preview/index'
  import format from '../tools/date/format.js'
  export default {
    data(){
    return{
      showModel:true,
      pageHeader:true,
      pageName:"乐码管理",
      datalist:[],
      histrorylist:[],
      logosrc:'',
      qrcode_num:'',
      bg:{white:false,grey:true},
      totalpage:'',
      morely:true,
      blure:true,
      green:false,
      pages:2
    }
  },
  methods:{
    more:function(){
      let vm = this;
      let page=vm.pages++;

      vm.apiPost(this.phost+'/Dls/moreDetail', {qrcode_id:this.$route.query.qrcode_id,page:page}).then((res) => {

        if(res.code==200){
          if(res.data.length==0){
            this.$vux.toast.show({
                text: '没有更多了',
                type: "text",position:'bottom',
            })
            vm.morely=false
          }else{
            for(let c in res.data){
              res.data[c].create_time=format(res.data[c].create_time*1000,'YYYY.MM.DD')
              // res.data[c].kongge=' '
            }
            vm.histrorylist=vm.histrorylist.concat(res.data)
          }
        }
      })

    }
  },
  mounted:function() {

    var vm = this;
    vm.apiPost(this.phost+'/Dls/moreDetail', {qrcode_id:this.$route.query.qrcode_id,page:1}).then((res) => {
      if(res.code==200){
        this.histrorylist=res.data

        for(let c in res.data){
              res.data[c].create_time=format(res.data[c].create_time*1000,'YYYY.MM.DD')
            }
      }
    })
    vm.apiPost(this.phost+'/Dls/qrcodeDetail', {qrcode_id:this.$route.query.qrcode_id}).then((res) => {
      this.datalist=[];
      if(res.code==200){
        var newres={}
        // if(typeof res.data.data=='undefined'){
          // pc端显示
          var newres=res.data
        // }else{
          // 移动端
          // var newres=res.data.data
        // }
          if(newres.type==0){newres.type='流转中';vm.logosrc=require('../assets/liuzhuan.jpg')}
          if(newres.type==1){newres.type='等待商家激活';vm.logosrc=require('../assets/jihuop.png')}
          if(newres.type==2){newres.type='已激活';vm.logosrc=require('../assets/duihao.png');this.green=true}
          if(newres.belong_shop==null){newres.belong_shop='暂无'}
          if(newres.shop_type==null){newres.shop_type='暂无'}
          if(newres.shop_type=='1') {newres.shop_type='审核通过'}
          if(newres.shop_type=='0') {newres.shop_type='待审核'}
          if(newres.shop_type=='2') {newres.shop_type='审核拒绝'}

          vm.datalist.push({
            name:'码号'+ newres.qrcode_num,
            status:newres.type,
            qrcode_id:newres.qrcode_id,
            list:[
              {label:'所属商家:',value:newres.belong_shop},
              {label:'商家状态:',value:newres.shop_type},
              {label:'持有者:',value:newres.name + newres.mobile}
            ],
            buttons1:[{
                is_show:true,
                style:'blue',
                text:'查看乐码',
                link:'/code?qrcode_id=' + vm.$route.query.qrcode_id
              }]
          })
        // vm.totalpage=newres.totalpage
      }
    })

  },
  components:{
    Group,
      FormPreview,
      Flow,
      FlowState,
      FlowLine
  },
  mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .det .weui-cells{
    padding-bottom: 13%;
    font-size: 15px !important;
    margin-top: 12px !important;
  }
  .det .weui-form-preview__bd, .det .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .det .weui-form-preview__btn_primary {
      color: #909090 !important;
      border: 1px solid #eee;
      border-radius: 7px !important
  }
  .det .statuea .weui-form-preview__hd .weui-form-preview__value{
      font-size: 0.8em !important;
      text-align: left !important;
      color:#6594FE;
      text-indent: 0 !important;
      float: right;
  }
    .det .statueb .weui-form-preview__hd .weui-form-preview__value{
      font-size: 0.8em !important;
      text-align: left !important;
      text-indent: 0 !important;
      color:#14CE67;
      float: right;
  }
  .det .flowstate{
    position: relative!important;
  }
  .det .flowimg{
    position:absolute;
    top:5px;
    right:14px;
    width:25px;
  }
  .det .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .det .weui-form-preview:after{
    border-bottom: none !important;
  }
  .det .weui-form-preview:before{
    border-top: none !important;
  }
  .det .weui-form-preview__ft{
    line-height: 30px !important;
    width: 20% !important;
    position: absolute !important;
    left: 3% !important;
    bottom: 0px !important;
  }
  .det .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .det .vux-form-preview{
    height: 188px !important;
  }
  .det .router-view{
    /*height: 35% !important;*/
  }
  .det .weui-tab__panel {
    background: #eee !important;
  }
  .det .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .det .im img {
    width: 100%;
    height: 100%;
  }
  .det .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
    width: 50%;
  }
  .card{
    position: relative;
  }
  .cardchild {
    position: absolute;
    top: 5%;
    left: 3.5%;
    z-index: 999;
    width: .9em;
    vertical-align: middle;
    line-height: 0.1;
  }
  .cardchild img {
    width: 100%;
  }
  .det .weui-form-preview__hd {
    text-indent: 5% !important;
    overflow: hidden !important;
    padding: 10px 15px !important;
    line-height: 1em !important;
  }
  .det .card{
    margin-bottom: 3%;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .det .weui-form-preview__label{
    min-width: max-content !important;
  }
  .det .weui-select{
    left: 31%;
    padding-left: none;
  }
.det .weui-form-preview__ft .weui-form-preview__btn_primary:first-child{background-color: #f7ba2b !important;color:#fff !important;}
.det .weui-wepay-flow_vertical .weui-wepay-flow__line {
  height: 35px !important;
}
.det .weui-wepay-flow, .weui-wepay-flow-auto{
  padding:0 !important;
}
.det .weui-wepay-flow, .weui-wepay-flow-auto{
  padding-right: 84% !important;
}
.det .weui-wepay-flow__li_done .weui-wepay-flow__state{
  background-color: #6594fe !important;
}
.det .weui-wepay-flow__li_done .weui-wepay-flow__title-right{
  color: #6594fe !important;
}
.cardchilds {
  position: absolute;
  top: 8%;
  right: 28%;
  z-index: 999;
  width: 4%;
  height: 8%;
}
.cardchilds img {
  width: 100%;
  height: 100%;
}
.det .weui-form-preview__label{width:4rem;}
.det .weui-form-preview__btn{
  width: 100% !important;
}
</style>
