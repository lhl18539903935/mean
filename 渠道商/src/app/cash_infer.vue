<template>
  <div class="xinxi" @click.stop="clearClick">
    <x-header class='pad' style="width:100%;position:absolute;left:0;top:0;z-index:600;" :title="pageName">
      		  <span @click.stop='kalendar' style='position:absolute;right:15px' slot="right" >
		        	<img height=18 src="../assets/rili.png">
		        </span>
    </x-header>

    <div class="top">
      <span @click.stop="isstriteShow">{{qudaoticheng}}</span>
      <span @click.stop="isShow">{{line}}</span>
      <span @click.stop="finish">{{pay}}</span>
      <ul class="online" v-show="striteShow" >
        <li v-for="(item,i) in qudaolist" :key="i" @click.stop="qudaotype(i)" :class="{'red':i===selected}">{{item.content}}</li>
      </ul>
      <ul class="online onlines" v-show="lineShow" >
        <li v-for="(item,i) in list" :key="i" @click.stop="addBg(i)" :class="{'red':i===lineSelect}">{{item.online}}</li>
      </ul>
      <ul class="finish" v-show="finishShow" >
        <li v-for="(item,i) in box" :key="i" @click.stop="finishs(i)" :class="{'red':i===select}">{{item.content}}</li>
      </ul>
    </div>
      <van-pull-refresh v-model="isLoading" style="text-align:center;position:absolute;width:100%;top:3.5rem;left:0;right:0;bottom:0;overflow:scroll"> 
      <div   v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="400" style="margin-top:4rem;">
      <Group style="margin-top:-0.5rem;"  v-for="(item,i) in dataList" :key="i" >
        <cell value-align="left" :title="'订单号 : '+item.order_no"   style="font-size: 14px"  >
          <img slot="icon" src="../assets/005.png" width="15" style="display:block;margin-right:5px;" >
        </cell>
        <cell value-align="left" style="font-size: 14px;" class="content">
          <p>提成金额(元) :<span class="spanMargin">{{item.commission_money | setDecimal}}</span></p>
          <p class="cash-flex">
            <span v-if="item.comefrom=='1'">来源 : <span class="spanMargin">线上</span></span>
            <span v-if="item.comefrom=='2'">来源 : <span class="spanMargin">线下</span></span>
            <span id="blue" v-if="item.status=='2'">已结算</span></p>
          <span id="red" v-if="item.status=='1'">未结算</span></p>
          <p>{{item.store_name}}</p>
          <p v-if="item.percentage_from=='1'">提成类型:<span style="color:#6594FE" class="spanMargin">渠道提成</span></p>
          <p v-if="item.percentage_from=='2'">提成类型:<span style="color:#6594FE" class="spanMargin">业务提成</span></p>
        </cell>
        <cell class="fontStyle" value-align="left" :title="'时间 : '+item.create_time"></cell>
      </Group>
  </div>
  </van-pull-refresh>
        <x-dialog v-model='showDate' hide-on-blur>
        <group>
          <datetime v-model="starttime" placeholder="请输入开始时间"  format="YYYY-MM-DD " title="开始时间" style="font-size: 14px" inline></datetime>
          <datetime v-model="endtime" placeholder="请输入结束时间"  format="YYYY-MM-DD" title="结束时间" style="font-size: 14px" inline></datetime>
        </group>
        <div style="width:90%;margin:1rem auto;" >
          <x-button @click.native.stop="startSearch"  style="background-color: #6594FE;font-size: 16px;color:#fff">确定</x-button>
        </div>
        </x-dialog>
    <div style='clear:both;'></div>

  </div>
</template>

<script type="es6">
  import { Group,Cell,XHeader,Datetime,dateFormat,XButton,XDialog} from 'vux'
  import { Waterfall } from 'vant';
   import VanPullRefresh from '../vant/packages/pull-refresh/index.vue'
    export default {
      components: {
        Group,Cell,XHeader,Datetime,XButton,Waterfall,VanPullRefresh,XDialog
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
        WaterfallUpper: Waterfall('upper')
      },
      filters:{
        setDecimal(val){
            val=val?val:0;
            let num=parseFloat(val);
            return parseFloat((Math.floor(num*100))/100).toFixed(2);
        }
      },
       watch:{
        isLoading(){
          if(this.isLoading){
            this.disabled=false;
            this.datalist=[];
            this.currentPage=1;
            this.OrderCommission()
          }
        }
      },
      methods:{
        loadMore(){          
          this.currentPage++;
          this.OrderCommission();
          
        },
        date(){
         this.OrderCommission()
        },
        clearModel(){
          this.showDate=false
        },
        startSearch(){
          if(!this.starttime || !this.endtime){
            this.$vux.toast.show({
                  text:'请选择时间段！',
                  type:"text"
                  })
            return;
          }

          let st=this.starttime.split('-').join('/');
          let end=this.endtime.split('-').join('/');
          this.Stime=dateFormat(new Date(st),'YYYY-MM-DD 00:00')
          this.Etime=dateFormat(new Date(end),'YYYY-MM-DD 24:00')
          this.currentPage=1;
          this.OrderCommission()
          this.showDate=false
        },
        clearClick(){
          this.striteShow=false
          this.lineShow=false
          this.finishShow=false
        },
        kalendar(){
          //this.show=!this.show
          this.striteShow=false
          this.lineShow=false
          this.finishShow=false
          this.showDate=!this.showDate
        },

        isShow(){
          this.lineShow=!this.lineShow
          this.finishShow=false
          this.striteShow=false
        },
        isstriteShow(){
          this.striteShow=!this.striteShow
          this.finishShow=false
          this.lineShow=false
        },
        finish(){
          this.finishShow=!this.finishShow
          this.lineShow=false
          this.striteShow=false
        },
        //线上线下
        addBg(i){
          this.lineSelect=i
          this.line=this.list[i].online
          this.lineShow=false
          if(i==0) {
            this.order_from=""
          }else{
            this.order_from=i
          }

          this.currentPage=1
          this.dataList=[]
          this.disabled=false
          this.Stime='',
          this.Etime='',
          this.OrderCommission()
        },
      
        // 渠道业务
        qudaotype(i){  
          this.selected=i
          this.qudaoticheng=this.qudaolist[i].content
          this.striteShow=false
          if(i==0) {
            this.percentage_from=""
          }else{
            this.percentage_from=i
          }

          this.currentPage=1
          this.dataList=[]
          this.disabled=false
          this.Stime='',
          this.Etime='',
          this.OrderCommission()
        },
        // 待结算已结算
        finishs(i){ 
          this.select=i
          this.pay=this.box[i].content
          this.finishShow=false
          if(i==0) {
            this.percentage_status=""
          }else{
            this.percentage_status=i
          }

          this.currentPage=1
          this.dataList=[]
          this.disabled=false
          this.Stime='',
          this.Etime='',
          this.OrderCommission()
        },
        OrderCommission(){
          let vm=this
          let data={
            percentage_from:this.percentage_from,
            order_from:this.order_from,
            percentage_status:this.percentage_status,
            starttime:this.Stime,
            endtime:this.Etime,
            page:this.currentPage
          }
          this.apiPost(this.rhost+'/Dlsgains/dlsOrderCommission',data).then((res)=>{
            this.isLoading=false
            if(res.code == 200){
               if(res.currentPage == res.totalPage || res.totalPage == 0){     
                   
                    vm.disabled=true
                   }
                   if(vm.currentPage == 1){
                      vm.dataList=res.data;
                    }else{
                       for(let d of res.data){
                         vm.dataList.push(d)
                       }
                   }
              for(var i in this.dataList){
                if(this.dataList[i].status=="2"){
                  this.showColor=true
                }
                if(this.dataList[i].status=="1"){
                  this.showColor=false
                }
              }
            }else if(res.code == 221){
                this.disabled=true;
                vm.dataList=[]
              }else{
                vm.dataList=[];
                  this.disabled=true
                  this.$vux.toast.show({
                  text:res.msg,
                  type:"text",
                position:'bottom'
              })
            }
          })
        },
      },
      data(){
      return{
      bg:{white:false,grey:true},
      lineShow:false,
      starttime:"",
      endtime:"",
      currentPage:1,
      finishShow:false,
      selected:false,
      lineSelect:false,
      striteShow:false,
      select:false,
      showDate:false,
      line:"提成来源",
      disabled: false,
      pay:"结算状态",
      show:false,
      resdata:"",
      time:"",
      Stime:"",
      Etime:"",
      dataList:[],
      pageHeader:false,
      pageName:"提成记录信息",
      percentage_from:"",
      order_from:"",
      percentage_status:"",
      isLoading:false,
      showColor:true,
      list:[{online:"提成来源"},{online:"线上"},{online:"线下"}],
      box:[{content:"结算状态"},{content:"待结算"},{content:"已结算"}],
      qudaolist:[{content:"提成渠道"},{content:"渠道提成"},{content:"业务提成"}],
      qudaoticheng:'提成渠道'
      }
    },
    mounted(){
       this.OrderCommission()
    },
    mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .xinxi .top{
    width:100%;
    height:50px;
    line-height: 40px;
    background-color: #fff;
    position: fixed;
    top:46px;
    border-bottom:1px solid #f3f3f3;
    z-index: 500
  }
  .xinxi .top span{
    width:32.3%;
    text-align: center;
    display: inline-block;
    font-size: 14px;
    padding-top:5px;
  }
  .xinxi #blue{
    color:#6594FE;
  }
  .dp-container{
    z-index:100000!important;
  }
  .xinxi #red{
    color:#FE8181;
  }
  .xinxi .red{
    background-color: #6594fe;
    color:#fff;
  }
  .xinxi .top span:after{
    content: '';
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #000;
    display:inline-block;
    margin:8px 0 0 5px;
  }
  .xinxi  .content p{
    color:#000;
    margin-bottom:5px;
  }
  .xinxi .content a{
    color:#000;
  }
  .xinxi .fontStyle{
    font-size: 14px;
  }
  .xinxi .spanMargin{
    margin-left:3px;
  }
  .xinxi .weui-cell__ft {
    color:#6594fe;
  }
  .xinxi .online{
    width:33.3%;
    border:1px solid #ddd;
    position: absolute;
    z-index: 700;text-align: center;
    background-color: #fff;
    left: 0;
    top:50px;
  }
  .xinxi .onlines{
    left: 31% !important;
    top:50px;
  }
  .xinxi .online li{
    border-bottom:1px solid #ddd;
    font-size: 12px;
  }
  .xinxi .finish li{
    border-bottom:1px solid #ddd;
    font-size: 12px;
  }
  .xinxi .finish{
    width:33.3%;
    border:1px solid #ddd;
    position: absolute;
    z-index: 700;
    right:0;
    text-align: center;
    background-color: #fff;
    top:50px;
  }
  .xinxi .cash-flex{
    display: flex;
    justify-content:space-between;
  }
  .xinxi .modelTop{
    position: fixed;
    background-color: rgba(0,0,0,.6);
    top:0;
    width:100%;
    height:100%;
    z-index:9000!important;
  }
  .xinxi .modelContent{
    z-index:3;
    position:fixed;
    bottom:10em;
    left:2rem;
    width:80%;
    background-color: #fff;
    margin:0 auto;
  }
</style>
