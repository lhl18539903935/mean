<template>
    <div @click="hideAll" class='wwm clearfix'>
      <x-header :title="pageName">
        <span    style='position:absolute;' slot="right" >
              <router-link to='/wanma_search'><img height=20 style="margin-right:0.1rem" src="../assets/fangda.png">&nbsp;&nbsp;&nbsp;</router-link>
              <img @click='scan' height=18 src="../assets/scan.jpg">
            </span>

      </x-header>
    <card style="z-index:1000">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          <span style="font-weight: 400;font-size: 16px">{{qrCode.totalQrcode}}</span>
          <br/>
          总码数
        </div>
        <div class="vux-1px-r">
          <span style="font-weight: 400;font-size: 16px">{{qrCode.ownerQrcode}}</span>
          <br/>
          持码数
        </div>
        <div class="vux-1px-r">
          <span style="font-weight: 400;font-size: 16px">{{qrCode.noActiveQrcode}}</span>
          <br/>
          待激活码数
        </div>
      </div>
    </card>

    <div @click.stop='changeLeftState' class='topbar'>
        <span style="font-size: 14px">{{left_title}}</span><span v-show='!left_show' class="strecth" >   ▼   </span>
        <span v-show='left_show' class="strecth" >▲  </span>
        <div v-if='left_show' class='downPanel box-shadow'>
           <div  @click='onChange(3)'  class='downbar'>码状态</div>
           <div  @click='onChange(0)'  class='downbar'>流转中</div>
           <div  @click='onChange(1)' class='downbar'>等待商家激活</div>
           <div  @click='onChange(2)'  class='downbar'>已激活</div>
        </div>
    </div>

    <div @click.stop='changeRightState' class='topbar topbar_r'>
        <span style="font-size: 14px">{{right_title}}</span><span v-show='!right_show' class="strecth" >   ▼   </span>
        <span v-show='right_show' class="strecth" >▲</span>
        <div v-if='right_show' class='downPanel box-shadow'>
           <div @click='xiugai(0)' class='downbar'>码所属</div>
           <div  @click='xiugai(1)'  class='downbar'>我的码</div>
           <div @click='xiugai(2)' class='downbar'>渠道码</div>
        </div>
    </div>

  <div v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="position:absolute;width:100%;top:11rem;left:0;right:0;bottom:0;overflow:scroll;margin-bottom:3rem">
    <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center">
        <div class='card' v-for='(i,index) in datalist' :key="index">
          <div class="cardchild"><img src="../assets/wswm.png"></div>
          <form-preview :gactive='i.gactive' :header-label="i.name" :header-value="i.status"
                                                 :body-items="i.list" :footer-buttons="i.buttons1" :name='i.qrcode_id' :type='i.type'>
          <span style="margin-right: 0px;text-align: right !important;width: 9%;float: right;min-width: 2.5em !important;" class="weui-form-preview__label" slot="staulogo"><img style="width:30%;" :src='i.logosrc'>&nbsp;
          </span>
            <div style="clear:both"></div>
        </form-preview>
        </div></van-pull-refresh>
    </div>

      <div v-if='more' style='text-align:center;color:#2e2e2e;font-size:14px;'>没有更多了...</div>
      <x-dialog v-model='is_show' :hide-on-blur='true'>
          <div class='appeal'>
            <p class='appeal_title'>申诉</p>
            <textarea v-model='appealContent' class='appeal_content' placeholder="请输入您要申诉的内容"></textarea>
            <div style='width:80%;margin:0 auto;margin-top:0.5em;'>
                <div @click='is_show=false' style="float:left;height:2em;width:6em;line-height:2em;border-radius:5px;;border:1px solid #ccc;">取消</div>
                <div @click='appeal' style="float:right;height:2em;width:3em;background-color:#6594fe;line-height:2em;color:#fff;border-radius:5px;width:6em;">确定</div>
                <div style='clear:both;'></div>
            </div>
      </div>

      </x-dialog>
    </div>
</template>
<script type="es6">
   import {Group,Cell,Selector,Confirm,XDialog,Card,XHeader} from 'vux'
  import { Waterfall } from 'vant';
   import FormPreview from '../components/form-preview/index'
   import VanPullRefresh from '../vant/packages/pull-refresh/index.vue'
    export default {
        data(){
          return{
            appealContent:'',
              is_show:false,
              qrcode_id:'',
              plainList:[{key:3,value:'码状态'},{key:0,value:'流转中'},{key:1,value:'等待商家激活'},{key:2,value:'已激活'}],
              plainListant:[{key:0,value:'码所属'},{key:1,value:'我的码'},{key:2,value:'渠道码'}],
              pageHeader:false,
              showModel:true,
              pageName:"乐码管理",
              datalist:[],
              type:3,
              qr_type:0,
              left_show:false,
              right_show:false,
              showState:true,
              left_title:'码状态',
              right_title:'码所属',
              bg:{white:false,grey:true},
              currentPage:1,
              moreModel:true,
              more:false,
              isDone:false,
              isLoading:false,
              qrCode:[],
              disabled:false
          }
      },
       watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.datalist=[];
            this.currentPage=1;
            this.codeList()
          }
        }
      },

      directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
      methods:{
        loadMore(){
          this.currentPage++;
          this.codeList()
        },
        scan() {
        let vm=this;
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            let query=result.text;
            let p=query.indexOf('qrcode_num');
            let p_slit=query.substr(p);
            let queryArr=p_slit.split('/');
            vm.sendScan(queryArr);
          },
          function (error) {
             // alert("Scanning failed: " + error);
             this.$vux.toast.show({
                  text: '扫描失败',
                  type: "text",position:'bottom',
              })
          }
       );
    },
    sendScan(queryArr){
      let vm=this;
      let data={qrcode_num:queryArr[1],key:queryArr[3]};
      //let data={qrcode_num:10000011,key:'iv99klsed4gw6w3r42wf6nmilma3upo1'};
      this.apiPost(this.phost+'/Dls/bindQrcode', data).then((res) => {
            if(res.code==200){
              this.$vux.toast.show({
                    text: res.msg,
                    type: "success"
                })
                vm.currentPage=1;
                vm.datalist=[];
                vm.codeList();
            }else{
              this.$vux.toast.show({
                    text: res.msg,
                    type: "text",position:'bottom',
                })
            }
          })
    },
        appeal(){
          let vm=this;
          let content=this.appealContent;
          let qrcode_id=this.qrcode_id;
          if(!content){
              this.$vux.toast.show({
                  text: '请输入申诉内容！',
                  type: "text",position:'bottom',
              })
              return;
          }
          this.apiPost(this.phost+'/Dls/qrcodeAppeal', {qrcode_id:qrcode_id,appeal:content}).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                  text: res.msg,
                  type: "success"
              })
                this.$router.push('/complaint')
                this.is_show=false;
            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "text",position:'bottom',
              })
            }

          })

        },
        hideAll(){
          this.left_show=false;
          this.right_show=false;
        },
        changeRightState(){
          this.right_show=!this.right_show;
          this.right_show ? this.left_show=false : "";
        },
        changeLeftState(){
          this.left_show=!this.left_show;
          this.left_show?this.right_show=false:"";
        },
        xiugai(val){
          if(val == 1){this.right_title='我的码'}
          if(val == 2){this.right_title='渠道码'}
          if(val == 0){this.right_title='码所属'}
          this.qr_type=val;
          this.currentPage=1;
          this.datalist=[];
           this.disabled=false;
          this.codeList();
        },
        onChange:function(val) {
          if(val == 0){this.left_title='流转中'}
          if(val == 1){this.left_title='等待商家激活'}
          if(val == 2){this.left_title='已激活'}
          if(val == 3){this.left_title='码状态'}
          this.type=val;
          this.currentPage=1;
          this.datalist=[]
           this.disabled=false
          this.codeList();
        },
        distribution:function(name,type){
          let vm=this;
          this.apiPost(this.phost+'/Dls/allocateQrcode', {qrcode_id:name,type:type}).then((res) => {
            if(res.code==200){
                this.$vux.toast.show({
                  text: res.msg,
                  type: "success"
              })
              vm.currentPage=1;
              vm.datalist=[]
              vm.codeList()
            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "text",position:'bottom',
              })
            }
          })
        },
        codeList(){
          var vm = this;
          var type=''
          var qr_type=''
          let page = this.currentPage;
          if(this.type==3){
            var type=''
          }else{
            var type=this.type
          }
          if(this.qr_type == 0){
            var qr_type=''
          }else{
            var qr_type=this.qr_type;
          }
          vm.apiPost(this.phost+'/Dls/qrcodeList', {type:type,qr_type:qr_type,page:page}).then((res) => {
            //this.datalist=[];
            this.isLoading=false
            if(res.code==200){
              vm.qrCode=res;
              if(res.data.length==0){
                // vm.more=true
                vm.disabled=true
                return
              }
              if(res.currentPage == res.totalPage){
                vm.disabled=true
              }
              let v=vm.datalist.reverse();

              for(let i in res.data){
                if(res.data[i].type==0){res.data[i].type='流转中';res.data[i].buttonfenpei='分配商家';res.data[i].color='blue';res.data[i].conten='点击确认后,本码不可买卖流转,只能用于商家激活';res.data[i].logosrc=require('../assets/liuzhuan.jpg');res.data[i].chuannum='1';}
                if(res.data[i].type==1){res.data[i].type='等待商家激活';res.data[i].buttonfenpei='取消分配';res.data[i].color='red';res.data[i].conten='点击确定后,本码只能买卖流转,不能用于商家激活';res.data[i].logosrc=require('../assets/jihuop.png');res.data[i].chuannum='0'}
                if(res.data[i].type==2){res.data[i].type='已激活';res.data[i].logosrc=require('../assets/duihao.png');res.data[i].gactive=true; }
                if(res.data[i].belong_shop==null){res.data[i].belong_shop='暂无'}
                if(res.data[i].shop_type==null){res.data[i].shop_type='暂无'}
                if(res.data[i].shop_type=="1"){res.data[i].shop_type='审核通过'}
                if(res.data[i].shop_type=="0"){res.data[i].shop_type='待审核'}
                if(res.data[i].shop_type=="2"){res.data[i].shop_type='审核拒绝'}
                let arr={
                  logosrc:res.data[i].logosrc,
                  name:'码号'+ res.data[i].qrcode_num,
                  status:res.data[i].type,
                  gactive:res.data[i].gactive,
                  qrcode_id:res.data[i].qrcode_id,
                  type:res.data[i].chuannum,
                  list:[
                    {label:'所属商家:',value:res.data[i].belong_shop},
                    {label:'商家状态:',value:res.data[i].shop_type},
                    {label:'持有者:',value:res.data[i].name + res.data[i].mobile}
                  ],
                  buttons1:[{
                      is_show:res.data[i].type !=2 && res.data[i].buttonfenpei,
                      style:res.data[i].color,
                      text:res.data[i].buttonfenpei,
                      onButtonClick:(name) => {
                          this.$vux.confirm.show({
                            title: '温馨提示',
                            content: res.data[i].conten,
                            onCancel () {
                            },
                            onConfirm () {
                              vm.distribution(name,res.data[i].chuannum)
                            }
                        })
                      }
                  },{
                      is_show:true,
                      style:'primary',
                      text:'查看',
                      onButtonClick:(name) => {
                       this.$router.push({path: '/detail?qrcode_id='+ name});
                      }
                    },{
                      is_show:true,
                      style:'tricolor',
                      text:'申诉',
                      onButtonClick:() => {
                        this.is_show=true;
                        this.qrcode_id=res.data[i].qrcode_id;
                      }
                    },{
                      is_show:res.data[i].cangive !=0,
                      style:'primary',
                      text:'转赠',
                      link:'/give?qrcode_id=' + res.data[i].qrcode_id+'&qrcode_num'+'='+res.data[i].qrcode_num
                    }]
                }
                v.unshift(arr);

              }

              vm.datalist=v.reverse()
            }
            if(res.code==400){
              this.$router.go(0)
            }else{
               // vm.$el.querySelector('.load-more').style.display = 'none';
            }
          })
        }
      },
    mounted:function() {
      let vm=this;
      //setTimeout(function(){vm.codeList()}, 500);
      vm.codeList()
    },
    components:{
        Group,
        Cell,
        FormPreview,
        Selector,
        Confirm,
        XDialog,
        Card,VanPullRefresh,
        XHeader,Waterfall
    },
    mixins:[window.mixins,window.http]
    }
</script>


<style>
  .wwm .weui-form-preview__bd, .wwm .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .wwm .weui-form-preview__btn_primary {
      color: #909090 !important;
      border: 1px solid #eee;
      border-radius: 5px !important;
      font-size: 12px !important;
  }
  .wwm .weui-form-preview__hd .weui-form-preview__value {
      font-size: 0.8em !important;
      color: #6594fe;
      text-align: left !important;
      text-indent: 0 !important;
      float: right;
  }
  .wwm .weui-form-preview__value[data-v-7592aae6]{
    font-size: 14px;
  }
  .wwm .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .wwm .weui-form-preview:after{
    border-bottom: none !important;
  }
  .wwm .weui-form-preview:before{
    border-top: none !important;
  }
  .wwm .weui-form-preview__ft{
    margin-top:1em;
    height:2em !important;
    line-height: 2em !important;
    /*width: 92% !important;*/
   /* position: absolute !important;*/
    bottom: 8px !important;
    font-size: 14px;
    width:100%;
  }
  .wwm .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .wwm .vux-form-preview{
    height: 50% !important;
  }
  .wwm .router-view{
    /*height: 35% !important;*/
  }
  .wwm .weui-tab__panel {
    background: #eee !important;
  }
  .wwm .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .wwm .im img {
    width: 100%;
    height: 100%;
  }
  .wwm .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
    width: 50%;
  }
  .wwm .card{
    position: relative;
  }
  .wwm .cardchild {
    position: absolute;
    top: 0.7em;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 0.1;
  }
  .wwm .cardchild img {
    width: 100%;
  }
  .wwm .cardchilds {
    position: absolute;
    top: 8%;
    right: 16%;
    z-index: 999;
    width: 4%;
    height: 8%;
  }
  .wwm .cardchilds img {
    width: 100%;
    height: 100%;
  }
  .wwm .weui-form-preview__hd {
    text-indent: 5% !important;
    overflow: hidden !important;
    padding: 10px 15px !important;
    line-height: 1em !important;
  }
  .wwm .card{
    margin-bottom: 3%;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .wwm .weui-form-preview__label{
    text-align: left !important;
    text-align-last: left !important;
    min-width: max-content !important;
    .min-width: 1em ;
  }
  .wwm .weui-select{
    left: 31%;
    padding-left: none;
  }
.wwm .weui-form-preview__ft .weui-form-preview__btn_primary:last-child{background-color: #f7ba2b !important;color:#fff !important;}

  .wwm .topbar{height:2.5em;line-height: 2.5em;text-align: center;background-color: #fff;position: absolute;width:50%;float:left;z-index: 100;z-index:1000;border-bottom:1px solid #eee;}
    .strecth{
        display:inline-block;/*让span变为块状元素，只有块状元素可以缩放*/
        transform:scale(1,0.5);/*缩放属性；两个参数：(水平缩放比例,垂直缩放比例)；1表示原比例*/
        /*私有缩放属性，为了兼容各浏览器；注：不兼容IE8以下浏览器*/
        -ms-transform:scale(1,0.5);
        -webkit-transform:scale(1,0.5);
        -moz-transform:scale(1,0.5);
        -o-transform:scale(1,0.5);
    }
  .wwm .downPanel{text-align: center;width:98%;background-color: #fff;border:1px solid #eee;z-index: 8000;position: relative;margin:0 auto;top:5px;}
  .wwm .downbar{border-bottom: 1px solid #eee;z-index:8000;font-size: 14px}
  .wwm .box-shadow {background-color: #fff;position: relative;top: 0;z-index: 10;-webkit-box-shadow: 0 0 3px #eee;-moz-box-shadow: 0 0 3px #eee;box-shadow: 0 0 3px #eee;
}
  .wwm .topbar_r{left:50%;}
.wmm .weui-form-preview__btn:after{border-left:0px solid #fff !important;}
/*.yo-scroll .pull-refresh{display:none;}*/
  .wwm .appeal{width:90%;margin:0 auto;background-color: #fff;border-radius: 10px;padding-bottom: 15px;font-size: 14px;}
  .wwm .appeal_title{font-size: 16px;color:#6594fe;height:2.5em;line-height: 2.5em;}
  .wwm .appeal_content{width:90%;border:1px solid #eee;height:8em;border-radius: 5px;    text-indent: 6%;
    padding-top: 2%;}
  .wwm .appeal_content::-webkit-input-placeholder{height:2em;line-height: 2em;}
  .wwm .appeal_content::-moz-placeholder{height:2em;line-height: 2em;}
  .wwm .appeal_content::-ms-input-placeholder{height:2em;line-height: 2em;}
.yo-scroll{
  /*top: 6.5rem !important;*/
}
.wwm .yo-scroll{top:11em;margin-bottom:3rem}
.wwm .weui-dialog{border-radius: 5px;}
.wwm .yo-scroll .inner{
  top: -1.5rem !important;
}
.wwm .weui-form-preview__btn{font-size: 12px;}

.wwm .card-demo-flex {
  display: flex;
  background-color:#6594fe;
  color:#fff;
}
.wwm .card-demo-content01 {
  padding: 25px 0 15px 0;
}
.wwm .card-padding {
  padding: 15px;
}
.wwm .card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.wwm .header{
  background-color:#6594fe;
  text-align:center;
  color:#fff;
}
.wwm .weui-panel:before{
  border-top:none;
}
.wwm .title{
  padding: 2% 0 6%;
}
.wwm .vux-1px-r[data-v-2bf4e57a]:after{
  border-right: 1px solid #fff;
}
.wwm .vux-1px-r:after{border-right: 1px solid #fff;}
.wwm .weui-form-preview__label[data-v-7592aae6]{
  font-size: 14px;
}
  .wwm{
    margin-top:-2.9rem!important;
  }
  .wwm .weui-panel{
    margin-top:0;
  }
</style>
