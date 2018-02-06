<template>
  <div class="tenant">
    <x-header class='pad'style="width:100%;position:absolute;left:0;top:0;z-index:100;":title="pageName">
      <span  slot='right' style='color:#fff;font-size:40px;position:absolute;right:10px;top:-11px;'>
      <span  style='color:#fff;font-size:14px;' @click="emitForms">查询全部</span></span>
    </x-header>
    <search :results="results" placeholder="请输入商户名称"   v-model='searchModel' @on-focus='setMargin=true' @on-blur='setMargin=false' @on-submit='search' @on-cancel="setMargin=false" top="46px"></search>
<!--     <group class="history">
      <cell v-if="showDetail" style="" class="font" title="查询商户"  value="商户电话"></cell>
    </group> -->
   
    <scroll v-if="showDetail" :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 8em;margin-top:-10px;'>
      <div  style="overflow: hidden;width: 100%;margin-top:0.7rem">
        <cell class="font" title="查询商户"  value="商户电话"></cell>
      </div>
    </scroll>
    <scroll v-if="!showDetail" :onRefresh='onRefresh' :on-infinite="onInfinite" style='margin-bottom: 8em;margin-top:-10px;'>
      <div  style="overflow: hidden;width: 100%;margin-top:0.7rem">
        <cell class="font" title="查询商户"  value="商户电话"></cell>
        <cell v-for="(item,i) in this.dataList" :key="i" class="font" :title="item.merchant_name" @click.native="emit(i)" value-align="right" :value="item.mobile"></cell>
      </div>
    </scroll>
  </div>
</template>

<script type="es6">
  import { Search, Group, Cell,XHeader} from 'vux'
   import Scroll from '../components/scroll/index'
  export default {
    data(){
      return {
      pageName:"报表管理",
      pageHeader:false,
      bg:{white:false,grey:true},
      results:[],
      currentPage:1,
      dataList:[],
      list:[],
      count:[],
      searchModel:"",
      showDetail:false
      }
    },
    methods:{
      //setMargin(){
       // this.showDetail=true
      //},
      emitForms(){
        this.$router.push({path:"/forms",query:{merchant_id:""}})
      },
      emit(i){
        this.$router.push({path:"/forms",query:{merchant_id:this.dataList[i].merchant_id,members:this.count.members,stores:this.count.stores,merchant_name:this.dataList[i].merchant_name}})
        //sessionStorage.setItem('merchant_name',this.dataList[i].merchant_name)
      },
      onRefresh(done){
          //this.$router.go(0)
          if(this.isDone){
            let vm=this;
            let data=this.dataList;
            this.dataList=[];
            setTimeout(function(){
              vm.dataList=data;
            },1000)
            done();
          }else{
            this.currentPage=1;
            this.dataList=[];
            this.getDlsMerchant(done);
          }

        },
        onInfinite(done){
          this.currentPage++;
          this.getDlsMerchant(done);

        },
      search(){
        this.currentPage=1;
        this.dataList=[];
        this.getDlsMerchant()
      },
      getDlsMerchant(){
        let kw=this.searchModel;
        let vm = this;
        let currentPage=this.currentPage;
        if(!kw){this.dataList=[]};
          this.apiPost(this.rhost+'/Dlsforms/getDlsMerchant',{merchant_name:kw,page:currentPage}).then((res)=>{
          //alert(res)
          if(res.code==225){
              this.showDetail=true
              this.$el.querySelector('.load-more').style.display = 'none';
            }
          if(res.code==200){
            this.count=res.data
            this.dataList=res.data.data
            let merchant_id=res.data.data
            localStorage.setItem('store_count',res.data.stores)
            localStorage.setItem('members',res.data.members)
            if(res.data.currentPage < res.data.totalPage){
               done && done()
               }else{
                   vm.isDone=true;
                   vm.$el.querySelector('.load-more').style.display = 'none';
               }
            if(currentPage == 1){
               vm.dataList=res.data.data;
            }else{
                for(let i in res.data.data){
                   vm.dataList.push(res.data.data[i])
                 }
              }
          }else{
            this.$vux.toast.show({
              text:res.msg,
              type:"text",
                position:'bottom'
            })
          }
       })
      },
    },
    mounted(){
      this.getDlsMerchant()
    },
    components: {
      Search,
      Group,
      Cell,
      Scroll,
      XHeader
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .tenant .detail{
    margin-top:1rem;
  }
  .tenant .vux-x-icon {
    fill: #C6C6C6;
  }
  .tenant .font{
    font-size: 14px;
    background-color: #fff;
  }
  .tenant .history{
    margin-top:0rem;
    position: fixed;
    //top:85px;
    width: 100%;
  }
  .tenant .yo-scroll{
    //background-color: #fff;
  }
  .tenant .weui-search-bar__cancel-btn{
    color:#999;
  }
  .tenant .weui-cell__ft{
    color:#000;
  }
  .tenant .weui-cells{
    margin-top: 0!important;
  }
</style>
