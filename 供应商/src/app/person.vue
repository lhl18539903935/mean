<template>
    <div>
        <div class="nav">
          <img src="../assets/images/p1.png" alt=""/>
          <p>商家账号:  <a href="">18700000000</a></p>
        </div>
      <group label-width="6.5em" label-margin-right="2em" label-align="left" v-for="(item,index) in list" :key="index">
        <cell class="font" :title="item.title"  is-link>
        <img slot="icon" width="20" style="display:block;margin-right:5px;" :src="item.src">
        </cell>
      </group>
    </div>
</template>

<script type="es6">
  import {Group,Cell} from 'vux'
    export default {
      data(){
        return {
          bg:{white:false,grey:true},
          list:[
            {title:"修改手机号",value:"门店名称",src:require("../assets/images/p2.png")},
            {title:"修改密码",value:"门店名称",src:require("../assets/images/p3.png")},
            {title:"公告信息",value:"门店名称",src:require("../assets/images/p4.png")},
            {title:"设置",value:"门店名称",src:require("../assets/images/p5.png")},
            {title:"关于我们",value:"门店名称",src:require("../assets/images/p6.png")},
            {title:"切换账号",value:"门店名称",src:require("../assets/images/p7.png")},
            {title:"退出当前账号",value:"门店名称",src:require("../assets/images/p8.png")},
          ]
        }
      },
      components:{
        Group,
        Cell
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
  height:190px;
  width:100%;background: #FF4948;
  padding-top:1rem;
}
  .nav img{
    width:30%;
    display: block;
    margin:0 auto;
  }
  .nav p{
    text-align: center;
    color:#fff;
    margin:2rem;
    font-size: 1rem;
  }
  .nav p a{
    color:#fff;
  }
  .font{
    font-size: 14px;
  }
</style>
