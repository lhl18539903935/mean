<template>
  <div class="forms">
    <group label-width="5.5em" style="margin-top:-0.5rem;">
      <cell title="查询商户" v-if="merchant_name"  v-model="merchant_name" style="font-size: 14px;" is-link link="/tenant"></cell>
      <cell title="查询商户" v-if="!merchant_name" value="全部" style="font-size: 14px;" is-link link="/tenant"></cell>
      <cell title="快捷查询" style="font-size: 14px;" class="check" value-align="left">
        <button :class="state==i?'addColor':''" @click="choose(i)" v-for="(item,i) in btns" :key="i">{{item.btn}}</button>
      </cell>
      <div class="date">
        <datetime style="font-size: 14px;" title="开始" v-model="startDate"  @click.native="clear"   is-link="false"></datetime>
        <img  src="../assets/0-14png_03_03.png" alt=""/>
      </div>
      <div class="date">
        <datetime style="font-size: 14px;" title="结束" v-model="endDate"   @click.native="clear"  is-link="false"></datetime>
        <img  src="../assets/0-14png_03_03.png" alt=""/>
      </div>
    </group>
    <div style="width:90%;margin:1rem auto;"><x-button @click.native="check" style="background-color: #6594FE;font-size: 16px;color:#fff;">查询</x-button></div>
  </div>
</template>

<script type="es6">
  import {Datetime,Cell,XButton,dateFormat} from "vux"
  import Group from '../components/group/index.vue'
    export default {
      data(){
        return{
          pageHeader:true,
          pageName:"报表管理",
          state:-1,
          startDate:"",
          endDate:"",
          quicksearch:'',
          merchant_id:"",
          members:'',
          merchant_name:'',
          stores:'',
          yearMoth:"",
          bg:{white:false,grey:true},
          list:[
            {title:"开始",value:"",src:require("../assets/0-14png_03_03.png")},
            {title:"结束",value:"",src:require("../assets/0-14png_03_03.png")}
          ],
          btns:[
            {key:"0",btn:"昨日"},{key:"1",btn:"本月"}
          ]
        }
      },

      methods:{
        clear(){
          this.state=-1
          this.quicksearch=''
        },
        getdate(){
            let thistoday=dateFormat(new Date(), 'YYYY-MM-DD  ')
            let val=dateFormat(new Date(), 'YYYY/MM/DD')
            let addrr=thistoday.split("-")
            this.yearMoth=addrr[0]+"-"+addrr[1]+"-"+"01"

            let date=new Date(val)
            this.today=date.getTime()+86400*1000
          },
        choose(i){
          this.state=i
          if(this.btns[i].key=="0"){
            this.startDate=dateFormat(this.today-24*60*60*1000*2,'YYYY-MM-DD ')
            this.endDate=dateFormat(this.today-24*60*60*1000,'YYYY-MM-DD')
          }
          if(this.btns[i].key=="1"){
              this.endDate=dateFormat(this.today,'YYYY-MM-DD')
              this.startDate=this.yearMoth
          }
        },
        check(){
             this.$router.push({path:'/check',query:{merchant_id:this.merchant_id,quicksearch:this.quicksearch,starttime:this.startDate,endtime:this.endDate}})
        },
      },
      mounted(){
        this.getdate()
        if(this.$route.query.merchant_id!=undefined){
             this.merchant_id=this.$route.query.merchant_id
             //alert(1)
         }else{
            this.merchant_id=''
            //alert(2)
         }
        this.members=this.$route.query.members
        this.stores=this.$route.query.stores
        this.merchant_name=this.$route.query.merchant_name
      },
      components:{
        Group,
        Cell,
        Datetime,
        XButton,
        dateFormat
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .check{
    width:100%;
  }
  .check button{
    width:25%;
    height:1.8rem;
    margin:0 0.5rem;
    outline:none;
    border-radius: 20px;
    background-color: #fff;
    border:1px solid #F1F1F1;
    color:#000;
  }
  .check .addColor{
    background-color: #6594FE;
    color:#fff;
  }
  .forms .weui-cell{
    padding-top:14px;
    padding-bottom:14px;
  }
  .forms .weui-cell_access .weui-cell__ft{
    text-align: left;
    color:#000;
  }
  .forms .date{
    position:relative;
    border-top:1px solid #f3f3f3;
  }
  .forms .date img{
    width:20px;
    position:absolute;
    top:14px;
    right:30px;
  }
</style>
