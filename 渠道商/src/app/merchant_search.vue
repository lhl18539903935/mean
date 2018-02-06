<template>
  <div class='merchantSearch'>
    <search  class="searchHeight" :results="results"  placeholder="请输入商家名称" position="absolute" v-model='searchModel' @on-focus='setMargin=true' @on-blur='setMargin=false' @on-submit='search' @on-cancel="setMargin=false" top="46px"></search>
    <div :class='{searchMargin:setMargin}'></div>

      <div class='section' v-for="(item,index) in dataList" :key='index' v-if="!biaozhi">
        <div class='merchant-title vux-1px-b'>
          <p class='fl'><img style='height:1em;vertical-align:middle;margin:-3px 3px 0 10px;' src="../assets/daililogo.png">  {{item.merchant_name}}</p>
          <p class='fr state'>{{item.status_name}}</p>
        </div>
        <div class='merchant-middle vux-1px-b'>
          <p>所属区域：{{item.province+item.city+item.area}}</p>
          <p>行业分类：{{item.industry_type}}</p>
          <p>联系电话：{{item.seller_mobile}}</p>
          <p>联系人：{{item.seller_name}}</p>
          <p>码号：{{item.qrcode_num}}</p>
          <p>持有者姓名：{{item.holder_name}}</p>
          <p>持有者电话：{{item.holder_mobile}}</p>
          <p >折扣比例：{{item.discount_ratio}}</p>
          <p class="lastP"></p>
        </div>
        <div class='merchant-bottom clearfix'>
          <div v-if="item.status == 1" class='fl'>
            <div style='background:#13ce66;height:0.5em;width:0.5em;margin-bottom:0.2em;display:inline-block;border-radius:50%;'></div>&nbsp;上线
          </div>
          <router-link :to="'/upload?type=contract&merchant_id='+item.merchant_id"><p v-if="getStatus(item)" class='fr btn-up'>上传合同</p></router-link>
          <router-link :to="'/merchantDetail?qrcode_id='+item.qrcode_id"><p class='fr btn-see'>查看</p></router-link>

        </div>
      </div>
    </scroll>
    <group v-if='biaozhi' class="history">
      <cell class="cell" title="历史记录"></cell>
        <span v-if='list.length'  @click='clearHistory'>
        <x-icon style="position:absolute;right:17px;top:13px;" type="ios-close" size="20"></x-icon></span>
      <cell value-align="left">
        <span class="font" v-for="(item,index) in list" @click.stop='histroyfont(item)' :key="index">{{item}}</span>
      </cell>
      <!-- <div v-if='more' style='text-align:center;color:#2e2e2e;font-size:14px;'>没有更多了...</div> -->
    </group>
    <!-- <group v-if='biaozhi' class="search">
      <cell class="font" title="搜索指定内容" value-align="left">
      </cell>
      <cell value-align="left">
        <span class="font" v-for="(item,index) in data" :key="index">{{item.content}}</span>
      </cell>
    </group> -->
  </div>
</template>

<script type="es6">
  import { Search, Group, Cell, XButton } from 'vux'
  import FormPreview from '../components/form-preview/index'
  import Scroll from '../components/scroll/index'
  export default {
    data(){
      return {
        biaozhi:'',
        dataList:[],
        searchModel:'',
        results:[],
        biaozhi:true,
        setMargin:false,
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
      getStatus(item){
        if(item.contract == null && item.status != 1){
          return true;
        }
        if(item.contract && item.status ==2){
          return true;
        }
        return false;
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
      search(){
        this.currentPage=1;
        this.datalist=[];
        this.searchSubmit();
      },
      searchSubmit(){
        let kw=this.searchModel;
        let vm = this;
        if(!kw){return};
        this.apiPost(this.phost+'/Merchant/getMerchantList', {merchant_name:kw}).then((res) => {
          if(res.code=200){
           if(res.data.length==0){
              vm.biaozhi=true
              // vm.$el.querySelector('.load-more').style.display = 'none';
              // vm.more=true
            }else{
              vm.biaozhi=false
            }
            vm.dataList=res.data
            for(var i in vm.dataList){
              if(res.data[i].industry_type=="1") res.data[i].industry_type="美食"
            	  if(res.data[i].industry_type=="2") res.data[i].industry_type="休闲娱乐"
            	  if(res.data[i].industry_type=="3") res.data[i].industry_type="酒店住宿"
            	  if(res.data[i].industry_type=="4") res.data[i].industry_type="汽车服务"
            	  if(res.data[i].industry_type=="5") res.data[i].industry_type="美容美发"
            	  if(res.data[i].industry_type=="6") res.data[i].industry_type="医疗健康"
            	  if(res.data[i].industry_type=="7") res.data[i].industry_type="法律服务"
            	  if(res.data[i].industry_type=="8") res.data[i].industry_type="培训教育"
            	  if(res.data[i].industry_type=="9") res.data[i].industry_type="生鲜果蔬"
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
        localStorage.setItem('merchant_kw',JSON.stringify(list))
      }
    },
    components: {
      Search,
      Group,
      Cell,
      XButton,
      FormPreview,
      Scroll
    },
    mounted(){
      //this.clearHistory()
      let kw=localStorage.getItem('merchant_kw');
      if(kw){this.list=JSON.parse(kw);}
      this.search()
    },
    mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .merchantSearch .searchMargin{height:44px;width:100%;}
  .merchantSearch .vux-x-icon {
    fill: #C6C6C6;
  }
  .merchantSearch .font ,.cell{
    font-size: 14px;
  }
  .merchantSearch  .history{
    top:85px;
    width: 100%;
    margin-top:-1.2em;
  }
  .merchantSearch .search{
    margin-top:-1rem;

    top:182px;
    width: 100%;
  }
  .merchantSearch .searchHeight{
    height:2.6rem;
  }
  .merchantSearch .history .font,.sch .search .font{
    padding:0 10px;
    border-right:1px solid #ddd;
    display: inline-block;
  }
  .merchantSearch .weui-search-bar{background-color: #EFEFF4;}
  .merchantSearch .beforeSearch{background-color: #fff;text-align: center;padding:5px 15px;color:#999;}
  .merchantSearch .weui-search-bar__form:after{border:none;}
  .merchantSearch .weui-search-bar__form{background-color: #fff;}
  .merchantSearch .weui-search-bar__cancel-btn{color:#999;}
  .merchantSearch .weui-form-preview__bd, .sch .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .merchantSearch .weui-form-preview__btn_primary {
    color: #909090 !important;
    border: 1px solid #eee;
    border-radius: 7px !important;
    font-size: 14px;
  }
  .merchantSearch .weui-form-preview__hd .weui-form-preview__value {
    font-size: 1em !important;
    color: #6594fe;
  }
  .merchantSearch .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .merchantSearch .weui-form-preview:after{
    border-bottom: none !important;
  }
  .merchantSearch .weui-form-preview:before{
    border-top: none !important;
  }
  .merchantSearch .weui-form-preview__ft{
    line-height: 28px !important;
    width: 22% !important;
    position: absolute !important;
    right: 3% !important;
    bottom: 8px !important;
  }
  .merchantSearch .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .merchantSearch .vux-form-preview{
    height: 132px !important;
  }
  .merchantSearch .router-view{
    /*height: 35% !important;*/
  }
  .merchantSearch .weui-tab__panel {
    background-color: #eee;
  }
  .merchantSearch .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .merchantSearch .im img {
    width: 100%;
    height: 100%;
  }
  .merchantSearch .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
  }
  .merchantSearch .weui-select{
    padding-left: 41% !important;
  }
  .merchantSearch .weui-form-preview__btn[data-v-7592aae6]{
    width: 81% !important;
  }
  .merchantSearch .weui-form-preview__hd[data-v-7592aae6]{
    line-height: 1.1em
  }
  .merchantSearch .card{
    position: relative;
  }
  .merchantSearch .cardchild {
    position: absolute;
    top: 13px;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 1em;
  }
  .merchantSearch .cardchild img {
    width: 100%;
  }
  .merchantSearch .weui-form-preview__hd {
    text-indent: 5% !important;
  }
  .merchantSearch  .card{
    margin-bottom: 3%;
  }
  .merchantSearch .weui-form-preview__label{
    text-align: left !important;
    text-align-last: left !important;
    min-width: max-content !important;
  }
  .merchantSearch .yo-scroll{
    top: 6.5rem !important;
  }
  .merchantSearch .yo-scroll{
    top: 6.2rem !important;
  }
  .merchantSearch .yo-scroll .inner{
    top: -1.5rem !important;
  }
  .merchantSearch .section{background:#fff;padding:5px 10px;margin-top: 10px;}
  .merchant-title{height:2em;line-height: 2em;font-size: 14px;padding-bottom:5px;}
  .merchantSearch .state{color:#6594fe;}
  .merchantSearch .yo-scroll{top:5.8em;}
  .merchant-middle p{font-size: 14px;line-height: 2em;height:2em;margin-left:0.5rem;color:#2E2E2E}
  .merchant-middle p:nth-child(1){margin-top:0.3rem}
  .merchant-middle .lastP{height:0.5rem}
  .merchant-bottom{height:3em;line-height: 3em;color:#909090;font-size: 14px;}
  .merchantSearch .btn-up,.merchantSearch .btn-see{width:7em;height:1.8em;line-height:1.8em;border:1px solid #ccc;border-radius: 5px;text-align: center;margin-top: 0.5em;}
  .btn-see{margin-right: 1em;color:#909090;}
  .btn-up{background: #6594fe;color:#fff;}
</style>
