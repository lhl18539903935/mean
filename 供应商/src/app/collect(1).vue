<template>
    <div class="collect">
        <group class="group tongJi">
          <p>订单开始时间 : {{startTime}}</p>
          <p>订单结束时间 : {{endTime}}</p>
          <p>订单状态 : {{state}}</p>
          <p>操作账号 : {{num}}</p>
        </group>

      <group class="group">
        <cell  title="合计">
        </cell>
        <cell class="font"  title="订单数"  :value="data.count">
          <img slot="icon" src="../assets/images/4-2_03.png" width="16" style="display:block;margin:0 5px;">
        </cell>
        <cell class="font" title="消费金额"  >
          <img slot="icon" src="../assets/images/4-2_07.png" width="16" style="display:block;margin:0 5px;">
          <div>
            <span>￥{{data.allpay}}</span>
          </div>
        </cell>
        <cell class="font" title="实收金额" >
          <img slot="icon" src="../assets/images/4-2_11.png" width="16" style="display:block;margin:0 5px;">
          <div>
            <span>￥{{data.merchantpay}}</span>
          </div>
        </cell>
      </group>
      <div style="width:90%;margin:1rem auto;">
        <x-button  style="background: #FF4948;color:#fff;font-size: 16px;" @click.native="checkDetail">查看明细</x-button>
      </div>
    </div>
</template>

<script type="es6">
  import {Group,Cell,XButton} from 'vux'
    export default {
      data(){
      return{
        pageName:"汇总查询",
        startTime:"",
        endTime:"",
        orderFrom:"",
        user_level:0,
        bg:{white:false,grey:true},
        state:"交易成功",
        num:"ddaas",
        data:{},
        }
      },
      methods:{
        check(){
           let data={starttime:this.startTime,endtime:this.endTime,orderfrom:this.orderFrom,user_level:this.user_level,store_id:this.store_id}
           this.apiPost("http://r.huileyi.com/Order/collectCheck",data).then((res)=>{
            if(res.code==200){
              this.data=res.data
              console.log(res)
            }
            //this.$router.push("/")
           })
        },
        checkDetail(){
          this.$router.push({path:"/checkMain",query:{starttime:this.startTime,endtime:this.endTime,orderfrom:this.orderFrom,store_id:this.store_id}})
        },
      },
      mounted(){
        this.startTime=this.$route.query.starttime
        this.endTime=this.$route.query.endtime
        this.orderFrom=this.$route.query.orderfrom
        this.store_id=this.$route.query.store_id
        this.check()
        console.log(this.store_id)
        this.apiPost("http://r.huileyi.com/home/getUserMessage",{}).then((res)=>{
          this.num=res.data.mobile
        })
      },
      components:{
        Group,Cell,XButton
      },
      mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .collect .group{
    margin-top:-0.5rem;
  }
  .collect .tongJi p{
    margin:0.5rem 0 0 1rem;
    font-size: 14px;
    color:#6A6A6A;
    font-weight: 400;
  }
  .collect .tongJi p:last-child{
    margin-bottom: 1rem;
  }
  .collect .tongJi p:first-child{
    margin-top: 1rem;
  }
  .collect .font{
    font-size: 14px;
  }
  .collect .vux-label{
    color:#6A6A6A;
    margin-left:5px;
  }
  .collect .weui-cell__ft{
    color:#6A6A6A;
  }
</style>
