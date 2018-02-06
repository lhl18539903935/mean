<template>
    <div class='searchTousu'>
      <search :results="results" placeholder="请输入码号"  position="absolute" v-model='searchModel' @on-focus='setMargin=true' @on-blur='setMargin=false' @on-submit='search' @on-cancel="setMargin=false" top="46px"></search>
      <div :class='{searchMargin:setMargin}'></div>
      <scroll :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 3.3em;'>
        <div class='card' v-for='i in datalist'>
          <div class="cardchild"><img  style="display:block;margin:0 auto;"  src="../assets/wswm.png"></div>
          <form-preview :rgactive='i.rgactive' :header-label="i.name" :header-value="i.status" :body-items="i.list" :footer-buttons="i.buttons1"></form-preview>
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
        datalist:[],
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
      onRefresh(done){
        done()
      },
      onInfinite(done){
        this.currentPage++;
        //this.searchSubmit();
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
        let page=this.currentPage;
        if(!kw){vm.datalist=[]};
        this.apiPost(this.phost+'/Dls/searchQrcodeAppeal', {qrcode_num:kw,page:page}).then((res) => {
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
              if(res.data[i].status==0){res.data[i].status='待处理';res.data[i].rgactive=true}
              if(res.data[i].status==1){res.data[i].status='已处理'}
              if(res.data[i].status==2){res.data[i].status='拒绝'}

              vm.datalist.push({
                name:res.data[i].qrcode_num,
                status:res.data[i].status,
                rgactive:res.data[i].rgactive,
                list:[
                  {label:'申诉理由:',value:res.data[i].appeal},
                ],
                buttons1:[{
                  is_show:true,
                  style:'primary',
                  text:'查看',
                  link:'/shensudetails?id='+res.data[i].id
                }]
              })

            }
          }else{
            this.$vux.toast.show({
                text: res.msg,
                type: "text",position:'bottom',
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
        localStorage.setItem('kw',JSON.stringify(list))
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
      let kw=localStorage.getItem('kw');
      if(kw){this.list=JSON.parse(kw);}
      this.search()
    },
    mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .searchTousu .searchMargin{height:44px;width:100%;}
  .searchTousu .vux-x-icon {
   fill: #C6C6C6;
 }
  .searchTousu .font , .cell{
    font-size: 14px;
  }
  .searchTousu .history{
    top:85px;
    width: 100%;
    margin-top:-1.2em;
  }
  .searchTousu .search{
   margin-top:-1rem;

   top:182px;
   width: 100%;
 }
  .searchTousu .history .font,.sch .search .font{
    padding:0 10px;
    border-right:1px solid #ddd;
    display: inline-block;
  }
  .searchTousu .weui-search-bar{background-color: #EFEFF4;}
  .searchTousu .beforeSearch{background-color: #fff;text-align: center;padding:5px 15px;color:#999;}
  .searchTousu .weui-search-bar__form:after{border:none;}
  .searchTousu .weui-search-bar__form{background-color: #fff;}
  .searchTousu .weui-search-bar__cancel-btn{color:#999;}
  .searchTousu.weui-form-preview__bd, .sch .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .searchTousu .weui-form-preview__btn_primary {
      color: #909090 !important;
      border: 1px solid #eee;
      border-radius: 7px !important;
      font-size: 14px;
  }
  .searchTousu .weui-form-preview__hd .weui-form-preview__value {
      font-size: 14px !important;
      color: #6594fe;
  }
  .searchTousu .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .searchTousu .weui-form-preview:after{
    border-bottom: none !important;
  }
  .searchTousu .weui-form-preview:before{
    border-top: none !important;
  }
  .searchTousu .weui-form-preview__ft{
    line-height: 28px !important;
    width: 22% !important;
    position: absolute !important;
      right: 3% !important;
      bottom: 8px !important;
  }
  .searchTousu .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .searchTousu .vux-form-preview{
    height: 8rem !important;
  }
  .searchTousu .router-view{
    /*height: 35% !important;*/
  }
  .searchTousu .weui-tab__panel {
    background-color: #eee;
  }
  .searchTousu .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .searchTousu .im img {
    width: 100%;
    height: 100%;
  }
  .searchTousu .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
  }
  .searchTousu .weui-select{
    padding-left: 41% !important;
  }
  .searchTousu .weui-form-preview__btn[data-v-7592aae6]{
    width: 81% !important;
  }
  .searchTousu .weui-form-preview__hd[data-v-7592aae6]{
    line-height: 1.1em
  }
  .searchTousu .card{
    position: relative;
  }
  .searchTousu .cardchild {
    position: absolute;
    top: 13px;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 1em;
  }
  .searchTousu .cardchild img {
      width: 100%;
  }
  .searchTousu .weui-form-preview__hd {
    text-indent: 5% !important;
  }
  .searchTousu  .card{
    margin-bottom: 3%;
  }
  .searchTousu .weui-form-preview__label{
      font-size: 14px;
     text-align: left !important;
     text-align-last: left !important;
     min-width: max-content !important;
    }
  .searchTousu .yo-scroll{
  top: 6.5rem !important;
}
  .searchTousu .yo-scroll{
  top: 6.2rem !important;
}
  .searchTousu .yo-scroll .inner{
  top: -1.5rem !important;
}
  .searchTousu .weui-form-preview__label[data-v-7592aae6]{
    color:#000;
  }
  .searchTousu .weui-form-preview__value[data-v-7592aae6]{
    color:#000;
  }
  .searchTousu .reder[data-v-7592aae6]{
    color:#6594FE!important;
  }
</style>
