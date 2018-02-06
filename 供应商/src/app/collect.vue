<template>
    <div>
      <div class="collect_top">
        <div>
          <span class="order_time" style="">订单时间</span>
          <flexbox>
            <flexbox-item  v-for="(item,index) in list" :key="index"  >
              <x-button
                         :class="state1==index?'red':''"
                         @click.native="ordertime(index)"
                         class="btn0" type="default">{{item.msg}}</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </div>
      <group class="dateMargin">
        <datetime style="font-size: 14px" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']"  placeholder="请输入开始日期"  v-model="start" title="开始"></datetime>
      </group>
      <group class="dateMargin">
        <datetime style="font-size: 14px" format="YYYY-MM-DD HH:mm" :minute-list="['00', '15', '30', '45']" placeholder="请输入结束日期" v-model="end"  title="结束"></datetime>
      </group>
      <div class="orderTime">
        <span style="">订单状态</span><br/>
        <button class="btn1" v-model="orderState"  style=" background-color: #FF4948;color:#fff;"  >
                {{success}}
        </button>
      </div>
      <div class="orderFrom">
        <span>订单来源</span><br/>
        <button v-model="orderFrom" class="btn"
                :class="state2==i?'red':''"
                @click="choose(i)"
                v-for="(sinGel,i) in btns" :key="i">{{sinGel.btn}}
        </button>
      </div>
      <group >
        <span class="spanStyle">门店</span>
          <div class="tab-head">
            <button class="btn1 tab-head-item" @click="all_store" :class="{'red':allStore}" v-show="!showStore">全部门店</button>
            <button class="btn1 " @click="all_store" :class="{'red':allStore}" v-show="showStore">全部门店</button>
            <button  class="btn1 tab-head-item"  @click="chooseStore(i)" :class="storeState==i?'red':''" v-for="(item,i) in this.store" :key="i">{{item.store_name}}</button>
          </div>
      </group>
      <div style="margin:1rem auto;width:90%;height:7rem;text-align: center">
        <button class="btn2" style="height:38px;width:45%;
          border:0;outline: none;background: #fff;color:#000;border-radius: 5px;" @click="clear">重置</button>
        <button class="btn2" style="margin: 0.7rem 0 0 0.5rem;
          height:38px;width:45%;border:0;outline: none;background: #FF4948;color:#fff;border-radius: 5px;" @click="sendId">确认</button>
      </div>
    </div>
</template>

<script type="es6">
  import { XButton, Box,Datetime, GroupTitle,Cell, Group, Flexbox, FlexboxItem, Divider,dateFormat } from 'vux'
  export default {
    data(){
      return{
      start: '',
      end: '',
      success:"交易成功",
      duiJie:"对接",
      pageName:"汇总查询",
      bg:{white:false,grey:true},
      orderState:"",
      orderFrom:0,
      state1:0,
      state2:0,
      selected:1,
      data:{},
      storeState:-1,
      store_id:"",
      store:"",
      showStore:true,
      allStore:true,
        list:[
          {key:"0",msg:"今天"},{key:"1",msg:"昨天"},{key:"2",msg:"近7天"},{key:"3",msg:"近10天"}
        ],
        btns:[
          {key:"0",btn:"全部"},
          {key:"1",btn:"我的会员"},
          {key:"2",btn:"万商会员"}
        ]
      }
    },
    methods:{
      clear(){
        this.state1=0
        this.state2=0
        this.selected=1
        this.storeState=0
        this.getdate()
        this.orderFrom=0
        this.allStore=true
        this.storeState=-1
        this.store_id=""
      },
      all_store(){
        this.allStore=true
        this.storeState=-1
      },
      chooseStore(i){
        this.store_id=this.store[i].store_id
        console.log(this.store_id)
        this.storeState=i
        this.allStore=false
      },
      ordertime(i){
        this.state1=i
        if(this.list[i].key=="0"){
          this.getdate()
        }
        if(this.list[i].key=="1"){
          this.yesterday()
        }
        if(this.list[i].key=="2"){
          this.week()
        }
        if(this.list[i].key=="3"){
          this.tenday()
        }
      },
      choose(i){
         this.state2=i
         if(this.btns[i].key=="0") this.orderFrom=0
         if(this.btns[i].key=="1") this.orderFrom=1
         if(this.btns[i].key=="2") this.orderFrom=2
      },
      getdate(){
        this.start=dateFormat(new Date(), 'YYYY-MM-DD  HH:mm')
        this.end=dateFormat(new Date(), 'YYYY-MM-DD  HH:mm')
      },
      yesterday(){
        let date=dateFormat(new Date(),'YYYY-MM-DD'+'-'+'HH:mm')
        var dtArr = date.split("-");
        console.log(dtArr)
        this.start=dtArr[0]+"-"+dtArr[1]+"-"+(dtArr[2]-1)+" "+dtArr[3]
        this.end=dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
      },
      week(){
        let date=dateFormat(new Date(),'YYYY-MM-DD'+'-'+'HH:mm')
        var dtArr = date.split("-");
        this.start=dtArr[0]+"-"+dtArr[1]+"-"+(dtArr[2]-6)+" "+dtArr[3]
        this.end=dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
      },
      tenday(){
        let date=dateFormat(new Date(),'YYYY-MM-DD'+'-'+'HH:mm')
        var dtArr = date.split("-");
        this.start=dtArr[0]+"-"+dtArr[1]+"-"+(dtArr[2]-9)+" "+dtArr[3]
        this.end=dateFormat(new Date(), 'YYYY-MM-DD HH:mm')
      },
      sendId(){
        if(this.start.length==0||this.end.length==0||this.orderFrom.length==0){
          this.$vux.toast.show({
            text:"请填写完整信息",
            type:"warn"
          })
          return
        }
        this.$router.push({path: '/collected', query:{ starttime:this.start,endtime:this.end,orderfrom:this.orderFrom,store_id:this.store_id}});
      },
      getUseLevel(){
        this.apiPost("http://r.huileyi.com/Merchant/getUserLevel",{}).then((res)=>{
          this.user_level=res.user_level
        })
      },
      getMyStore(){
        this.apiPost("http://r.huileyi.com/Store/getOfMyStore ",{user_level:this.user_level}).then((res)=>{
        if(res.code==200){
        this.store=res.data
        for(var i in this.store){
          if(this.store[i].store_name!=""){
            this.showStore=false
          }
        }
        console.log(this.store)
        }
      })
      },
    },
    created(){
      this.getdate()
      this.getUseLevel()
      this.getMyStore()
    },
    components: {
      XButton,
      Box,
      GroupTitle,
      Group,
      Flexbox,
      FlexboxItem,
      Datetime,
      Cell,
    },
    mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .collect_top{
    background-color: #fff;
    width:100%;
    padding-bottom:1rem;
  }
  .collect_top>div{
    width:94%;
    margin:0.5rem auto;
    background-color: #fff;
  }
  .collect_top .order_time{
    display: inline-block;
    margin:1rem 0;
  }
  .dateMargin{
    margin-top:-0.8rem;
  }
  .orderTime{
    margin:0.5rem 0 0 0;
    width:100%;
    height:7rem;
    background-color: #fff;
  }
  .orderTime>span{
    margin: 0.7rem 0 0 0.7rem;
    display: inline-block;

  }
  .orderFrom {
    margin:0.5rem 0 0 0;
    width:100%;
    height:7rem;
    background-color: #fff;
  }
  .orderFrom>span{
    margin: 0.7rem 0 0 0.7rem;
    display: inline-block;
  }
  .store{
    display: inline-block;
    height:80px;
    background-color: #fff;
  }
  .spanStyle{
    margin: 0.7rem 0 0 0.7rem;
    font-size: 14px;
  }
   .storeTop{
     font-size: 14px;
     display: block;
     margin: 0.7rem 0 0 0.7rem;
  }
  .font{
    font-size: 14px;
  }
  .weui-btn:after{
    width:199%;
  }
  .btn{
    margin:1rem 0.7rem 0.7rem 0.7rem;
    height:35px;
    width:90px;
    border:0;
    outline: none;
    background: #F5F5F5;
    color:#000;
    border-radius: 5px;
  }
  .btn1{
    margin:1rem 0.7rem 0.7rem 0.7rem ;
    height:35px;
    width:90px;
    border:0;
    outline: none;
    background: #F5F5F5;color:#000;
    border-radius: 5px;
    display: inline-block;
  }
  .btn0{
    font-size: 14px;
    background-color: #F5F5F5;
    border:0;
    height:35px;
  }
  .weui-btn[data-v-c2d505e6]:after{
    border:0;
    color:#000;
  }
  .red{
    background-color: #FF4948!important;
    color:#fff!important;
  }
  .dp-header .dp-item.dp-right{
    color:#FF4948!important;
  }
  .box1 {
    height: 100px;
    position: relative;
    width: 1490px;
  }
  .box1-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display:inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
  }
  .tab-head{
    list-style-type: none;
    display:-webkit-box;
    display:-webkit-flex;
    display:-ms-flexbox;
    display:flex;
    -webkit-flex-wrap:nowrap;
    -ms-flex-wrap:nowrap;
    flex-wrap:nowrap;
    -webkit-box-pack:justify;
    -webkit-justify-content:space-between;
    -ms-flex-pack:justify;justify-content:space-between;background:#fff;padding:0;overflow:auto;}

  .tab-head-item{-webkit-box-flex:1;-webkit-flex:1 0 auto;-ms-flex:1 0 auto;flex:1 0 auto;color:#000;padding:0 5px;}

  @media screen  and (max-width: 320px) {
    .btn1{
      width: 80px!important;
      font-size: 12px;
    }
    .btn2{
      width:120px!important;
    }
    .btn0{
      width: 100%!important;
      font-size: 12px;
    }
    .btn{
      width: 80px!important;
      font-size: 12px;
    }
  }
</style>
