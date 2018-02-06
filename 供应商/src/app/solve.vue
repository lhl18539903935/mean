<template>
    <div>
      <group>
        <cell style="font-size: 14px" :title="msg"></cell>
        <cell value-align="left">
          <span style="font-size: 14px">A:我们是T+1结算(节假日顺延),结算当天出款.通常情况下,工商、农业、中国、建设、招商、北京、中信、平安、兴业等
      银行出款后2个显示到账,其他银行出款后5个工作日内到账.(银行短信不作为到账依据)</span>
        </cell>
      </group>
      <group>
          <ul>
            <li style="padding:14px;font-size: 14px;">
              <span>还知否对您有帮助</span>
              <span style="float: right;">
                <a class="red" href="" style="color:#000;padding-left:14px;">
                  <img class="img" src="../assets/images/zan.png" alt=""/>有用
                </a>
                <a href="" class="ddd" style="color:#000;padding-left:14px;">
                  <img class="img" style="margin-top:1px" src="../assets/images/no.png" alt=""/>没用
                </a>
              </span>
            </li>
          </ul>
      </group>
      <group>
        <ul>
          <li style="padding:14px;font-size: 14px">
            <span>还没有解决问题?</span>
            <a href="" style="float: right;;color: #FF4948;"><img style="vertical-align: top;margin-top:3px;width:14px;" class="img" src="../assets/images/z1.png" alt=""/>向我提问</a>
          </li>
        </ul>
      </group>
    </div>
</template>

<script type="es6">
  import { Cell, Group } from 'vux'

  export default {
    components:{
      Group,
      Cell
    },
    data(){
    return{
      bg:{white:false,grey:true},
      msg:"Q:你们的结算打款时间是?",
      title:"还是否对您有帮助",
      title1:"还没有解决问题"
    }
  },
   mixins:[window.mixins,window.http]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .img{
    width:16px;
    display: inline-block;
    vertical-align: middle;
    margin:-6px 5px 0 0 ;
  }
</style>
