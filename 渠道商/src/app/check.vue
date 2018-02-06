<template>
    <div>
      <group style="margin-top:-0.5rem;">
        <cell :title="item.title" :value="item.value" style="font-size: 14px;padding-top:14px;padding-bottom:14px;" v-for="(item,index) in list" :key="index">
        </cell>
      </group>
    </div>
</template>

<script type="es6">
  import {Group,Cell} from "vux"
    export default {
      components:{
        Group,
        Cell
      },
      data(){
        return {
          pageHeader:true,
          bg:{white:false,grey:true},
          pageName:"查询",
          datalist:[],
          list:[
            {title:"累计会员数量",value:"0"},
            {title:"累计门店数量",value:"0"},
            {title:"订单数量",value:"0"},
            {title:"订单金额(元)",value:"0"},
            {title:"累计提成(元)",value:"0"},
          ]
        }
      },
      mounted(){
        this.startDate=this.$route.query.starttime
        this.endDate=this.$route.query.endtime
        this.quicksearch=this.$route.query.quicksearch
        this.merchant_id=this.$route.query.merchant_id
        this.apiPost(this.rhost+'/Dlsforms/getDlsMerchantDetail',{merchant_id:this.merchant_id,quicksearch:this.quicksearch,starttime:this.startDate,endtime:this.endDate}).then((res)=>{
          if(res.code==200){
            this.list[1].value=res.store_count
            this.list[0].value=res.rel_count
            this.list[2].value=res.count
            this.list[3].value=parseFloat((Math.floor(res.pay_total*100))/100).toFixed(2);
            this.list[4].value=parseFloat((Math.floor(res.commission_total*100))/100).toFixed(2)
          }else{
            this.list[1].value=0
            this.list[0].value=0
          }
        })
        //let store_count=localStorage.getItem('store_count')
        //let members=localStorage.getItem('members')
         //this.list[0].value=members
         //this.list[1].value=store_count
         this.list[2].value=this.$route.query.count
         this.list[3].value=this.$route.query.pay_total
         this.list[4].value=this.$route.query.commission_total
      },
      mixins:[window,mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
