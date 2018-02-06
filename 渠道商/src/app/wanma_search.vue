<template>
  <div class='wanma_search'>
    <search class="searchHeight" :results="results" placeholder="请输入码号"  position="absolute" v-model='searchModel' @on-focus='setMargin=true' @on-blur='setMargin=false' @on-submit='search' @on-cancel="setMargin=false" top="46px"></search>
    <div :class='{searchMargin:setMargin}'></div>
    <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;'>
      <div class='card' v-for='i in datalist'>
        <div class="cardchild"><img  style="display:block;margin:0 auto;"  src="../assets/wswm.png"></div>
        <form-preview :rgactive='i.rgactive'
                      :class="{'statuea':blure,'statueb':green}"
                      :header-label="i.qrcode_num" :type='i.type'
                      :header-value="i.type" :body-items="i.list" :name='i.qrcode_id'
                      :footer-buttons="i.buttons1" >
                    <span style="margin-right: 0px;text-align: right !important;width: 9%;float: right;min-width: 2.5em !important;"
                          class="weui-form-preview__label" slot="staulogo"><img style="width:30%;" :src='i.logosrc'>&nbsp;
                    </span>
        </form-preview>
      </div>
    </scroll>
    <group v-if='biaozhi' class="history">
      <cell class="cell" title="历史记录"></cell>
        <span v-if='list.length'  @click='clearHistory'>
        <x-icon style="position:absolute;right:17px;top:13px;" type="ios-close" size="20"></x-icon></span>
      <cell value-align="left">
        <span class="font" v-for="(item,index) in list" @click.stop='histroyfont(item)' :key="index">{{item}}</span>
      </cell>
    </group>
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
  import { Search, Group,XDialog, Cell, XButton } from 'vux'
  import FormPreview from '../components/form-preview/index'
  import Scroll from '../components/scroll/index'
  export default {
    data(){
      return {
        biaozhi:'',
        datalist:[],
        searchModel:'',
        results:[],
        biaozhi:true,
        setMargin:false,
        is_show:false,
        appealContent:"",
        blure:true,
        green:false,
        list:[],
        data:[
          {content:""},
          {content:""},
          {content:""},
          {content:""}
        ],
        pageHeader:true,
        pageName:'搜索',
        bg:{white:false,grey:true},
        currentPage:1,
        totalPage:1,
        // more:false
      }
    },
    methods:{
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
      onRefresh(done){
        done()
      },
      onInfinite(done){
        this.currentPage++;
        this.searchSubmit();
        if(this.currentPage < this.totalPage){
          done && done()
        }else{
          this.$el.querySelector('.load-more').style.display = 'none';
        }
      },
      histroyfont:function(item){
        this.searchModel=item
        this.searchSubmit()
      },
      unique(arr){
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
          if(!json[arr[i]]){
           res.push(arr[i]);
           json[arr[i]] = 1;
          }
        }
        return res;
      },
      clearHistory(){
        localStorage.setItem('kw','');
        this.list=[]
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
              vm.searchSubmit()
            }else{
              this.$vux.toast.show({
                  text: res.msg,
                  type: "text",position:'bottom',
              })
            }
          })
        },
      search(){
        this.currentPage=1;
        this.datalist=[];
        this.searchSubmit();
      },
      searchSubmit(){
        let kw=this.searchModel;
        let vm = this;
        let page=this.currentPage;
        if(!kw){return};
        this.apiPost(this.phost+'/Dls/qrcodeList', {qrcode_num:kw}).then((res) => {
          if(res.code==200){
            if(res.data.length==0){
              vm.biaozhi=true
              vm.$el.querySelector('.load-more').style.display = 'none';
              // vm.more=true
            }else{
              vm.biaozhi=false
            }
            vm.totalPage=res.totalPage;
            if(res.currentPage >= res.totalPage){
              vm.$el.querySelector('.load-more').style.display = 'none';
            }

            for(let i in res.data){
                if(res.data[i].type==0){res.data[i].type='流转中';res.data[i].buttonfenpei='分配商家';res.data[i].color='blue';res.data[i].conten='点击确认后,本码不可买卖流转,只能用于商家激活';res.data[i].logosrc=require('../assets/liuzhuan.jpg');res.data[i].chuannum='1';this.blure=true;this.green=false}
                if(res.data[i].type==1){res.data[i].type='等待商家激活';res.data[i].buttonfenpei='取消分配';res.data[i].color='red';res.data[i].conten='点击确定后,本码只能买卖流转,不能用于商家激活';res.data[i].logosrc=require('../assets/jihuop.png');res.data[i].chuannum='0';this.blure=true;this.green=false}
                if(res.data[i].type==2){res.data[i].type='已激活';res.data[i].logosrc=require('../assets/duihao.png');res.data[i].gactive=true;this.green=true; }
                if(res.data[i].belong_shop==null){res.data[i].belong_shop='暂无'}
                if(res.data[i].shop_type==null){res.data[i].shop_type='暂无'}
                if(res.data[i].shop_type=="1"){res.data[i].shop_type='审核通过'}
                if(res.data[i].shop_type=="0"){res.data[i].shop_type='待审核'}
                if(res.data[i].shop_type=="2"){res.data[i].shop_type='审核拒绝'}
              vm.datalist.push({
                logosrc:res.data[i].logosrc,
                name:'码号'+ res.data[i].qrcode_num,
                qrcode_num:res.data[i].qrcode_num,
                user:res.data[i].name+res.data[i].mobile,
                belong_shop:res.data[i].belong_shop,
                shop_type:res.data[i].shop_type,
                type:res.data[i].type,
                qrcode_id:res.data[i].qrcode_id,
                list:[
                  {label:'所属商家:',value:res.data[i].belong_shop},
                  {label:'商家状态:',value:res.data[i].shop_type},
                  {label:'持有者:',value:res.data[i].name+res.data[i].mobile},
                ],
                buttons1:[{
                      is_show:res.data[i].type !=2 && res.data[i].buttonfenpei,
                      style:res.data[i].color,
                      text:res.data[i].buttonfenpei,
                      onButtonClick:(name) => {
                          // alert(name)
                          this.$vux.confirm.show({
                            title: '温馨提示',
                            content: res.data[i].conten,
                            onCancel () {
                            },
                            onConfirm () {
                              vm.distribution(name,res.data[i].chuannum)
                              //alert(222)
                              //vm.codeList()
                            }
                        })
                      }
                  },{
                      is_show:true,
                      style:'primary',
                      text:'查看',
                      onButtonClick:(name) => {
                        // alert(name)
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
              })

            }
          }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'top',
            })
          }
        });
        let list=this.list;
        if(list == null){
          if(!kw){return;}
          list=kw;
        }else{
          if(!kw){return;}
          for(let i in list){
            if(kw==list[i]){return}
          }
          list.push(kw);
          list=this.unique(list)
        }
        localStorage.setItem('wanma_kw',JSON.stringify(list))
      }
    },
    components: {
      Search,
      Group,
      Cell,
      XButton,
      FormPreview,
      Scroll,
      XDialog
    },
    mounted(){
      //this.clearHistory()
      let kw=localStorage.getItem('wanma_kw');
      if(kw){this.list=JSON.parse(kw);}
      this.search()
    },
    mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .wanma_search .searchMargin{height:25px;width:100%;}
  .wanma_search .vux-x-icon {
    fill: #C6C6C6;
  }
  .wanma_search .font , .cell{
    font-size: 14px;
  }
  .wanma_search .history{
    top:85px;
    width: 100%;
    /*margin-top:-1.2em;*/
  }
  .wanma_search .search{
    margin-top:-1rem;

    top:182px;
    width: 100%;
  }
  .wanma_search .searchHeight{
    height:1.5rem;
  }
  .wanma_search .history .font,.sch .search .font{
    padding:0 10px;
    border-right:1px solid #ddd;
    display: inline-block;
  }
  .wanma_search .weui-search-bar{background-color: #EFEFF4;}
  .wanma_search .beforeSearch{background-color: #fff;text-align: center;padding:5px 15px;color:#999;}
  .wanma_search .weui-search-bar__form:after{border:none;}
  .wanma_search .weui-search-bar__form{background-color: #fff;}
  .wanma_search .weui-search-bar__cancel-btn{color:#999;}
  .wanma_search .weui-form-preview__bd, .sch .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .wanma_search .weui-form-preview__btn_primary {
    color: #909090 !important;
    border: 1px solid #eee;
    border-radius: 7px !important;
    font-size: 14px;
  }
  .wanma_search .weui-form-preview__hd .weui-form-preview__value {
    font-size: 1em !important;
    color: #6594fe;
  }
  .wanma_search .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .wanma_search .weui-form-preview:after{
    border-bottom: none !important;
  }
  .wanma_search .weui-form-preview:before{
    border-top: none !important;
  }
  .wanma_search .weui-form-preview__ft{
    line-height: 28px !important;
    width: 22% !important;
    //position: absolute !important;
    right: 3% !important;
    bottom: 8px !important;
  }
  .wanma_search .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .wanma_search .vux-form-preview{
    height: 132px !important;
  }
  .wanma_search .router-view{
    /*height: 35% !important;*/
  }
  .wanma_search .weui-tab__panel {
    background-color: #eee;
  }
  .wanma_search .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .wanma_search .im img {
    width: 100%;
    height: 100%;
  }
  .wanma_search .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
  }
  .wanma_search .weui-select{
    padding-left: 41% !important;
  }
  .wanma_search .weui-form-preview__btn[data-v-7592aae6]{
    width: 19% !important;
  }
  .wanma_search .weui-form-preview__hd[data-v-7592aae6]{
    line-height: 1.1em;
    height:1.1em;
  }
  .wanma_search .weui-form-preview__ft[data-v-7592aae6]{
    width: 95%!important;
  }
  .wanma_search .weui-form-preview__ft {
    margin-top: 1em;
    height: 2em !important;
    line-height: 2em !important;
    /* width: 92% !important; */
    /* position: absolute !important; */
    bottom: 8px !important;
    font-size: 14px;
    width: 100%;
  }
  .wanma_search .card{
    position: relative;
  }
  .wanma_search .vux-form-preview {
    height: 50% !important;
  }
  .wanma_search .cardchild {
    position: absolute;
    top: 13px;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 1em;
  }
  .wanma_search .cardchild img {
    width: 100%;
  }
  .wanma_search .weui-form-preview__hd {
    text-indent: 5% !important;
  }
  .wanma_search  .card{
    margin-bottom: 3%;
  }
  .wanma_search .weui-form-preview__label{
    text-align: left !important;
    text-align-last: left !important;
    min-width: max-content !important;
  }
  .wanma_search .yo-scroll{
    top: 6.5rem !important;
  }
  .wanma_search .yo-scroll{
    top: 6.2rem !important;
  }
  .wanma_search .yo-scroll .inner{
    top: -1.5rem !important;
  }
  .wanma_search .weui-form-preview__ft .weui-form-preview__btn_primary:last-child {
    background-color: #f7ba2b !important;
    color: #fff !important;
  }
  .red[data-v-7592aae6] {
    background: #ff4948;
    color: #fff !important;
    border-radius: 5px !important;
    font-size: 12px !important;
  }
  .wanma_search .weui-form-preview__btn {
    font-size: 12px;
  }
  .wanma_search .weui-form-preview__ft{
    margin-top:1em;
    height:2em !important;
    line-height: 2em !important;
    /*width: 92% !important;*/
    /* position: absolute !important;*/
    bottom: 8px !important;
    font-size: 14px;
    width:100%;
  }
  .wanma_search .statuea .weui-form-preview__hd .weui-form-preview__value{
    color:#6594FE;
  }
    .wanma_search .statueb .weui-form-preview__hd .weui-form-preview__value{
    color:#2DD377;
  }
  .wanma_search .weui-form-preview__hd .weui-form-preview__value {
    font-size: 0.8em !important;
    color: #6594fe;
    text-align: left !important;
    text-indent: 0 !important;
    float: right;
  }
  .wanma_search .appeal{width:90%;margin:0 auto;background-color: #fff;border-radius: 10px;padding-bottom: 15px;font-size: 14px;}
  .wanma_search .appeal_title{font-size: 16px;color:#6594fe;height:2.5em;line-height: 2.5em;}
  .wanma_search .appeal_content{width:90%;border:1px solid #eee;height:8em;border-radius: 5px;    text-indent: 6%;
    padding-top: 2%;}
  .wanma_search .appeal_content::-webkit-input-placeholder{height:2em;line-height: 2em;}
  .wanma_search .appeal_content::-moz-placeholder{height:2em;line-height: 2em;}
  .wanma_search .appeal_content::-ms-input-placeholder{height:2em;line-height: 2em;}
  .wanma_search .weui-form-preview__label[data-v-7592aae6]{color:#000;}
</style>
