<template>
    <div>
      <flexbox class="flexbox_staty">
        <flexbox-item :span="3/10" style="">
          <div class="flex-demo">
            <img class=" b_img " style="width:5rem;height:5rem;margin:1rem 1rem 1rem 2rem;" src="../assets/images/0-14png_03.png" alt=""/>
          </div>
        </flexbox-item>
        <flexbox-item :span="1/10" style="">
        </flexbox-item>
        <flexbox-item :span="4/10" style="margin:-5px 0 0 -1rem;border-right:1px solid #F3F3F3;">
          <div class="flex-demo">
            <span style="font-size: 14px;margin:0 0 0.5rem 0;display: inline-block">{{name}}</span><br/>
            <span style="font-size: 14px;margin-top:0.5rem;display: inline-block">门店账号: {{storeNum}}</span>
          </div>
        </flexbox-item>
        <flexbox-item :span="2/10" style="text-align: center">
          <div class="flex-demo">
            <router-link to="/storeAcc">
              <img  style="width:1.3rem;border:none" src="../assets/images/store_1_03.png" alt=""/>
              <p style="font-size: 14px;margin-top:10px;color:#000;">编辑</p>
            </router-link>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem} from 'vux'
    export default {
      data(){
        return{
          pageName:"账号管理",
          bg:{white:false,grey:true},
          name:"惠乐益电子商务",
          storeNum:"8844080"
        }
      },
      components:{
        Flexbox,
        FlexboxItem,
      },
      mixins:[window.mixins,window.http]
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flexbox_staty{
    background-color: #fff;
    margin-top:1rem;
  }
.lf{
  float:left;
}
  .rt{
    float:right;
  }
.clearfloat:after{display:block;clear:both;content:"";visibility:hidden;height:0}
@media screen  and (max-width: 320px) {
  .b_img{
    width: 4.5rem!important;
    height:4.5rem!important;
  }
}
@media screen  and (max-width: 320px) {
  span{
    font-size: 14px!important;
  }
}
</style>
