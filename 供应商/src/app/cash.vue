
<template>
    <div>
      <group style="margin-top:-0.5rem;" v-for="(item,i) in list" :key="i" >
        <div style="padding:15px;" >
          <check-icon @click.native="selected(i)"  v-model="item.select"  style="font-size: 14px" :value.sync="demo1" >{{item.name}}</check-icon>
        </div>
        <cell value-align="left" style="font-size: 14px">
          <span style="margin-left:2rem;">{{item.detail}}</span>
        </cell>
      </group>
      <flexbox style="position: fixed;bottom:0;height:3rem;text-align:center;border:1px solid #ddd;">
        <flexbox-item :span="1/5">
          <div @click="deleteChc" class="flex-demo" style="color:#FF4948">取消</div>
        </flexbox-item>
        <flexbox-item :span="2/5"><div class="flex-demo">已选中{{count}}个</div></flexbox-item>
          <flexbox-item style="margin:0;color:#fff;background: #FF4948;height:100%;line-height:3rem; " :span="2/5" >
            <router-link to="/testPho">
              <div class="flex-demo" style="color: #fff;">去设置</div>
            </router-link>
          </flexbox-item>
      </flexbox>
    </div>
</template>

<script type="es6">
  import { CheckIcon,Cell,Group,Flexbox,FlexboxItem } from 'vux'
    export default {
      components:{
        CheckIcon,
        Cell,
        Group,
        Flexbox,
        FlexboxItem
      },
      data(){
        return{
        pageName:"设置提现账号",
        demo1: false,
        pageFooter:false,
        bg:{white:false,grey:true},
        count:0,
        list:[
          {name:"惠乐益电子商务",detail:"该门店还未设置提现账户",select:false},
          {name:"惠乐益电子商务",detail:"该门店还未设置提现账户",select:false},
          {name:"惠乐益电子商务",detail:"该门店还未设置提现账户",select:false}
        ]
      }
    },
    methods:{
      selected(i){
      this.list[i].select=!this.list[i].select
      if(this.list[i].select==true){
        this.count++
      }else{
        this.count--
      }
     },
     deleteChc(){

     }
    },
    mixins:[window.mixins,http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
  .vux-check-icon > .weui-icon-success:before, .vux-check-icon > .weui-icon-success-circle:before{
    color:#FF4948!important;
  }
</style>
