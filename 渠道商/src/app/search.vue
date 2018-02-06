<template>
    <div class='sch'>
      <search class="search_heihgt" :results="results" placeholder="请输入姓名或手机号"  position="absolute" v-model='searchModel' @on-focus='setMargin=true' @on-blur='setMargin=false' @on-submit='search' @on-cancel="setMargin=false" top="46px"></search>
      <div :class='{searchMargin:setMargin}'></div>
      <scroll  style='margin-bottom: 3.3em;'>
        <div class='card' v-for='i in datalist'>
          <div class="cardchild"><img  style="display:block;margin:0 auto;"  src="../assets/daililogo.png"></div>
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
        this.apiPost(this.phost+'/Dls/seachDls', {field:kw,page:page}).then((res) => {
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
              if(res.data[i].status==0){res.data[i].status='待审核';res.data[i].rgactive=true}
              if(res.data[i].status==1){res.data[i].status='审核通过'}
              if(res.data[i].status==2){res.data[i].status='审核拒绝'}
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
            this.$vux.toast.show({
                text:"没有信息",
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
        localStorage.setItem('search_kw',JSON.stringify(list))
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

      let kw=localStorage.getItem('search_kw');
      if(kw){this.list=JSON.parse(kw);}
      this.search()
    },
    mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .sch .searchMargin{height:25px;width:100%;}
 .sch .vux-x-icon {
   fill: #C6C6C6;
 }
  .sch .font , .cell{
    font-size: 14px;
  }
  .sch .history{
    //margin-top:-1.3rem;
    width: 100%;
  }
 .sch .search{
   margin-top:-1rem;

   top:182px;
   width: 100%;
 }
 .sch .search_heihgt{
   height:1.5rem;
 }
  .sch .history .font,.sch .search .font{
    padding:0 10px;
    border-right:1px solid #ddd;
    display: inline-block;
  }
  .sch .beforeSearch{background-color: #fff;text-align: center;padding:5px 15px;color:#999;}
  .sch .weui-search-bar__form:after{border:none;}
  .sch .weui-search-bar__form{background-color: #fff;}
  .sch .weui-search-bar__cancel-btn{color:#999;}
  .sch .weui-form-preview__bd, .sch .weui-form-preview__label {
    color: #2e2e2e !important;
  }
  .sch .weui-form-preview__btn_primary {
      color: #909090 !important;
      border: 1px solid #eee;
      border-radius: 7px !important;
      font-size: 14px;
  }
  .sch .weui-form-preview__hd .weui-form-preview__value {
      font-size: 1em !important;
      color: #6594fe;
  }
  .sch .weui-form-preview__bd{
    text-align: left !important;
    border-bottom: 1px solid #eee;
  }
  .sch .weui-form-preview:after{
    border-bottom: none !important;
  }
  .sch .weui-form-preview:before{
    border-top: none !important;
  }
  .sch .weui-form-preview__ft{
    line-height: 28px !important;
    width: 22% !important;
    //position: absolute !important;
      right: 3% !important;
      //bottom: 11px !important;
    margin:10px 0;
  }
  .sch .weui-form-preview__ft:after{
    border-top: none !important;
  }
  .sch .vux-form-preview{
    height: 40% !important;
  }
  .sch .router-view{
    /*height: 35% !important;*/
  }
  .sch .weui-tab__panel {
    background-color: #eee;
  }
  .sch .im{
    width: 5%;
    height: 5%;
    position: absolute;
    top: 10%;
    left: 0;
    z-index: 100;
  }
  .sch .im img {
    width: 100%;
    height: 100%;
  }
  .sch .vux-selector.weui-cell_select{
    background-color: #fff;
    margin-bottom: 3%;
  }
  .sch .weui-select{
    padding-left: 41% !important;
  }
  .sch .card{
    position: relative;
  }
  .sch .cardchild {
    position: absolute;
    top: 21px;
    left: 3.5%;
    z-index: 999;
    width: 0.8em;
    vertical-align: middle;
    line-height: 1em;
  }
  .sch .cardchild img {
      width: 100%;
  }
  .sch .weui-form-preview__hd {
    text-indent: 5% !important;
  }
  .sch .card{
    margin-bottom: 3%;
  }
  .sch .weui-form-preview__label{
     text-align: left !important;
     text-align-last: left !important;
     min-width: max-content !important;
    }
  .sch .yo-scroll{
  top: 6.5rem !important;
}
  .sch .weui-form-preview__btn[data-v-7592aae6]{
    width:100%;
  }
  .sch .weui-form-preview__hd[data-v-7592aae6]{
    font-size: 14px;
    padding-bottom:0.3rem;
  }
  .sch .weui-form-preview__bd[data-v-7592aae6]{
    padding:15px 15px;
  }
</style>
