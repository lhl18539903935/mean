<template>
  <div class="withdraw-record">
    <div  style="font-size: 12px;text-align: center;position:absolute;top:3rem;left:0;right:0;bottom:0;width:100%;overflow:auto;">
      <div style="width:100%;margin-top: 3%;z-index:999;" class='vux-1px-b'>
        <div class="tixian-one" style='border-top:none;'>提现时间</div>
        <div class="tixian-one" style='border-top:none;'>提现金额</div>
        <div class="tixian-one" style='border-top:none;'>提现状态</div>
        <div style='clear:both;'></div>
      </div>
    <van-pull-refresh v-model="isLoading" style="height:100%;text-align:center"> 
      <div   v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:0rem;">
        <div v-for='(i,index) in record' :key="index" style="overflow: hidden;width: 100%;">
          <div class="tixian-one">{{myfilter(i.time)}}</div>
          <div class="tixian-one">{{i.cash_money}}</div>
          <div v-if='i.status==2' class="tixian-one red" @click.stop='failed(i)'>审核未通过</div>
          <div v-if='i.status==1' class="tixian-one">已审核</div>
          <div v-if='i.status==0' class="tixian-one">待审核</div>
          <div v-if='i.status==3' class="tixian-one">提现成功</div>
        </div>
      </div>
    </van-pull-refresh>
      <div style="clear:both;"></div>
    </div>
  </div>
</template>

<script type="es6">
    import {Group,Cell,XButton} from "vux"
    import format from '../../tools/date/format.js'
      import { Waterfall } from 'vant';
   import VanPullRefresh from '../../vant/packages/pull-refresh/index.vue'
    export default {
      components:{
        Group,
        Cell,
        XButton,
        Waterfall,VanPullRefresh
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
       watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.datalist=[];
            this.currentPage=1;
            this.getRecord()
          }
        }
      },
      data(){
        return{
           pageName:"提现记录",
           record:[],
           bg:{white:false,grey:true},
           currentPage:1,
           isDone:false,
           scroll:true,
           disabled:false,
           isLoading:false,
           pageHeader:true
        }
      },
      methods:{
        loadMore(){          
          this.currentPage++;
          this.getRecord();
          
        },
        myfilter(value){
                return format(value*1000,'YYYY.MM.DD ')
            },
        failed:function(item){
          sessionStorage.setItem('failItem',JSON.stringify(item));
          this.$router.push('/shenhenolist?card_id='+item.log_id);
        },
        getRecord(){
            let vm=this;
            let currentPage=this.currentPage;
           this.apiPost(this.rhost+"/Dlsgains/dlsCashRecord ",{page:currentPage}).then((res)=>{
             this.isLoading=false
                if(res.code==229){
                  this.scroll=false
                }
                if(res.code == 200){
                  if(res.data.currentPage == res.data.totalPage || res.totalPage==1){
                    this.disabled=true
                    // done && done()
                  }

                  if(currentPage == 1){
                     vm.record=res.data;
                   }else{
                      for(let i in res.data){
                        vm.record.push(res.data[i])
                      }
                   }
                  for(let d in vm.record){
                    vm.record[d].time=vm.record[d].time.substr(0,10);
                  // vm.record[d].time=new Date(parseInt(vm.record[d].time) * 1000).toLocaleString().substr(0,17)
                  }

                }
            })
        },
      },
      mounted(){
        this.getRecord();
      },

      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .withdraw-record .tixian-one{width:33.33%;float:left;background-color: #fff;padding:10px 0;border-top:1px solid #e5e5e5;}
  .withdraw-record .yo-scroll{;margin-bottom: 4.5em !important;top:5.6rem;}
  .withdraw-record .yo-scroll .inner{top:-1.2em !important;}
  .red{
    color: red;
  }
</style>
