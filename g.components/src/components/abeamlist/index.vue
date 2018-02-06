<template>
  <div class="abeamlist">
      <!--單列樣式二-->
    <div v-for="(item,i) in abeamlist" :key="i" class="abeam">
        <!--left-->
        <div class="abeamleft"> 
            <img :src="item.abeamsrc" alt="">
        </div>
        <!--right-->
        <div class="abeamright">
            <p :title="item.abeamtitle">{{item.abeamtitle}}</p>
            <del :title="item.abeamcost">￥{{item.abeamcost}}</del>
            <p>
                <span :title="item.abeamcurrent">￥{{item.abeamcurrent}}</span>
                <span class="stylespan" :title='item.abeamsale'>已售：{{item.abeamsale}}</span>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        abeamlist:{
            type:Array,
            default:[]
        }
    },
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .abeamlist{
        width:95%;
        margin:0 auto;  
        /*height:100px;*/
        overflow: hidden;
    }
    .abeam{
        margin:0.5rem 0 0rem 0;
        height:100px;
        float: left;
        border:1px solid #EEEEEE;
    }
   .abeamleft{
       width:48%;
       margin-right:2%;
       float: left;
   }
   .abeamleft img{
       width:100%;
      height:100px;
   }
   .abeamright{
       width:48%;
       float:left;
   }
   .abeamright p:nth-child(1){
       font-size: 14px;
       color:#666;
       margin-bottom:1.5rem;
   }
   .abeamright del{
       font-size: 12px;
       color:#9C9C9C;
   }
   .abeamright :nth-child(3){
       font-size: 16px;
       color:#E8393D;
       line-height:16px;
   }
   .abeamright .stylespan{
       color:#000;
       font-size: 12px;
       float:right;
   }
</style>
